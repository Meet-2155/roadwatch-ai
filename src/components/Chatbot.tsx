import { useState } from "react";
import { MessageCircle, X, Send, Bot } from "lucide-react";

type Msg = { role: "user" | "bot"; text: string };

const presets: Record<string, string> = {
  status: "You can track any complaint by entering its ID on the Track page. Most complaints are reviewed within 24 hours.",
  pothole: "To report a pothole: go to Report Issue, upload a photo, select 'Pothole', and submit. Our AI will analyze severity automatically.",
  authority: "Complaints are auto-routed to BBMP, PWD, NHAI, or your Local Authority based on issue type and road jurisdiction.",
  default: "I'm RoadWatch Assistant. Ask me about complaint status, how to report issues, road information, or maintenance history.",
};

function answer(q: string): string {
  const s = q.toLowerCase();
  if (s.includes("status") || s.includes("track")) return presets.status;
  if (s.includes("pothole") || s.includes("report")) return presets.pothole;
  if (s.includes("author") || s.includes("bbmp") || s.includes("nhai")) return presets.authority;
  return presets.default;
}

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "bot", text: "Hi! I'm the RoadWatch AI Assistant. How can I help?" },
  ]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg: Msg = { role: "user", text: input };
    const botMsg: Msg = { role: "bot", text: answer(input) };
    setMsgs((m) => [...m, userMsg, botMsg]);
    setInput("");
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground animate-pulse-glow"
        aria-label="Open chatbot"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] h-[500px] glass rounded-2xl flex flex-col animate-fade-in-up">
          <div className="flex items-center gap-2 p-4 border-b border-border/40">
            <div className="grid h-8 w-8 place-items-center rounded-md bg-primary/20">
              <Bot className="h-4 w-4 text-primary" />
            </div>
            <div>
              <div className="text-sm font-semibold">RoadWatch Assistant</div>
              <div className="text-xs text-muted-foreground">Powered by AI</div>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] text-sm rounded-lg px-3 py-2 ${
                  m.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary/60"
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-border/40 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask about complaints, roads..."
              className="flex-1 bg-input/60 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/50"
            />
            <button onClick={send} className="grid h-9 w-9 place-items-center rounded-md bg-primary text-primary-foreground hover:opacity-90">
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
