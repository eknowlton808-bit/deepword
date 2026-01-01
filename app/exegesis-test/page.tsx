"use client";

import { useMemo, useState } from "react";

type Pillar = "Word" | "Healing" | "Living" | "Warfare" | "Journey";
type Depth = "quick" | "standard" | "deep";

type ExegesisResult = {
  passage: string;
  translation: string;
  summary: string;
  context: {
    immediate: string;
    book: string;
    historical_cultural: string;
  };
  observations: string[];
  key_terms: Array<{ term: string; note: string }>;
  cross_references: Array<{ ref: string; why: string }>;
  theology: {
    about_God: string;
    about_humans: string;
    gospel_connection: string;
  };
  application: {
    head: string;
    heart: string;
    hands: string;
  };
  pillars: Record<Pillar, string>;
  prayer: string;
  next_steps: string[];
};

const ALL_PILLARS: Pillar[] = ["Word", "Healing", "Living", "Warfare", "Journey"];

function Section(props: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginTop: 18, padding: 14, border: "1px solid #ddd", borderRadius: 10 }}>
      <h2 style={{ margin: 0, fontSize: 18 }}>{props.title}</h2>
      <div style={{ marginTop: 10 }}>{props.children}</div>
    </section>
  );
}

function Label(props: { text: string; children: React.ReactNode }) {
  return (
    <label style={{ display: "grid", gap: 6 }}>
      <div style={{ fontSize: 12, opacity: 0.8 }}>{props.text}</div>
      {props.children}
    </label>
  );
}

function PillarChip(props: { pillar: Pillar; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={props.onClick}
      style={{
        padding: "8px 10px",
        borderRadius: 999,
        border: "1px solid #ccc",
        background: props.active ? "#111" : "transparent",
        color: props.active ? "#fff" : "#111",
        cursor: "pointer",
        fontSize: 13,
      }}
      aria-pressed={props.active}
    >
      {props.pillar}
    </button>
  );
}

