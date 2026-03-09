import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ModelSelectorProps {
  models: string[];
  selected: string;
  onSelect: (model: string) => void;
  disabled?: boolean;
}

export function ModelSelector({ models, selected, onSelect, disabled }: ModelSelectorProps) {
  return (
    <Select value={selected} onValueChange={onSelect} disabled={disabled}>
      <SelectTrigger className="w-56 h-8 text-xs">
        <SelectValue placeholder="Select model" />
      </SelectTrigger>
      <SelectContent>
        {models.map((model) => (
          <SelectItem key={model} value={model} className="text-xs">
            {model}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
