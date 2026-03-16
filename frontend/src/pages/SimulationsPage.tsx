import { useState, useRef, useEffect, useCallback } from 'react';
import { Header } from '@/components/common/Header';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Play, Loader2 } from 'lucide-react';
import { runSimulation } from '@/api/sessions';
import { listModels } from '@/api/sessions';
import type { Persona, Scenario, SimulationMessage } from '@/types/simulation';

// ── Hardcoded data ──────────────────────────────────────────────────────────

const personas: Persona[] = [
  { name: 'Maria Santos', age: '62', education: 'High school diploma', literacy_level: 'low', anxiety: 'high', prior_knowledge: 'none', communication_style: 'passive', backstory: 'Retired cafeteria worker. Relies on her daughter to explain medical paperwork. Tends to nod along even when confused.' },
  { name: 'James Mitchell', age: '45', education: 'Some college', literacy_level: 'marginal', anxiety: 'moderate', prior_knowledge: 'some', communication_style: 'engaged', backstory: 'Construction foreman. Had a health scare last year. Asks questions but sometimes misinterprets answers.' },
  { name: 'Dr. Priya Sharma', age: '34', education: 'PhD in Chemistry', literacy_level: 'adequate', anxiety: 'low', prior_knowledge: 'significant', communication_style: 'assertive', backstory: 'Research scientist comfortable with data. Will push back if something doesn\'t make sense.' },
  { name: 'Robert Chen', age: '71', education: 'Bachelor\'s degree', literacy_level: 'marginal', anxiety: 'high', prior_knowledge: 'some', communication_style: 'passive', backstory: 'Retired accountant. Good with numbers but medical terminology intimidates him.' },
  { name: 'Ashley Williams', age: '28', education: 'GED', literacy_level: 'low', anxiety: 'low', prior_knowledge: 'none', communication_style: 'engaged', backstory: 'Single mother working two jobs. Curious when things are explained simply.' },
  { name: 'David Okafor', age: '52', education: 'Master\'s in Education', literacy_level: 'adequate', anxiety: 'moderate', prior_knowledge: 'none', communication_style: 'assertive', backstory: 'High school principal. Fast learner who wants to understand the "why" behind everything.' },
  { name: 'Linda Park', age: '58', education: 'Associate\'s degree', literacy_level: 'marginal', anxiety: 'high', prior_knowledge: 'some', communication_style: 'engaged', backstory: 'Office manager with family history of diabetes. Reads health articles but struggles with misinformation.' },
  { name: 'Carlos Ruiz', age: '38', education: 'High school diploma', literacy_level: 'low', anxiety: 'moderate', prior_knowledge: 'none', communication_style: 'passive', backstory: 'Warehouse worker. English is his second language. Often agrees to avoid seeming difficult.' },
  { name: 'Sarah Thompson', age: '42', education: 'Nursing degree (inactive)', literacy_level: 'adequate', anxiety: 'moderate', prior_knowledge: 'significant', communication_style: 'engaged', backstory: 'Former nurse who left the profession a decade ago. Good at asking targeted questions.' },
  { name: 'Frank Davis', age: '67', education: 'No formal degree', literacy_level: 'low', anxiety: 'high', prior_knowledge: 'none', communication_style: 'passive', backstory: 'Retired factory worker with limited reading ability. Often says "I understand" to end conversations when overwhelmed.' },
  { name: 'Nina Volkov', age: '30', education: 'Bachelor\'s in Business', literacy_level: 'adequate', anxiety: 'low', prior_knowledge: 'none', communication_style: 'assertive', backstory: 'Marketing manager. Approaches medical info like a business problem — wants clear data and actions.' },
  { name: 'George Washington Jr.', age: '55', education: 'Some high school', literacy_level: 'low', anxiety: 'moderate', prior_knowledge: 'some', communication_style: 'engaged', backstory: 'Long-haul truck driver managing high blood pressure. Prefers conversations over paperwork.' },
];

