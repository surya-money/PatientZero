import json

from fastapi import APIRouter
from pydantic import BaseModel
from sse_starlette.sse import EventSourceResponse

from api.dependencies import db, provider
from db.queries.sessions import (
    create_session,
    create_turn,
    get_session,
    get_turn_count,
    get_turns,
    list_sessions,
    update_session_title,
)

router = APIRouter()


class ChatRequest(BaseModel):
    session_id: str
    message: str


@router.post("/sessions")
def create_new_session():
    return create_session(db)


@router.get("/sessions")
def get_all_sessions():
    return list_sessions(db)


@router.get("/sessions/{session_id}")
def get_session_detail(session_id: str):
    session = get_session(db, session_id)
    if not session:
        return {"error": "Session not found"}, 404
    turns = get_turns(db, session_id)
    return {**session, "turns": turns}


@router.post("/chat")
async def chat(request: ChatRequest):
    turn_number = get_turn_count(db, request.session_id)
    create_turn(db, request.session_id, "user", request.message, turn_number)

    if turn_number == 0:
        title = request.message[:50] + ("..." if len(request.message) > 50 else "")
        update_session_title(db, request.session_id, title)

    messages = [
        {"role": t["role"], "content": t["content"]}
        for t in get_turns(db, request.session_id)
    ]

    async def generate():
        full_response = ""
        async for chunk in provider.stream(messages):
            full_response += chunk
            yield {"data": json.dumps({"token": chunk})}
        create_turn(db, request.session_id, "assistant", full_response, turn_number + 1)
        yield {"event": "done", "data": ""}

    return EventSourceResponse(generate())
