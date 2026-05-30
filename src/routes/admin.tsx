import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { StatCard } from "@/components/StatCard";
import { useState } from "react";
import { mockComplaints, type Complaint, type ComplaintStatus } from "@/lib/mock-data";
import { FileText, Clock, CheckCircle2, AlertTriangle, Shield } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin Dashboard · RoadWatch AI" }] }),
  component: Admin,
});

const statuses: ComplaintStatus[] = ["Submitted", "Assigned", "In Progress", "Resolved"];

function Admin() {
  const [data, setData] = useState<Complaint[]>(mockComplaints);
  const [filter, setFilter] = useState<string>("All");

  const updateStatus = (id: string, status: ComplaintStatus) => {
    setData((prev) => prev.map((c) => c.complaintId === id ? { ...c, status } : c));
  };

  const filtered = filter === "All" ? data : data.filter((c) => c.status === filter);
  const stats = {
    total: data.length,
    pending: data.filter((c) => c.status !== "Resolved").length,
    resolved: data.filter((c) => c.status === "Resolved").length,
    critical: data.filter((c) => c.severity === "Critical" || c.severity === "High").length,
  };

  return (
    <Layout>
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-lg bg-accent/20"><Shield className="h-6 w-6 text-accent" /></div>
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-1">Manage and resolve citizen complaints.</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={FileText} label="Total" value={stats.total} accent="primary" />
          <StatCard icon={Clock} label="Pending" value={stats.pending} accent="warning" />
          <StatCard icon={CheckCircle2} label="Resolved" value={stats.resolved} accent="success" />
          <StatCard icon={AlertTriangle} label="High Priority" value={stats.critical} accent="destructive" />
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {["All", ...statuses].map((s) => (
            <button key={s} onClick={() => setFilter(s)} className={`px-4 py-1.5 text-sm rounded-full transition ${
              filter === s ? "bg-primary text-primary-foreground" : "glass glass-hover"
            }`}>{s}</button>
          ))}
        </div>

        <div className="mt-4 glass rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-secondary/40 text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="text-left px-4 py-3">ID</th>
                  <th className="text-left px-4 py-3">Issue</th>
                  <th className="text-left px-4 py-3">Location</th>
                  <th className="text-left px-4 py-3">Severity</th>
                  <th className="text-left px-4 py-3">Authority</th>
                  <th className="text-left px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr key={c.complaintId} className="border-t border-border/40 hover:bg-secondary/20">
                    <td className="px-4 py-3 font-mono text-primary">{c.complaintId}</td>
                    <td className="px-4 py-3">{c.issueType}</td>
                    <td className="px-4 py-3 text-muted-foreground">{c.location}</td>
                    <td className="px-4 py-3">
                      <SeverityPill s={c.severity} />
                    </td>
                    <td className="px-4 py-3">{c.authority}</td>
                    <td className="px-4 py-3">
                      <select value={c.status} onChange={(e) => updateStatus(c.complaintId, e.target.value as ComplaintStatus)}
                        className="bg-input/60 rounded-md px-2 py-1.5 text-xs outline-none focus:ring-2 focus:ring-primary/50">
                        {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}

function SeverityPill({ s }: { s: string }) {
  const map: Record<string, string> = {
    Low: "bg-muted/40 text-muted-foreground",
    Medium: "bg-primary/20 text-primary",
    High: "bg-[oklch(0.78_0.17_75)]/20 text-[oklch(0.82_0.17_75)]",
    Critical: "bg-destructive/20 text-destructive",
  };
  return <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${map[s]}`}>{s}</span>;
}
