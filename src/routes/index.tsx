import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { Link } from "@tanstack/react-router";
import { Activity, Shield, Brain, MapPin, BarChart3, Zap, ArrowRight, Camera, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RoadWatch AI · AI-powered road monitoring & complaint platform" },
      { name: "description", content: "Report road issues, track complaints, and monitor road health with AI-powered analysis." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-cyber-grid">
        <div className="mx-auto max-w-7xl px-4 py-20 lg:py-28 text-center">
          <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs text-muted-foreground animate-fade-in-up">
            <Zap className="h-3 w-3 text-accent" /> AI-Powered Road Infrastructure Intelligence
          </div>
          <h1 className="mt-6 text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight animate-fade-in-up">
            Smarter Roads.<br />
            <span className="text-gradient">Transparent Cities.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base md:text-lg text-muted-foreground animate-fade-in-up">
            RoadWatch AI helps citizens report issues, analyzes damage with computer vision, and routes complaints to the right authorities — all in real time.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 animate-fade-in-up">
            <Link to="/report" className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary to-accent px-6 py-3 font-semibold text-primary-foreground glow-cyber hover:opacity-95">
              <Camera className="h-4 w-4" /> Report an Issue
            </Link>
            <Link to="/dashboard" className="inline-flex items-center gap-2 rounded-lg glass glass-hover px-6 py-3 font-semibold">
              View Dashboard <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-7xl px-4 -mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Complaints Filed", value: "12,840" },
            { label: "Roads Monitored", value: "1,256" },
            { label: "Avg Resolution", value: "4.2 days" },
            { label: "AI Accuracy", value: "94%" },
          ].map((s) => (
            <div key={s.label} className="glass rounded-xl p-5 text-center">
              <div className="text-2xl md:text-3xl font-bold text-gradient">{s.value}</div>
              <div className="mt-1 text-xs md:text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Built for Citizens & Authorities</h2>
          <p className="mt-3 text-muted-foreground">Every feature you need to monitor, report, and resolve.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { icon: Brain, title: "AI Damage Analysis", desc: "Gemini Vision detects potholes, cracks, and waterlogging from a single photo with severity scoring." },
            { icon: MapPin, title: "Auto Geolocation", desc: "Pinpoint issues on Google Maps automatically — no manual address entry needed." },
            { icon: Shield, title: "Authority Routing", desc: "Smart routing to BBMP, PWD, NHAI, or local authority based on issue type and jurisdiction." },
            { icon: BarChart3, title: "Road Health Scoring", desc: "Real-time road health metrics with complaint density and resolution analytics." },
            { icon: Activity, title: "Live Tracking", desc: "Track complaint status from submission to resolution with a transparent timeline." },
            { icon: CheckCircle2, title: "Budget Transparency", desc: "See road budgets, contractors, and repair history publicly. Accountability built-in." },
          ].map((f) => (
            <div key={f.title} className="glass glass-hover rounded-xl p-6">
              <div className="grid h-11 w-11 place-items-center rounded-lg bg-gradient-to-br from-primary/30 to-accent/20">
                <f.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-4 pb-20">
        <div className="glass rounded-2xl p-10 text-center animate-pulse-glow">
          <h2 className="text-2xl md:text-3xl font-bold">Spot a bad road? Report it in 30 seconds.</h2>
          <p className="mt-3 text-muted-foreground">One photo. AI handles the rest.</p>
          <Link to="/report" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary to-accent px-6 py-3 font-semibold text-primary-foreground">
            <Camera className="h-4 w-4" /> Start Reporting
          </Link>
        </div>
      </section>
    </Layout>
  );
}
