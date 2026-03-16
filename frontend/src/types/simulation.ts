export interface Persona {
  name: string;
  age: string;
  education: string;
  literacy_level: string;
  anxiety: string;
  prior_knowledge: string;
  communication_style: string;
  backstory: string;
}

export interface Scenario {
  test_name: string;
  results: string;
  normal_range: string;
  significance: string;
}

export interface SimulationConfig {
  persona: Persona;
  style: 'clinical' | 'analogy';
  mode: 'static' | 'dialog';
  scenario: Scenario;
  model: string;
}

export interface SimulationMessage {
  role: 'explainer' | 'patient';
  content: string;
}
