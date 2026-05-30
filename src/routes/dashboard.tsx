import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { StatCard } from "@/components/StatCard";
import { FileText, CheckCircle2, Clock, Gauge, Camera, ArrowRight } from "lucide-react";
import { mockComplaints } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard · RoadWatch AI" }] }),
  component: Dashboard,
});

function Dashboard() {
  const total = mockComplaints.length;
  const resolved = mockComplaints.filter((c) => c.status === "Resolved").length;
  const pending = total - resolved;
  const avgHealth = Math.round(mockComplaints.reduce((s, c) => s + c.roadHealthScore, 0) / total);

  return (
    <Layout>
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="glass rounded-2xl p-6 md:p-8 mb-6 animate-fade-in-up">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-sm text-muted-foreground">Welcome back</div>
              <h1 className="text-2xl md:text-3xl font-bold mt-1">Citizen Dashboard</h1>
              <p className="text-sm text-muted-foreground mt-2">Your reports are making roads safer.</p>
            </div>
            <Link to="/report" className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary to-accent px-5 py-2.5 font-semibold text-primary-foreground glow-cyber">
              <Camera className="h-4 w-4" /> New Report
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard icon={FileText} label="Total Complaints" value={total} accent="primary" />
          <StatCard icon={CheckCircle2} label="Resolved" value={resolved} accent="success" />
          <StatCard icon={Clock} label="Pending" value={pending} accent="warning" />
          <StatCard icon={Gauge} label="Road Health Score" value={`${avgHealth}/100`} accent={avgHealth > 60 ? "success" : "destructive"} />
        </div>

        <div className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Recent Activity</h2>
            <Link to="/track" className="text-sm text-primary inline-flex items-center gap-1 hover:underline">
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {mockComplaints.slice(0, 5).map((c) => (
              <div key={c.complaintId} className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition">
                <div>
                  <div className="font-mono text-sm text-primary">{c.complaintId}</div>
                  <div className="text-sm font-medium mt-1">{c.issueType} · {c.location}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{c.timestamp}</div>
                </div>
                <StatusBadge status={c.status} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Submitted: "bg-muted/40 text-muted-foreground",
    Assigned: "bg-accent/20 text-accent",
    "In Progress": "bg-[oklch(0.78_0.17_75)]/20 text-[oklch(0.82_0.17_75)]",
    Resolved: "bg-[oklch(0.72_0.18_155)]/20 text-[oklch(0.78_0.18_155)]",
  };
  return <span className={`px-3 py-1 rounded-full text-xs font-medium ${map[status]}`}>{status}</span>;
}
