from llm.base import LLMProvider
from llm.mock import MockProvider


def get_provider(name: str) -> LLMProvider:
    match name:
        case "mock":
            return MockProvider()
        case _:
            raise ValueError(f"Unknown LLM provider: {name}")
