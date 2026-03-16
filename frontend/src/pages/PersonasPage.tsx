import { Header } from '@/components/common/Header';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

interface Persona {
  id: string;
  name: string;
  age: number;
  education: string;
  literacy: 'low' | 'marginal' | 'adequate';
  anxiety: 'low' | 'moderate' | 'high';
  priorKnowledge: 'none' | 'some' | 'significant';
  communicationStyle: 'passive' | 'engaged' | 'assertive';
  backstory: string;
}

const literacyColors: Record<string, string> = {
  low: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  marginal: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
  adequate: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
};

const anxietyColors: Record<string, string> = {
  low: 'bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-400',
  moderate: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
  high: 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400',
};

const commColors: Record<string, string> = {
  passive: 'bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-400',
  engaged: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  assertive: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
};

const knowledgeColors: Record<string, string> = {
  none: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
  some: 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-400',
  significant: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
};

const personas: Persona[] = [
  {
    id: 'p1',
    name: 'Maria Santos',
    age: 62,
    education: 'High school diploma',
    literacy: 'low',
    anxiety: 'high',
    priorKnowledge: 'none',
    communicationStyle: 'passive',
    backstory: 'Retired cafeteria worker. Relies on her daughter to explain medical paperwork. Tends to nod along even when confused, worried about being a burden.',
  },
  {
    id: 'p2',
    name: 'James Mitchell',
    age: 45,
    education: 'Some college',
    literacy: 'marginal',
    anxiety: 'moderate',
    priorKnowledge: 'some',
    communicationStyle: 'engaged',
    backstory: 'Construction foreman. Had a health scare last year that made him start paying attention to his numbers. Asks questions but sometimes misinterprets answers.',
  },
  {
    id: 'p3',
    name: 'Dr. Priya Sharma',
    age: 34,
    education: 'PhD in Chemistry',
    literacy: 'adequate',
    anxiety: 'low',
    priorKnowledge: 'significant',
    communicationStyle: 'assertive',
    backstory: 'Research scientist comfortable with data and technical language. Will push back if something doesn\'t make sense and asks for specifics.',
  },
  {
    id: 'p4',
    name: 'Robert Chen',
    age: 71,
    education: 'Bachelor\'s degree',
    literacy: 'marginal',
    anxiety: 'high',
    priorKnowledge: 'some',
    communicationStyle: 'passive',
    backstory: 'Retired accountant. Good with numbers but medical terminology intimidates him. Recently lost his wife to cancer, which heightened his health anxiety.',
  },
  {
    id: 'p5',
    name: 'Ashley Williams',
    age: 28,
    education: 'GED',
    literacy: 'low',
    anxiety: 'low',
    priorKnowledge: 'none',
    communicationStyle: 'engaged',
    backstory: 'Single mother working two jobs. Doesn\'t have time to worry about health but is curious when things are explained simply. Learns best through conversation.',
  },
  {
    id: 'p6',
    name: 'David Okafor',
    age: 52,
    education: 'Master\'s in Education',
    literacy: 'adequate',
    anxiety: 'moderate',
    priorKnowledge: 'none',
    communicationStyle: 'assertive',
    backstory: 'High school principal. Articulate and comfortable asking questions. No medical background but a fast learner who wants to understand the "why" behind everything.',
  },
  {
    id: 'p7',
    name: 'Linda Park',
    age: 58,
    education: 'Associate\'s degree',
    literacy: 'marginal',
    anxiety: 'high',
    priorKnowledge: 'some',
    communicationStyle: 'engaged',
    backstory: 'Office manager with a family history of diabetes. Reads health articles online but struggles to separate reliable info from misinformation. Tends to catastrophize.',
  },
  {
    id: 'p8',
    name: 'Carlos Ruiz',
    age: 38,
    education: 'High school diploma',
    literacy: 'low',
    anxiety: 'moderate',
    priorKnowledge: 'none',
    communicationStyle: 'passive',
    backstory: 'Warehouse worker. English is his second language. Often agrees to avoid seeming difficult but privately feels lost. Avoids asking questions in medical settings.',
  },
  {
    id: 'p9',
    name: 'Sarah Thompson',
    age: 42,
    education: 'Nursing degree (inactive)',
    literacy: 'adequate',
    anxiety: 'moderate',
    priorKnowledge: 'significant',
    communicationStyle: 'engaged',
    backstory: 'Former nurse who left the profession a decade ago. Has solid medical foundations but is rusty on specifics. Good at asking targeted clarifying questions.',
  },
  {
    id: 'p10',
    name: 'Frank Davis',
    age: 67,
    education: 'No formal degree',
    literacy: 'low',
    anxiety: 'high',
    priorKnowledge: 'none',
    communicationStyle: 'passive',
    backstory: 'Retired factory worker with limited reading ability. Relies heavily on verbal explanations. Often says "I understand" to end conversations quickly when overwhelmed.',
  },
  {
    id: 'p11',
    name: 'Nina Volkov',
    age: 30,
    education: 'Bachelor\'s in Business',
    literacy: 'adequate',
    anxiety: 'low',
    priorKnowledge: 'none',
    communicationStyle: 'assertive',
    backstory: 'Marketing manager. No health background but approaches medical info like a business problem — wants clear data, clear actions, clear outcomes.',
  },
  {
    id: 'p12',
    name: 'George Washington Jr.',
    age: 55,
    education: 'Some high school',
    literacy: 'low',
    anxiety: 'moderate',
    priorKnowledge: 'some',
    communicationStyle: 'engaged',
    backstory: 'Long-haul truck driver managing high blood pressure. Has experience taking medication daily but doesn\'t fully understand why. Prefers conversations over paperwork.',
  },
];

function TraitBadge({ label, value, colorMap }: { label: string; value: string; colorMap: Record<string, string> }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium ${colorMap[value] ?? ''}`}>
      <span className="text-[10px] uppercase tracking-wider opacity-60">{label}</span>
      {value}
    </span>
  );
}

export function PersonasPage() {
  return (
    <>
      <Header title="Personas">
        <Badge variant="secondary">{personas.length} personas</Badge>
      </Header>
      <ScrollArea className="flex-1">
        <div className="p-6">
          <p className="text-sm text-muted-foreground max-w-2xl mb-6">
            Simulated patient profiles spanning the NVS literacy scale, health anxiety levels, and communication styles. Each persona goes through all 4 conditions × 3 scenarios = 12 sessions.
          </p>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
            {personas.map((p) => (
              <Card key={p.id} size="sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{p.name}</CardTitle>
                      <CardDescription>Age {p.age} · {p.education}</CardDescription>
                    </div>
                    <span className="text-xs text-muted-foreground font-mono">{p.id.toUpperCase()}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    <TraitBadge label="LIT" value={p.literacy} colorMap={literacyColors} />
                    <TraitBadge label="ANX" value={p.anxiety} colorMap={anxietyColors} />
                    <TraitBadge label="KNOW" value={p.priorKnowledge} colorMap={knowledgeColors} />
                    <TraitBadge label="COMM" value={p.communicationStyle} colorMap={commColors} />
                  </div>
                  <Separator className="mb-3" />
                  <p className="text-xs text-muted-foreground leading-relaxed">{p.backstory}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </ScrollArea>
    </>
  );
}