const scenarios: { id: string; label: string; data: Scenario }[] = [
  {
    id: 'cbc',
    label: 'CBC Blood Test',
    data: {
      test_name: 'Complete Blood Count (CBC)',
      results: 'WBC: 11.2 (H), RBC: 4.1, Hemoglobin: 10.8 (L), Hematocrit: 33%, Platelets: 245',
      normal_range: 'WBC: 4.5-11.0, RBC: 4.0-5.5, Hemoglobin: 12.0-16.0, Hematocrit: 36-46%, Platelets: 150-400',
      significance: 'Elevated WBC may indicate infection or inflammation. Low hemoglobin suggests possible anemia.',
    },
  },
  {
    id: 'prediabetes',
    label: 'Pre-Diabetes Diagnosis',
    data: {
      test_name: 'Hemoglobin A1c (HbA1c)',
      results: 'HbA1c: 6.1%',
      normal_range: 'Normal: below 5.7%, Pre-diabetes: 5.7-6.4%, Diabetes: 6.5% or higher',
      significance: 'An HbA1c of 6.1% indicates pre-diabetes. Blood sugar levels have been elevated over the past 2-3 months. Lifestyle changes can prevent progression to type 2 diabetes.',
    },
  },
  {
    id: 'medication',
    label: 'Medication Instructions',
    data: {
      test_name: 'Metformin Prescription',
      results: 'Starting dose: 500mg once daily with dinner. Increase to 500mg twice daily after 2 weeks if tolerated. Maximum dose: 2000mg/day.',
      normal_range: 'Target fasting blood glucose: 80-130 mg/dL. Target HbA1c: below 7%.',
      significance: 'Common side effects: nausea, diarrhea (usually improve after 1-2 weeks). Call doctor immediately if: severe stomach pain, muscle pain/weakness, difficulty breathing, or unusual fatigue.',
    },
  },
];

const conditions = [
  { id: 'clinical-static', label: 'Clinical + Static', style: 'clinical' as const, mode: 'static' as const },
  { id: 'clinical-dialog', label: 'Clinical + Dialog', style: 'clinical' as const, mode: 'dialog' as const },
  { id: 'analogy-static', label: 'Analogy + Static', style: 'analogy' as const, mode: 'static' as const },
  { id: 'analogy-dialog', label: 'Analogy + Dialog', style: 'analogy' as const, mode: 'dialog' as const },
];

// ── Components ──────────────────────────────────────────────────────────────

