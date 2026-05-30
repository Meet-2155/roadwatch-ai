import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { mockBudgets } from "@/lib/mock-data";
import { IndianRupee } from "lucide-react";

export const Route = createFileRoute("/budget")({
  head: () => ({ meta: [{ title: "Budget Transparency · RoadWatch AI" }] }),
  component: Budget,
});

const fmt = (n: number) => "₹" + (n / 1_00_00_000).toFixed(2) + " Cr";

function Budget() {
  return (
    <Layout>
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-lg bg-primary/20"><IndianRupee className="h-6 w-6 text-primary" /></div>
          <div>
            <h1 className="text-3xl font-bold">Budget Transparency</h1>
            <p className="text-muted-foreground mt-1">Public view of road repair budgets and contracts.</p>
          </div>
        </div>

        <div className="mt-8 glass rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-secondary/40 text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="text-left px-4 py-3">Road</th>
                  <th className="text-left px-4 py-3">Allocated</th>
                  <th className="text-left px-4 py-3">Spent</th>
                  <th className="text-left px-4 py-3">Utilization</th>
                  <th className="text-left px-4 py-3">Contractor</th>
                  <th className="text-left px-4 py-3">Last Repair</th>
                </tr>
              </thead>
              <tbody>
                {mockBudgets.map((b) => {
                  const pct = Math.round((b.spent / b.allocated) * 100);
                  return (
                    <tr key={b.roadName} className="border-t border-border/40 hover:bg-secondary/20">
                      <td className="px-4 py-4 font-medium">{b.roadName}</td>
                      <td className="px-4 py-4">{fmt(b.allocated)}</td>
                      <td className="px-4 py-4">{fmt(b.spent)}</td>
                      <td className="px-4 py-4 w-48">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 rounded-full bg-secondary overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-primary to-accent" style={{ width: `${pct}%` }} />
                          </div>
                          <span className="text-xs font-mono">{pct}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-muted-foreground">{b.contractor}</td>
                      <td className="px-4 py-4 text-muted-foreground">{b.lastRepair}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
