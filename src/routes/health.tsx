import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { StatCard } from "@/components/StatCard";
import { Gauge, AlertTriangle, Activity, CheckCircle2 } from "lucide-react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { monthlyTrend, issueBreakdown } from "@/lib/mock-data";

export const Route = createFileRoute("/health")({
  head: () => ({ meta: [{ title: "Road Health Monitoring · RoadWatch AI" }] }),
  component: Health,
});

const COLORS = ["oklch(0.72 0.18 230)", "oklch(0.78 0.2 200)", "oklch(0.78 0.17 75)", "oklch(0.72 0.18 155)", "oklch(0.65 0.24 25)"];

function Health() {
  return (
    <Layout>
      <div className="mx-auto max-w-7xl px-4 py-10">
        <h1 className="text-3xl font-bold">Road Health Monitoring</h1>
        <p className="text-muted-foreground mt-2">City-wide road infrastructure metrics.</p>

        <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={Gauge} label="Avg Health Score" value="68/100" trend="+4 vs last month" accent="success" />
          <StatCard icon={AlertTriangle} label="Severity Index" value="Medium" trend="32% high-severity" accent="warning" />
          <StatCard icon={Activity} label="Complaint Density" value="12.4/km²" accent="primary" />
          <StatCard icon={CheckCircle2} label="Resolution Rate" value="74%" trend="↑ 6% MoM" accent="success" />
        </div>

        <div className="mt-6 grid lg:grid-cols-2 gap-6">
          <div className="glass rounded-2xl p-6">
            <h3 className="font-semibold mb-4">Monthly Trend</h3>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.3 0.04 250)" />
                <XAxis dataKey="month" stroke="oklch(0.7 0.04 230)" fontSize={12} />
                <YAxis stroke="oklch(0.7 0.04 230)" fontSize={12} />
                <Tooltip contentStyle={{ background: "oklch(0.2 0.05 250)", border: "1px solid oklch(0.5 0.1 230 / 0.3)", borderRadius: 8 }} />
                <Line type="monotone" dataKey="complaints" stroke="oklch(0.78 0.2 200)" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="resolved" stroke="oklch(0.72 0.18 155)" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="glass rounded-2xl p-6">
            <h3 className="font-semibold mb-4">Issue Type Breakdown</h3>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={issueBreakdown} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
                  {issueBreakdown.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "oklch(0.2 0.05 250)", border: "1px solid oklch(0.5 0.1 230 / 0.3)", borderRadius: 8 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="glass rounded-2xl p-6 lg:col-span-2">
            <h3 className="font-semibold mb-4">Complaints vs Resolutions</h3>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.3 0.04 250)" />
                <XAxis dataKey="month" stroke="oklch(0.7 0.04 230)" fontSize={12} />
                <YAxis stroke="oklch(0.7 0.04 230)" fontSize={12} />
                <Tooltip contentStyle={{ background: "oklch(0.2 0.05 250)", border: "1px solid oklch(0.5 0.1 230 / 0.3)", borderRadius: 8 }} />
                <Bar dataKey="complaints" fill="oklch(0.72 0.18 230)" radius={[6,6,0,0]} />
                <Bar dataKey="resolved" fill="oklch(0.72 0.18 155)" radius={[6,6,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </Layout>
  );
}
