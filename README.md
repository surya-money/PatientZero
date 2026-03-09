# PatientZero

Explaining Health: How AI Explanation Styles and Interaction Modalities Affect User Comprehension of Medical Information

## Overview

A simulation system that tests how different AI explanation styles (clinical vs. analogy-based) and interaction modes (static reading vs. interactive dialog) affect patient comprehension of medical information. Uses LLM-powered agents to simulate patient-doctor explanation scenarios.

## Tech Stack

- **Frontend**: React + Vite + TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Python, FastAPI, SQLite
- **LLM**: Abstracted provider layer (Mock, OpenAI, Claude, Local)

## Project Structure

```
PatientZero/
├── frontend/          # React app
├── backend/           # FastAPI server
├── plan/              # Implementation plans
└── report.txt         # Research report
```

## Prerequisites

- Python 3.12+
- Node.js 20+
- [uv](https://docs.astral.sh/uv/) (Python package manager)

## Quick Start

1. Clone the repo:
```bash
git clone https://github.com/tamteaa/PatientZero.git
cd PatientZero
```

2. Set up environment:
```bash
cp .env.example .env
```

3. Start the backend:
```bash
cd backend
uv sync
uv run uvicorn api.main:app --reload
```

4. Start the frontend:
```bash
cd frontend
npm install
npm run dev
```

5. Open http://localhost:5173

## License

MIT
