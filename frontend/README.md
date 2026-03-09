# PatientZero Frontend

React chat interface built with Vite, TypeScript, Tailwind CSS, and shadcn/ui.

## Setup

```bash
npm install
```

## Running

```bash
npm run dev
```

App runs at http://localhost:5173

## Project Structure

```
frontend/src/
├── api/
│   ├── client.ts            # Axios instance
│   └── sessions.ts          # Session + chat API calls
├── components/
│   ├── chat/
│   │   ├── ChatInput.tsx    # Message input + send button
│   │   ├── MessageBubble.tsx# Single message display
│   │   ├── MessageList.tsx  # Scrollable message list
│   │   └── Sidebar.tsx      # Session list + new chat
│   ├── common/
│   │   └── Header.tsx       # Page header
│   └── ui/                  # shadcn/ui components
├── containers/
│   └── chat/
│       └── ChatContainer.tsx# Chat state + UI wiring
├── contexts/
│   └── ChatContext.tsx      # Chat state management
├── hooks/                   # Custom hooks
├── pages/
│   └── Chat.tsx             # Chat page (provider + container)
├── types/
│   └── chat.ts              # Session, Turn, SessionDetail
├── App.tsx
└── main.tsx
```

## Architecture

- **Contexts** — state management (ChatContext)
- **Containers** — consume context, pass props to components
- **Components** — pure UI, props only
- **Pages** — compose providers + containers

## Environment

Set `VITE_API_URL` to override the backend URL (defaults to `http://localhost:8000/api`).
