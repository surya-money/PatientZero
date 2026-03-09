# Phase 1: Chat MVP

## Goal
Working chat interface. User sends message, gets streamed response.

## Backend
- FastAPI app at `backend/api/main.py`
- `backend/llm/base.py` — abstract provider with `stream(messages)` method
- `backend/llm/mock.py` — returns canned streamed responses
- `backend/llm/factory.py` — returns provider based on env var
- `backend/db/database.py` — Database class, creates tables on init
- `backend/db/schema.sql` — `sessions` and `turns` tables only
- One route: `POST /api/chat` — accepts message + session_id, streams SSE response, saves turns to DB
- `uv` for package management

## Frontend
- Vite + React + TS at `frontend/`
- Tailwind + shadcn/ui
- Sidebar: previous chat sessions list, "New Chat" button
- Chat area: message list, input box, streaming response display
- `npm` for package management

## Flow
1. User opens app → new session created
2. User types message → POST /api/chat with session_id + message
3. Backend saves user turn → calls LLM provider → streams SSE tokens back
4. Frontend renders tokens as they arrive → saves assistant turn on completion

## What we are NOT doing yet
- No personas, scenarios, or conditions
- No judge, evaluation, or scoring
- No validation study flow
- No dashboard or results pages
