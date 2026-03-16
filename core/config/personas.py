from core.types import Persona

PERSONAS = [
    Persona(
        name="Maria Santos",
        age="62",
        education="High school diploma",
        literacy_level="low",
        anxiety="high",
        prior_knowledge="none",
        communication_style="passive",
        backstory=(
            "Retired cafeteria worker. Relies on her daughter to explain medical "
            "paperwork. Tends to nod along even when confused, worried about being a burden."
        ),
    ),
    Persona(
        name="James Mitchell",
        age="45",
        education="Some college",
        literacy_level="marginal",
        anxiety="moderate",
        prior_knowledge="some",
        communication_style="engaged",
        backstory=(
            "Construction foreman. Had a health scare last year that made him start "
            "paying attention to his numbers. Asks questions but sometimes misinterprets answers."
        ),
    ),
    Persona(
        name="Dr. Priya Sharma",
        age="34",
        education="PhD in Chemistry",
        literacy_level="adequate",
        anxiety="low",
        prior_knowledge="significant",
        communication_style="assertive",
        backstory=(
            "Research scientist comfortable with data and technical language. Will push "
            "back if something doesn't make sense and asks for specifics."
        ),
    ),
]
