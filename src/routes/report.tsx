import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { useState } from "react";
import { Upload, MapPin, Loader2, CheckCircle2, Brain, AlertTriangle, Gauge } from "lucide-react";
import { generateComplaintId, routeAuthority, type IssueType } from "@/lib/mock-data";

export const Route = createFileRoute("/report")({
  head: () => ({ meta: [{ title: "Report Road Issue · RoadWatch AI" }] }),
  component: Report,
});

const categories: IssueType[] = ["Pothole", "Crack", "Waterlogging", "Damaged Road Sign", "Road Blockage"];

function Report() {
  const [image, setImage] = useState<string | null>(null);
  const [category, setCategory] = useState<IssueType>("Pothole");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("Whitefield, Bangalore");
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<null | { severity: string; healthScore: number; confidence: number; recommendation: string }>(null);
  const [submitted, setSubmitted] = useState<null | { id: string; authority: string }>(null);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
      runAnalysis();
    };
    reader.readAsDataURL(file);
  };

  const runAnalysis = () => {
    setAnalyzing(true);
    setAnalysis(null);
    setTimeout(() => {
      const severities = ["Low", "Medium", "High", "Critical"];
      const sev = severities[Math.floor(Math.random() * severities.length)];
      setAnalysis({
        severity: sev,
        healthScore: Math.floor(30 + Math.random() * 50),
        confidence: Math.floor(82 + Math.random() * 16),
        recommendation: sev === "Critical" || sev === "High"
          ? "Immediate repair required. Risk to vehicles and pedestrians."
          : "Schedule routine maintenance within 14 days.",
      });
      setAnalyzing(false);
    }, 1800);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = generateComplaintId();
    const authority = routeAuthority(category, location);
    setSubmitted({ id, authority });
  };

  if (submitted) {
    return (
      <Layout>
        <div className="mx-auto max-w-2xl px-4 py-16">
          <div className="glass rounded-2xl p-8 text-center animate-pulse-glow">
            <div className="grid h-16 w-16 place-items-center rounded-full bg-[oklch(0.72_0.18_155)]/20 mx-auto">
              <CheckCircle2 className="h-8 w-8 text-[oklch(0.78_0.18_155)]" />
            </div>
            <h2 className="mt-4 text-2xl font-bold">Complaint Submitted!</h2>
            <p className="mt-2 text-muted-foreground">Your report has been routed to the right authority.</p>
            <div className="mt-6 grid grid-cols-2 gap-4 text-left">
              <Info label="Complaint ID" value={submitted.id} mono />
              <Info label="Authority" value={submitted.authority} />
              <Info label="Issue Type" value={category} />
              <Info label="Status" value="Submitted" />
            </div>
            <button onClick={() => { setSubmitted(null); setImage(null); setAnalysis(null); }} className="mt-6 rounded-lg bg-primary px-5 py-2.5 font-semibold text-primary-foreground">
              Report Another
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="text-3xl font-bold">Report a Road Issue</h1>
        <p className="text-muted-foreground mt-2">Upload a photo and let our AI handle the rest.</p>

        <form onSubmit={submit} className="mt-8 grid lg:grid-cols-2 gap-6">
          <div className="glass rounded-2xl p-6 space-y-5">
            <div>
              <label className="text-sm font-medium">Road Image</label>
              <label className="mt-2 flex flex-col items-center justify-center gap-2 cursor-pointer border-2 border-dashed border-border rounded-xl p-8 hover:border-primary/60 transition">
                {image ? (
                  <img src={image} alt="upload" className="max-h-48 rounded-lg object-cover" />
                ) : (
                  <>
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Click to upload road photo</span>
                  </>
                )}
                <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
              </label>
            </div>

            <div>
              <label className="text-sm font-medium">Location</label>
              <div className="mt-2 flex gap-2">
                <input value={location} onChange={(e) => setLocation(e.target.value)} className="flex-1 bg-input/60 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-primary/50" />
                <button type="button" onClick={() => setLocation("Whitefield, Bangalore")} className="grid h-10 w-10 place-items-center rounded-md bg-primary/20 text-primary hover:bg-primary/30">
                  <MapPin className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Category</label>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {categories.map((c) => (
                  <button type="button" key={c} onClick={() => setCategory(c)}
                    className={`px-3 py-2 text-sm rounded-md border transition ${
                      category === c ? "bg-primary/20 border-primary text-primary" : "bg-secondary/30 border-transparent hover:bg-secondary/60"
                    }`}>{c}</button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Description (optional)</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3}
                className="mt-2 w-full bg-input/60 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-primary/50" />
            </div>

            <button type="submit" disabled={!image} className="w-full rounded-lg bg-gradient-to-r from-primary to-accent px-5 py-3 font-semibold text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed glow-cyber">
              Submit Complaint
            </button>
          </div>

          <div className="glass rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Brain className="h-5 w-5 text-primary" />
              <h2 className="font-semibold">AI Damage Analysis</h2>
            </div>

            {!image && (
              <div className="text-sm text-muted-foreground py-12 text-center">
                Upload an image to see AI-powered damage analysis.
              </div>
            )}

            {analyzing && (
              <div className="flex flex-col items-center justify-center py-12 gap-3">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <div className="text-sm text-muted-foreground">Analyzing image with Gemini Vision...</div>
              </div>
            )}

            {analysis && !analyzing && (
              <div className="space-y-4 animate-fade-in-up">
                <Info label="Issue Type" value={category} />
                <div>
                  <div className="text-xs text-muted-foreground">Severity Level</div>
                  <div className="mt-1 flex items-center gap-2">
                    <AlertTriangle className={`h-4 w-4 ${
                      analysis.severity === "Critical" ? "text-destructive" :
                      analysis.severity === "High" ? "text-[oklch(0.82_0.17_75)]" : "text-primary"
                    }`} />
                    <span className="font-semibold">{analysis.severity}</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Road Health Score</span>
                    <span className="font-mono">{analysis.healthScore}/100</span>
                  </div>
                  <div className="mt-1 h-2 rounded-full bg-secondary overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-destructive via-[oklch(0.78_0.17_75)] to-[oklch(0.72_0.18_155)]"
                      style={{ width: `${analysis.healthScore}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>AI Confidence</span>
                    <span className="font-mono">{analysis.confidence}%</span>
                  </div>
                  <div className="mt-1 h-2 rounded-full bg-secondary overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${analysis.confidence}%` }} />
                  </div>
                </div>
                <div className="rounded-lg bg-primary/10 border border-primary/30 p-3 text-sm">
                  <div className="flex items-center gap-1.5 text-xs text-primary mb-1"><Gauge className="h-3 w-3" /> AI Recommendation</div>
                  {analysis.recommendation}
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </Layout>
  );
}

function Info({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className={`mt-0.5 font-semibold ${mono ? "font-mono text-primary" : ""}`}>{value}</div>
    </div>
  );
}
