import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { useState } from "react";
import { Search, CheckCircle2, Clock, FileText, UserCheck } from "lucide-react";
import { mockComplaints, type Complaint } from "@/lib/mock-data";

export const Route = createFileRoute("/track")({
  head: () => ({ meta: [{ title: "Track Complaint · RoadWatch AI" }] }),
  component: Track,
});

function Track() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<Complaint | null>(mockComplaints[0]);

  const search = () => {
    const q = query.trim().toUpperCase();
    if (!q) { setResult(null); return; }
    const found = mockComplaints.find((c) => c.complaintId.toUpperCase() === q);
    setResult(found || null);
  };

  return (
    <Layout>
      <div className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="text-3xl font-bold">Track Your Complaint</h1>
        <p className="text-muted-foreground mt-2">Enter your Complaint ID (try RW1024).</p>

        <div className="mt-6 flex gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && search()}
            placeholder="e.g. RW1024"
            className="flex-1 bg-input/60 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-primary/50"
          />
          <button onClick={search} className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 font-semibold text-primary-foreground">
            <Search className="h-4 w-4" /> Search
          </button>
        </div>

        {!result && (
          <div className="glass rounded-2xl p-8 text-center mt-6 text-muted-foreground">No complaint found.</div>
        )}

        {result && (
          <div className="mt-6 space-y-4">
            <div className="glass rounded-2xl p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="font-mono text-primary">{result.complaintId}</div>
                  <h2 className="text-xl font-bold mt-1">{result.issueType}</h2>
                  <div className="text-sm text-muted-foreground mt-1">{result.location}</div>
                </div>
                <div className="text-right text-sm">
                  <div className="text-muted-foreground">Authority</div>
                  <div className="font-semibold">{result.authority}</div>
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl p-6">
              <h3 className="font-semibold mb-4">Status Timeline</h3>
              <Timeline status={result.status} />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

const stages = [
  { key: "Submitted", icon: FileText, label: "Submitted" },
  { key: "Assigned", icon: UserCheck, label: "Assigned to authority" },
  { key: "In Progress", icon: Clock, label: "Repair in progress" },
  { key: "Resolved", icon: CheckCircle2, label: "Resolved" },
];

function Timeline({ status }: { status: string }) {
  const currentIdx = stages.findIndex((s) => s.key === status);
  return (
    <ol className="relative border-l-2 border-border ml-3 space-y-6">
      {stages.map((s, i) => {
        const done = i <= currentIdx;
        const isCurrent = i === currentIdx;
        return (
          <li key={s.key} className="pl-6 relative">
            <span className={`absolute -left-[13px] grid h-6 w-6 place-items-center rounded-full border-2 ${
              done ? "bg-primary border-primary text-primary-foreground" : "bg-background border-border text-muted-foreground"
            } ${isCurrent ? "animate-pulse-glow" : ""}`}>
              <s.icon className="h-3 w-3" />
            </span>
            <div className={`font-medium ${done ? "" : "text-muted-foreground"}`}>{s.label}</div>
            {isCurrent && <div className="text-xs text-primary mt-0.5">Currently here</div>}
          </li>
        );
      })}
    </ol>
  );
}
