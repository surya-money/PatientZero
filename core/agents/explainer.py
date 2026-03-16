from pathlib import Path
from core.agents.base import Agent
from core.llm.base import LLMProvider
from core.types import Scenario

PROMPTS_DIR = Path(__file__).parent / "prompts"

PROMPT_FILES = {
    ("clinical", "static"): "explainer_clinical_static.txt",
    ("clinical", "dialog"): "explainer_clinical_dialog.txt",
    ("analogy", "static"): "explainer_analogy_static.txt",
    ("analogy", "dialog"): "explainer_analogy_dialog.txt",
}


class ExplainerAgent(Agent):
    def __init__(
        self,
        provider: LLMProvider,
        model: str,
        style: str,
        mode: str,
        scenario: Scenario,
    ):
        self.style = style
        self.mode = mode
        self.scenario = scenario
        system_prompt = self._build_system_prompt(style, mode, scenario)
        super().__init__(provider, model, system_prompt)

    @staticmethod
    def _build_system_prompt(style: str, mode: str, scenario: Scenario) -> str:
        key = (style, mode)
        if key not in PROMPT_FILES:
            raise ValueError(f"Invalid style/mode combination: {style}/{mode}")
        template_path = PROMPTS_DIR / PROMPT_FILES[key]
        template = template_path.read_text()
        return template.format(
            test_name=scenario.test_name,
            results=scenario.results,
            normal_range=scenario.normal_range,
            significance=scenario.significance,
        )
