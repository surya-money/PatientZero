from llm.base import LLMProvider
from llm.mock import MockProvider


_providers: dict[str, LLMProvider] = {}


def get_provider(provider_name: str) -> LLMProvider:
    if provider_name in _providers:
        return _providers[provider_name]

    match provider_name:
        case "mock":
            _providers[provider_name] = MockProvider()
        case _:
            raise ValueError(f"Unknown LLM provider: {provider_name}")

    return _providers[provider_name]


def parse_provider_model(provider_model: str) -> tuple[LLMProvider, str]:
    """Parse 'provider:model' string and return (provider_instance, model_name)."""
    if ":" not in provider_model:
        return get_provider(provider_model), "default"
    provider_name, model_name = provider_model.split(":", 1)
    return get_provider(provider_name), model_name
