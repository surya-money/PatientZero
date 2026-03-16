import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { NavItem } from './NavItem';
import {
  FileText,
  Users,
  Play,
  LayoutDashboard,
  MessageSquare,
  BarChart3,
  Scale,
  ClipboardList,
} from 'lucide-react';

export function AppSidebar() {
  return (
    <div className="flex h-full w-64 flex-col border-r border-border bg-muted/30">
      <div className="flex h-12 items-center border-b border-border px-4">
        <span className="text-sm font-bold">PatientZero</span>
      </div>
      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-1 p-3">
          <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Experiment
          </span>
          <NavItem to="/scenarios" icon={FileText} label="Scenarios" />
          <NavItem to="/personas" icon={Users} label="Personas" />
          <NavItem to="/simulations" icon={Play} label="Simulations" />
        </div>
        <Separator />
        <div className="flex flex-col gap-1 p-3">
          <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Results
          </span>
          <NavItem to="/dashboard" icon={LayoutDashboard} label="Dashboard" />
          <NavItem to="/sessions" icon={MessageSquare} label="Sessions" />
          <NavItem to="/analysis" icon={BarChart3} label="Analysis" />
        </div>
        <Separator />
        <div className="flex flex-col gap-1 p-3">
          <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Validation
          </span>
          <NavItem to="/judge" icon={Scale} label="Judge" />
          <NavItem to="/participate" icon={ClipboardList} label="Participant Study" />
        </div>
      </ScrollArea>
    </div>
  );
}
