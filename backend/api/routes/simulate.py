import json
from dataclasses import asdict

from fastapi import APIRouter
from pydantic import BaseModel
from sse_starlette.sse import EventSourceResponse

from core.agents.explainer import ExplainerAgent
from core.agents.patient import PatientAgent
from core.config.personas import PERSONAS
from core.llm.factory import parse_provider_model
from core.types import Persona, Scenario

router = APIRouter()


@router.get("/personas")
def get_personas():
    return [asdict(p) for p in PERSONAS]


class SimulateRequest(BaseModel):
    persona: dict
    style: str
    mode: str
    scenario: dict
    model: str


def _build_messages(transcript: list[dict], perspective: str) -> list[dict]:
    """Build message list from a given agent's perspective.

    Each transcript entry has {"speaker": "explainer"|"patient", "content": str}.
    From the explainer's perspective, its own messages are "assistant" and the patient's are "user".
    From the patient's perspective, it's the reverse.
    """
    messages = []
    for entry in transcript:
        if entry["speaker"] == perspective:
            role = "assistant"
        else:
            role = "user"
        messages.append({"role": role, "content": entry["content"]})
    return messages


@router.post("/simulate")
async def simulate(request: SimulateRequest):
    provider, model = parse_provider_model(request.model)

    scenario = Scenario(**request.scenario)
    persona = Persona(**request.persona)

    explainer = ExplainerAgent(provider, model, request.style, request.mode, scenario)
    patient = PatientAgent(provider, model, persona)

    max_turns = 2 if request.mode == "static" else 8

    async def generate():
        transcript: list[dict] = []

        for turn in range(max_turns):
            is_explainer = turn % 2 == 0
            speaker = "explainer" if is_explainer else "patient"
            agent = explainer if is_explainer else patient

            messages = _build_messages(transcript, speaker)

            yield {"event": "turn_start", "data": json.dumps({"role": speaker, "turn": turn})}

            full_response = ""
            async for token in agent.stream(messages):
                full_response += token
                yield {"data": json.dumps({"token": token})}

            transcript.append({"speaker": speaker, "content": full_response})
            yield {"event": "turn_end", "data": json.dumps({"role": speaker})}

        yield {"event": "done", "data": ""}

    return EventSourceResponse(generate())