function MessageBubble({ message, isStreaming }: { message: SimulationMessage; isStreaming?: boolean }) {
  const isExplainer = message.role === 'explainer';
  return (
    <div className={`flex flex-col gap-1 ${isExplainer ? 'items-start' : 'items-end'}`}>
      <span className={`text-xs font-medium ${isExplainer ? 'text-blue-600 dark:text-blue-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
        {isExplainer ? 'Explainer' : 'Patient'}
      </span>
      <div
        className={`max-w-[85%] rounded-lg px-4 py-3 text-sm whitespace-pre-wrap ${
          isExplainer
            ? 'bg-blue-50 text-blue-950 dark:bg-blue-950/30 dark:text-blue-100'
            : 'bg-emerald-50 text-emerald-950 dark:bg-emerald-950/30 dark:text-emerald-100'
        }`}
      >
        {message.content}
        {isStreaming && <span className="inline-block w-1.5 h-4 ml-0.5 bg-current animate-pulse" />}
      </div>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export function SimulationsPage() {
  const [personaIdx, setPersonaIdx] = useState<number>(0);
  const [conditionIdx, setConditionIdx] = useState<number>(0);
  const [scenarioIdx, setScenarioIdx] = useState<number>(0);
  const [model, setModel] = useState<string>('kimi:kimi-k2.5');
  const [availableModels, setAvailableModels] = useState<string[]>([]);

  const [messages, setMessages] = useState<SimulationMessage[]>([]);
  const [streamingRole, setStreamingRole] = useState<string | null>(null);
  const [streamingContent, setStreamingContent] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listModels().then(setAvailableModels).catch(() => {});
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamingContent]);

  const handleRun = useCallback(async () => {
    const condition = conditions[conditionIdx];
    const config = {
      persona: personas[personaIdx],
      style: condition.style,
      mode: condition.mode,
      scenario: scenarios[scenarioIdx].data,
      model,
    };

    setMessages([]);
    setIsRunning(true);
    setStreamingContent('');
    setStreamingRole(null);

    try {
      await runSimulation(
        config,
        (role) => {
          setStreamingRole(role);
          setStreamingContent('');
        },
        (token) => {
          setStreamingContent((prev) => prev + token);
        },
        (role) => {
          setStreamingContent((prev) => {
            setMessages((msgs) => [...msgs, { role: role as 'explainer' | 'patient', content: prev }]);
            return '';
          });
          setStreamingRole(null);
        },
        () => {
          setIsRunning(false);
          setStreamingRole(null);
          setStreamingContent('');
        },
      );
    } catch {
      setIsRunning(false);
    }
  }, [personaIdx, conditionIdx, scenarioIdx, model]);

  const selectedPersona = personas[personaIdx];
  const selectedCondition = conditions[conditionIdx];
  const selectedScenario = scenarios[scenarioIdx];

  return (
    <>
      <Header title="Simulations" />
      <div className="flex flex-1 overflow-hidden">
        {/* Config panel */}
        <div className="flex w-80 shrink-0 flex-col border-r border-border bg-muted/20 p-4 gap-5 overflow-y-auto">
          <Card size="sm">
            <CardHeader>
              <CardTitle>Configuration</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {/* Persona */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-muted-foreground">Persona</label>
                <Select value={String(personaIdx)} onValueChange={(v) => v !== null && setPersonaIdx(Number(v))}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {personas.map((p, i) => (
                      <SelectItem key={i} value={String(i)}>
                        {p.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Condition */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-muted-foreground">Condition</label>
                <Select value={String(conditionIdx)} onValueChange={(v) => v !== null && setConditionIdx(Number(v))}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {conditions.map((c, i) => (
                      <SelectItem key={i} value={String(i)}>
                        {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Scenario */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-muted-foreground">Scenario</label>
                <Select value={String(scenarioIdx)} onValueChange={(v) => v !== null && setScenarioIdx(Number(v))}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {scenarios.map((s, i) => (
                      <SelectItem key={i} value={String(i)}>
                        {s.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Model */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-muted-foreground">Model</label>
                <Select value={model} onValueChange={(v) => v !== null && setModel(v)}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {availableModels.map((m) => (
                      <SelectItem key={m} value={m}>
                        {m}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <Button onClick={handleRun} disabled={isRunning} className="w-full gap-2">
                {isRunning ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Running...
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" />
                    Run Simulation
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Persona summary */}
          <Card size="sm">
            <CardHeader>
              <CardTitle>Persona Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div><span className="text-muted-foreground">Age:</span> {selectedPersona.age}</div>
                <div><span className="text-muted-foreground">Edu:</span> {selectedPersona.education}</div>
                <div><span className="text-muted-foreground">Literacy:</span> {selectedPersona.literacy_level}</div>
                <div><span className="text-muted-foreground">Anxiety:</span> {selectedPersona.anxiety}</div>
                <div><span className="text-muted-foreground">Knowledge:</span> {selectedPersona.prior_knowledge}</div>
                <div><span className="text-muted-foreground">Style:</span> {selectedPersona.communication_style}</div>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">{selectedPersona.backstory}</p>
            </CardContent>
          </Card>

          {/* Run info */}
          <div className="text-xs text-muted-foreground space-y-1">
            <p><strong>Condition:</strong> {selectedCondition.label}</p>
            <p><strong>Scenario:</strong> {selectedScenario.label}</p>
            <p><strong>Mode:</strong> {selectedCondition.mode === 'static' ? '2 turns (one-shot)' : 'Up to 8 turns (dialog)'}</p>
          </div>
        </div>

        {/* Conversation viewer */}
        <ScrollArea className="flex-1">
          <div className="flex flex-col gap-4 p-6 max-w-3xl mx-auto">
            {messages.length === 0 && !isRunning && (
              <div className="flex flex-1 items-center justify-center py-20 text-muted-foreground">
                <div className="text-center">
                  <p className="text-lg font-medium">No simulation running</p>
                  <p className="mt-1 text-sm">Configure the simulation on the left and click Run.</p>
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <MessageBubble key={i} message={msg} />
            ))}

            {streamingRole && (
              <MessageBubble
                message={{ role: streamingRole as 'explainer' | 'patient', content: streamingContent }}
                isStreaming
              />
            )}

            <div ref={scrollRef} />
          </div>
        </ScrollArea>
      </div>
    </>
  );
}
