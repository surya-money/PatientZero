from pathlib import Path
from core.agents.base import Agent
from core.llm.base import LLMProvider
from core.types import Persona

PROMPTS_DIR = Path(__file__).parent / "prompts"


class PatientAgent(Agent):
    def __init__(self, provider: LLMProvider, model: str, persona: Persona):
        self.persona = persona
        system_prompt = self._build_system_prompt(persona)
        super().__init__(provider, model, system_prompt)

    @staticmethod
    def _build_system_prompt(persona: Persona) -> str:
        template_path = PROMPTS_DIR / "patient_base.txt"
        template = template_path.read_text()
        return template.format(
            name=persona.name,
            age=persona.age,
            education=persona.education,
            literacy_level=persona.literacy_level,
            anxiety=persona.anxiety,
            prior_knowledge=persona.prior_knowledge,
            communication_style=persona.communication_style,
            backstory=persona.backstory,
        )
