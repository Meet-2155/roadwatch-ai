import type { LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  label: string;
  value: string | number;
  trend?: string;
  accent?: "primary" | "success" | "warning" | "destructive";
}

const accentMap = {
  primary: "from-primary/30 to-accent/20 text-primary",
  success: "from-[oklch(0.72_0.18_155)]/30 to-[oklch(0.72_0.18_155)]/10 text-[oklch(0.78_0.18_155)]",
  warning: "from-[oklch(0.78_0.17_75)]/30 to-[oklch(0.78_0.17_75)]/10 text-[oklch(0.82_0.17_75)]",
  destructive: "from-destructive/30 to-destructive/10 text-destructive",
};

export function StatCard({ icon: Icon, label, value, trend, accent = "primary" }: Props) {
  return (
    <div className="glass glass-hover rounded-xl p-5 animate-fade-in-up">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm text-muted-foreground">{label}</div>
          <div className="mt-1 text-3xl font-bold tracking-tight">{value}</div>
          {trend && <div className="mt-1 text-xs text-muted-foreground">{trend}</div>}
        </div>
        <div className={`grid h-11 w-11 place-items-center rounded-lg bg-gradient-to-br ${accentMap[accent]}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
