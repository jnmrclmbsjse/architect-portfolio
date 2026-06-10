import { Badge } from "@/components/ui/badge";

interface StackTagProps {
  name: string;
}

export function StackTag({ name }: StackTagProps) {
  return (
    <Badge variant="secondary" className="font-mono text-[10px] font-normal">
      {name}
    </Badge>
  );
}