export default function ExegesisTestPage() {
  const [passage, setPassage] = useState("Romans 8:28");
  const [translation, setTranslation] = useState("ESV");
  const [audience, setAudience] = useState("general");
  const [tone, setTone] = useState("pastoral");
  const [depth, setDepth] = useState<Depth>("standard");
  const [pillars, setPillars] = useState<Pillar[]>(ALL_PILLARS);

  const [result, setResult] = useState<ExegesisResult | null>(null);
  const [rawJson, setRawJson] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canRun = useMemo(() => passage.trim().length > 0 && pillars.length > 0 && !loading, [passage, pillars, loading]);

  function togglePillar(p: Pillar) {
    setPillars((prev) => (prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]));
  }

  async function run() {
    if (!canRun) return;

    setLoading(true);
    setError(null);
    setResult(null);
    setRawJson(null);

    try {
      const res = await fetch("/api/exegesis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          passage,
          translation,
          audience,
          tone,
          depth,
          pillars,
        }),
      });

      const json = await res.json().catch(() => null);

    if (!res.ok) {
  setRawJson(json); // <-- keep debug payload
  const msg = json?.error || `Request failed (${res.status}).`;
  throw new Error(msg);
}

      setRawJson(json);
      setResult(json as ExegesisResult);
    } catch (e: any) {
      setError(e?.message ?? String(e));
    } finally {
      setLoading(false);
    }
  }

  async function copyJson() {
    if (!rawJson) return;
    await navigator.clipboard.writeText(JSON.stringify(rawJson, null, 2));
  }

  return (
    <main style={{ padding: 18, maxWidth: 980, margin: "0 auto" }}>
      <header style={{ display: "grid", gap: 6 }}>
        <h1 style={{ margin: 0 }}>AI Exegesis</h1>
        <div style={{ opacity: 0.75, fontSize: 13 }}>
          Server-only key • JSON-validated • Pillar-aware output
        </div>
      </header>

      <section style={{ marginTop: 16, padding: 14, border: "1px solid #ddd", borderRadius: 10 }}>
        <div style={{ display: "grid", gap: 12 }}>
          <Label text="Passage (reference or pasted text)">
            <input
              value={passage}
              onChange={(e) => setPassage(e.target.value)}
              placeholder="e.g., John 3:16–18 or paste the verse text"
              style={{ padding: 10, borderRadius: 8, border: "1px solid #ccc" }}
            />
          </Label>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 12 }}>
            <Label text="Translation">
              <input
                value={translation}
                onChange={(e) => setTranslation(e.target.value)}
                style={{ padding: 10, borderRadius: 8, border: "1px solid #ccc" }}
                placeholder="ESV"
              />
            </Label>

            <Label text="Depth">
              <select
                value={depth}
                onChange={(e) => setDepth(e.target.value as Depth)}
                style={{ padding: 10, borderRadius: 8, border: "1px solid #ccc" }}
              >
                <option value="quick">quick</option>
                <option value="standard">standard</option>
                <option value="deep">deep</option>
              </select>
            </Label>

            <Label text="Tone">
              <input
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                style={{ padding: 10, borderRadius: 8, border: "1px solid #ccc" }}
                placeholder="pastoral"
              />
            </Label>

            <Label text="Audience">
              <input
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                style={{ padding: 10, borderRadius: 8, border: "1px solid #ccc" }}
                placeholder="general"
              />
            </Label>
          </div>

          <div style={{ display: "grid", gap: 8 }}>
            <div style={{ fontSize: 12, opacity: 0.8 }}>Pillars</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {ALL_PILLARS.map((p) => (
                <PillarChip key={p} pillar={p} active={pillars.includes(p)} onClick={() => togglePillar(p)} />
              ))}
            </div>
            {pillars.length === 0 && (
              <div style={{ color: "#b00020", fontSize: 12 }}>Select at least one pillar.</div>
            )}
          </div>

          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <button
              onClick={run}
              disabled={!canRun}
              style={{
                padding: "10px 14px",
                borderRadius: 10,
                border: "1px solid #111",
                background: canRun ? "#111" : "#999",
                color: "#fff",
                cursor: canRun ? "pointer" : "not-allowed",
              }}
            >
              {loading ? "Running…" : "Run Exegesis"}
            </button>

            {rawJson && (
              <button
                type="button"
                onClick={copyJson}
                style={{
                  padding: "10px 14px",
                  borderRadius: 10,
                  border: "1px solid #ccc",
                  background: "transparent",
                  cursor: "pointer",
                }}
              >
                Copy JSON
              </button>
            )}
          </div>

          {error && (
            <div style={{ marginTop: 6, padding: 10, borderRadius: 10, border: "1px solid #b00020", color: "#b00020" }}>
              <strong>Error:</strong> {error}
              <div style={{ marginTop: 6, fontSize: 12, opacity: 0.85 }}>
                If you see “Too many requests”, wait ~60 seconds and try again.
              </div>
            </div>
          )}
        </div>
      </section>

      {result && (
        <>
          <Section title="Summary">
            <div style={{ fontSize: 15, lineHeight: 1.5 }}>{result.summary}</div>
            <div style={{ marginTop: 10, fontSize: 12, opacity: 0.8 }}>
              {result.passage} • {result.translation}
            </div>
          </Section>

          <Section title="Context">
            <div style={{ display: "grid", gap: 10 }}>
              <div><strong>Immediate:</strong> {result.context.immediate}</div>
              <div><strong>Book:</strong> {result.context.book}</div>
              <div><strong>Historical/Cultural:</strong> {result.context.historical_cultural}</div>
            </div>
          </Section>

          <Section title="Observations">
            <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 8 }}>
              {result.observations.map((o, i) => (
                <li key={i}>{o}</li>
              ))}
            </ul>
          </Section>

          <Section title="Key Terms">
            {result.key_terms.length ? (
              <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 8 }}>
                {result.key_terms.map((kt, i) => (
                  <li key={i}>
                    <strong>{kt.term}:</strong> {kt.note}
                  </li>
                ))}
              </ul>
            ) : (
              <div style={{ opacity: 0.75 }}>None listed.</div>
            )}
          </Section>

          <Section title="Cross References">
            {result.cross_references.length ? (
              <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 8 }}>
                {result.cross_references.map((cr, i) => (
                  <li key={i}>
                    <strong>{cr.ref}:</strong> {cr.why}
                  </li>
                ))}
              </ul>
            ) : (
              <div style={{ opacity: 0.75 }}>None listed.</div>
            )}
          </Section>

          <Section title="Theology">
            <div style={{ display: "grid", gap: 10 }}>
              <div><strong>About God:</strong> {result.theology.about_God}</div>
              <div><strong>About Humans:</strong> {result.theology.about_humans}</div>
              <div><strong>Gospel Connection:</strong> {result.theology.gospel_connection}</div>
            </div>
          </Section>

          <Section title="Application">
            <div style={{ display: "grid", gap: 10 }}>
              <div><strong>Head:</strong> {result.application.head}</div>
              <div><strong>Heart:</strong> {result.application.heart}</div>
              <div><strong>Hands:</strong> {result.application.hands}</div>
            </div>
          </Section>

          <Section title="Pillars">
            <div style={{ display: "grid", gap: 10 }}>
              {ALL_PILLARS.map((p) => (
                <div key={p}>
                  <strong>{p}:</strong> {result.pillars?.[p] ?? ""}
                </div>
              ))}
            </div>
          </Section>

          <Section title="Prayer">
            <div style={{ fontSize: 15, lineHeight: 1.5 }}>{result.prayer}</div>
          </Section>

          <Section title="Next Steps">
            <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 8 }}>
              {result.next_steps.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </Section>

          {/* Optional: collapsible raw JSON */}
          <Section title="Debug JSON">
            <pre style={{ margin: 0, whiteSpace: "pre-wrap", fontSize: 12, opacity: 0.9 }}>
              {JSON.stringify(rawJson, null, 2)}
            </pre>
          </Section>
        </>
      )}
    </main>
  );
}
