import asyncio
from collections.abc import AsyncGenerator

from llm.base import LLMProvider


class MockProvider(LLMProvider):
    async def stream(self, messages: list[dict]) -> AsyncGenerator[str, None]:
        last_message = messages[-1]["content"] if messages else ""
        response = (
            f"This is a mock response to: \"{last_message}\". "
            "I'm a simulated LLM provider used for testing the chat interface. "
            "Once a real provider is configured, you'll get actual AI responses here."
        )
        for word in response.split():
            yield word + " "
            await asyncio.sleep(0.03)
