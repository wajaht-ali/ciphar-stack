import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Download,
  FileDown,
  FlaskConical,
  GripVertical,
  HelpCircle,
  Info,
  Keyboard,
  Layers,
  LifeBuoy,
  Lock,
  MousePointerClick,
  Play,
  Rocket,
  Sparkles,
  Target,
  Unlock,
  Upload,
  Workflow,
  X,
  XCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Docs — CipherStack",
  description:
    "Step-by-step guide, worked examples, and test cases for CipherStack.",
};

const SECTIONS: Array<{ id: string; label: string }> = [
  { id: "overview", label: "Overview" },
  { id: "concepts", label: "Core concepts" },
  { id: "quick-start", label: "Quick start" },
  { id: "interface", label: "The interface" },
  { id: "ciphers", label: "Cipher library" },
  { id: "building", label: "Building a pipeline" },
  { id: "running", label: "Running the pipeline" },
  { id: "presets", label: "Presets" },
  { id: "export-import", label: "Export & import" },
  { id: "shortcuts", label: "Keyboard shortcuts" },
  { id: "test-cases", label: "Test cases" },
  { id: "walkthrough", label: "Full walkthrough" },
  { id: "faq", label: "FAQ" },
  { id: "troubleshooting", label: "Troubleshooting" },
];

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="inline-flex items-center rounded-md border border-neutral-700 bg-neutral-900 px-1.5 py-0.5 font-mono text-[11px] text-neutral-200">
      {children}
    </kbd>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded-md border border-neutral-800 bg-neutral-900 px-1.5 py-0.5 font-mono text-[12px] text-emerald-300">
      {children}
    </code>
  );
}

function CodeBlock({ children }: { children: React.ReactNode }) {
  return (
    <pre className="overflow-x-auto rounded-md border border-neutral-800 bg-neutral-900/60 p-3 font-mono text-xs leading-relaxed text-emerald-300">
      {children}
    </pre>
  );
}

function Section({
  id,
  icon,
  title,
  children,
}: {
  id: string;
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="flex scroll-mt-24 flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-neutral-800 bg-neutral-900 text-emerald-400">
          {icon}
        </div>
        <h2 className="text-xl font-semibold tracking-tight text-neutral-100 sm:text-2xl">
          {title}
        </h2>
      </div>
      <div className="flex flex-col gap-3 text-sm leading-relaxed text-neutral-300">
        {children}
      </div>
    </section>
  );
}

function Callout({
  kind = "info",
  children,
}: {
  kind?: "info" | "tip" | "warn";
  children: React.ReactNode;
}) {
  const tone =
    kind === "tip"
      ? "border-emerald-500/40 bg-emerald-500/5 text-emerald-200"
      : kind === "warn"
        ? "border-amber-500/40 bg-amber-500/5 text-amber-200"
        : "border-neutral-700 bg-neutral-900/60 text-neutral-200";
  const Icon = kind === "tip" ? Sparkles : kind === "warn" ? LifeBuoy : Info;
  return (
    <div
      className={`flex items-start gap-2 rounded-md border px-3 py-2 text-xs leading-relaxed sm:text-sm ${tone}`}
    >
      <Icon size={14} strokeWidth={1.75} className="mt-0.5 shrink-0" />
      <div>{children}</div>
    </div>
  );
}

function CipherCard({
  icon,
  name,
  config,
  example,
  description,
  invertible,
}: {
  icon: React.ReactNode;
  name: string;
  config: string;
  example: React.ReactNode;
  description: string;
  invertible: string;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-neutral-800 bg-neutral-900/50 p-4">
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-md border border-neutral-800 bg-neutral-900 text-emerald-400">
          {icon}
        </div>
        <span className="text-base font-semibold text-neutral-100">
          {name}
        </span>
      </div>
      <p className="text-sm leading-relaxed text-neutral-300">{description}</p>
      <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 text-xs">
        <span className="text-neutral-500">Config</span>
        <span className="text-neutral-200">{config}</span>
        <span className="text-neutral-500">Inverse</span>
        <span className="text-neutral-200">{invertible}</span>
        <span className="self-start text-neutral-500">Example</span>
        <span className="flex flex-col gap-1 font-mono text-emerald-300">
          {example}
        </span>
      </div>
    </div>
  );
}

function Step({
  n,
  children,
}: {
  n: number;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 text-xs font-semibold text-emerald-300">
        {n}
      </span>
      <div className="flex-1 text-sm leading-relaxed text-neutral-200">
        {children}
      </div>
    </li>
  );
}

function TestCase({
  num,
  title,
  goal,
  steps,
  expected,
}: {
  num: number;
  title: string;
  goal: string;
  steps: React.ReactNode[];
  expected: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-neutral-800 bg-neutral-900/50 p-4">
      <div className="flex flex-wrap items-baseline gap-2">
        <span className="rounded-md border border-emerald-500/40 bg-emerald-500/10 px-2 py-0.5 font-mono text-[11px] text-emerald-300">
          Test {num}
        </span>
        <span className="text-base font-semibold text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-xs text-neutral-400 sm:text-sm">
        <span className="text-neutral-500">Goal:</span> {goal}
      </p>
      <ol className="flex flex-col gap-2">
        {steps.map((s, i) => (
          <Step key={i} n={i + 1}>
            {s}
          </Step>
        ))}
      </ol>
      <div className="flex items-start gap-2 rounded-md border border-emerald-500/30 bg-emerald-500/5 px-3 py-2 text-xs text-emerald-200 sm:text-sm">
        <CheckCircle2 size={14} strokeWidth={1.75} className="mt-0.5 shrink-0" />
        <div>
          <span className="font-medium">Expected:</span> {expected}
        </div>
      </div>
    </div>
  );
}

function Faq({
  q,
  children,
}: {
  q: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-neutral-800 bg-neutral-900/40 p-4">
      <p className="text-sm font-semibold text-neutral-100">{q}</p>
      <div className="mt-1.5 text-sm leading-relaxed text-neutral-300">
        {children}
      </div>
    </div>
  );
}

function Toc() {
  return (
    <>
      {/* Mobile horizontal TOC (chips) */}
      <nav
        aria-label="Documentation sections"
        className="border-b border-neutral-800 bg-neutral-950 px-3 py-3 lg:hidden"
      >
        <div className="flex gap-2 overflow-x-auto">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="shrink-0 rounded-full border border-neutral-800 bg-neutral-900 px-3 py-1.5 text-xs text-neutral-300 transition-colors duration-150 hover:border-emerald-500/40 hover:text-emerald-300"
            >
              {s.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Desktop sticky sidebar TOC */}
      <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-[240px] shrink-0 flex-col gap-1 overflow-y-auto border-r border-neutral-800 bg-neutral-950 px-3 py-6 lg:flex">
        <div className="px-2 pb-2 text-[11px] font-medium uppercase tracking-wider text-neutral-500">
          On this page
        </div>
        {SECTIONS.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="rounded-md px-2 py-1.5 text-sm text-neutral-400 transition-colors duration-150 hover:bg-neutral-900 hover:text-neutral-100"
          >
            {s.label}
          </a>
        ))}
      </aside>
    </>
  );
}

export default function DocsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-neutral-950 text-neutral-100">
      <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center justify-between gap-2 border-b border-neutral-800 bg-neutral-950/90 px-3 backdrop-blur sm:h-16 sm:gap-3 sm:px-4">
        <Link href="/" className="flex min-w-0 items-center gap-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-neutral-800 bg-neutral-900">
            <Layers size={18} strokeWidth={1.75} className="text-emerald-400" />
          </div>
          <span className="truncate text-base font-semibold tracking-tight sm:text-xl">
            CipherStack
          </span>
          <span className="hidden text-sm text-neutral-500 sm:inline">/ Docs</span>
        </Link>
        <Link
          href="/"
          className="flex items-center gap-1.5 rounded-md border border-neutral-800 bg-neutral-900 px-2.5 py-1.5 text-xs font-medium text-neutral-200 transition-colors duration-150 hover:cursor-pointer hover:border-emerald-500/40 hover:text-emerald-300 sm:px-3"
        >
          <ArrowLeft size={14} strokeWidth={1.75} />
          <span className="hidden sm:inline">Back to app</span>
          <span className="sm:hidden">App</span>
        </Link>
      </header>

      <div className="flex flex-1 flex-col lg:flex-row">
        <Toc />

        <main className="flex-1 px-4 py-8 sm:px-6 sm:py-10 lg:px-10 lg:py-12">
          <article className="mx-auto flex max-w-3xl flex-col gap-12">
            {/* Hero */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-emerald-400">
                <BookOpen size={14} strokeWidth={1.75} />
                Documentation
              </div>
              <h1 className="text-3xl font-semibold tracking-tight text-neutral-100 sm:text-4xl">
                How to use CipherStack
              </h1>
              <p className="max-w-2xl text-sm leading-relaxed text-neutral-400 sm:text-base">
                CipherStack lets you chain multiple ciphers into a single
                encryption pipeline and see the data transform at every step.
                This guide walks you through the whole app — start to finish —
                with copy-paste-ready test cases at the end.
              </p>
            </div>

            {/* 1. Overview */}
            <Section
              id="overview"
              icon={<Info size={18} strokeWidth={1.75} />}
              title="1. What is CipherStack?"
            >
              <p>
                CipherStack is a visual builder for <strong>cascade encryption</strong> —
                the practice of running your message through more than one
                cipher in a row. The output of the first cipher becomes the
                input of the next, and so on.
              </p>
              <p>
                Think of it like an assembly line at a factory:
              </p>
              <ul className="list-disc space-y-1 pl-5 marker:text-neutral-600">
                <li>A raw product (your message) enters at one end.</li>
                <li>Each station (a cipher) transforms it in some way.</li>
                <li>A finished product (the ciphertext) comes out the other end.</li>
                <li>
                  Running the line <em>backwards</em>, with each station doing the
                  reverse of its job, gives you the original message back.
                </li>
              </ul>
              <Callout kind="warn">
                CipherStack is a <strong>learning and demo tool</strong>. The
                ciphers here are classic algorithms, not real-world encryption.
                Please don&rsquo;t use it to protect anything important.
              </Callout>
            </Section>

            {/* 2. Core concepts */}
            <Section
              id="concepts"
              icon={<Target size={18} strokeWidth={1.75} />}
              title="2. Core concepts"
            >
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-4">
                  <div className="mb-1 text-sm font-semibold text-emerald-300">
                    Plaintext
                  </div>
                  <p className="text-xs text-neutral-300 sm:text-sm">
                    The readable message you start with. Example:{" "}
                    <Code>hello world</Code>.
                  </p>
                </div>
                <div className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-4">
                  <div className="mb-1 text-sm font-semibold text-emerald-300">
                    Ciphertext
                  </div>
                  <p className="text-xs text-neutral-300 sm:text-sm">
                    The scrambled output after encryption. Example:{" "}
                    <Code>Z291cnogcm9vaGs=</Code>.
                  </p>
                </div>
                <div className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-4">
                  <div className="mb-1 text-sm font-semibold text-emerald-300">
                    Pipeline
                  </div>
                  <p className="text-xs text-neutral-300 sm:text-sm">
                    The ordered chain of ciphers. Same chain, different order =
                    different output.
                  </p>
                </div>
                <div className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-4">
                  <div className="mb-1 text-sm font-semibold text-emerald-300">
                    Round-trip
                  </div>
                  <p className="text-xs text-neutral-300 sm:text-sm">
                    Encrypt then decrypt. If you get the exact original back,
                    the round-trip worked.
                  </p>
                </div>
              </div>
              <p>
                The app has two <strong>modes</strong>:
              </p>
              <ul className="list-disc space-y-1 pl-5 marker:text-neutral-600">
                <li>
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-500/15 px-1.5 py-0.5 text-xs text-emerald-300">
                    <Lock size={11} strokeWidth={1.75} /> Encrypt
                  </span>{" "}
                  — reads your plaintext, runs every cipher in order, fills in
                  the ciphertext.
                </li>
                <li>
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-amber-500/15 px-1.5 py-0.5 text-xs text-amber-300">
                    <Unlock size={11} strokeWidth={1.75} /> Decrypt
                  </span>{" "}
                  — reads the ciphertext, runs every cipher <em>in reverse</em>{" "}
                  with inverse operations, fills in the plaintext. A{" "}
                  <span className="text-emerald-300">
                    Round-trip verified
                  </span>{" "}
                  badge confirms your recovered text matches.
                </li>
              </ul>
            </Section>

            {/* 3. Quick start */}
            <Section
              id="quick-start"
              icon={<Rocket size={18} strokeWidth={1.75} />}
              title="3. Quick start — your first pipeline in 60 seconds"
            >
              <ol className="flex flex-col gap-2.5">
                <Step n={1}>
                  Open the app (the home page). You&rsquo;ll see three panels:{" "}
                  <strong>Library</strong> on the left, <strong>Pipeline</strong> in
                  the middle, <strong>Plaintext / Ciphertext</strong> on the right.
                  On phones, the panels stack vertically.
                </Step>
                <Step n={2}>
                  In the <strong>Library</strong>, under{" "}
                  <strong>Presets</strong>, click <Code>Simple</Code>. Three
                  cipher nodes appear in the Pipeline and{" "}
                  <Code>hello world</Code> is placed in the Plaintext box.
                </Step>
                <Step n={3}>
                  Click the green <strong>Run</strong> button at the top right.
                  Watch each node light up in turn; its <Code>in:</Code> and{" "}
                  <Code>out:</Code> values appear so you can see the message
                  change at every step.
                </Step>
                <Step n={4}>
                  The final ciphertext appears in the Ciphertext box on the
                  right. That&rsquo;s your encrypted message.
                </Step>
                <Step n={5}>
                  Click <strong>Decrypt</strong> at the top (the mode toggle
                  switches from emerald to amber). The Plaintext box becomes
                  read-only; the Ciphertext box becomes editable.
                </Step>
                <Step n={6}>
                  Click <strong>Run</strong> again. The pipeline runs in
                  reverse, recovers <Code>hello world</Code>, and a green{" "}
                  <strong>Round-trip verified</strong> badge appears.
                </Step>
              </ol>
              <Callout kind="tip">
                That&rsquo;s the full loop: <strong>encrypt → decrypt → verify</strong>.
                Everything else is a variation of it.
              </Callout>
            </Section>

            {/* 4. The interface */}
            <Section
              id="interface"
              icon={<Workflow size={18} strokeWidth={1.75} />}
              title="4. The interface"
            >
              <p>Three panels, one header.</p>
              <div className="flex flex-col gap-3">
                <div className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-4">
                  <div className="mb-1 text-sm font-semibold text-neutral-100">
                    Header (top)
                  </div>
                  <p className="text-xs text-neutral-300 sm:text-sm">
                    Logo on the left, mode toggle (Encrypt / Decrypt) in the
                    middle, Run button on the right. A small Docs link takes
                    you here.
                  </p>
                </div>
                <div className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-4">
                  <div className="mb-1 text-sm font-semibold text-neutral-100">
                    Library (left)
                  </div>
                  <p className="text-xs text-neutral-300 sm:text-sm">
                    Three sections: <strong>Ciphers</strong> (click to add a
                    node), <strong>Presets</strong> (one-click starter chains),
                    <strong> Tools</strong> (Export / Import / Clear).
                  </p>
                </div>
                <div className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-4">
                  <div className="mb-1 text-sm font-semibold text-neutral-100">
                    Pipeline (middle)
                  </div>
                  <p className="text-xs text-neutral-300 sm:text-sm">
                    Your chain of cipher nodes, top to bottom. Arrows between
                    nodes show the direction of data flow. Drag the handle{" "}
                    (<GripVertical size={12} strokeWidth={1.75} className="inline" />)
                    to reorder, click the <X size={12} strokeWidth={1.75} className="inline" />{" "}
                    to remove.
                  </p>
                </div>
                <div className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-4">
                  <div className="mb-1 text-sm font-semibold text-neutral-100">
                    Input / Output (right)
                  </div>
                  <p className="text-xs text-neutral-300 sm:text-sm">
                    Plaintext on top, Ciphertext below. Which one is editable
                    depends on the mode. A round-trip verification badge
                    appears after a successful decrypt.
                  </p>
                </div>
              </div>
            </Section>

            {/* 5. Cipher library */}
            <Section
              id="ciphers"
              icon={<Sparkles size={18} strokeWidth={1.75} />}
              title="5. The cipher library (5 algorithms)"
            >
              <p>
                Each cipher has its own configuration. All ciphers work on
                strings and always produce strings, so chains never break.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <CipherCard
                  icon={<span className="text-sm font-bold">C</span>}
                  name="Caesar Cipher"
                  description="Shifts every ASCII letter (A–Z, a–z) by a fixed number of positions. Non-letters pass through unchanged; case is preserved."
                  config="Shift: integer from -25 to 25 (default 3)"
                  invertible="Shift by the negative amount"
                  example={
                    <>
                      <span>in:  hello</span>
                      <span>shift 3 → khoor</span>
                    </>
                  }
                />
                <CipherCard
                  icon={<span className="text-sm font-bold">V</span>}
                  name="Vigenère Cipher"
                  description="Polyalphabetic shift driven by a keyword. Each letter of the keyword gives a different shift, cycling through as the message is processed."
                  config="Keyword: letters only (default “key”)"
                  invertible="Subtract the keyword shifts"
                  example={
                    <>
                      <span>in:  hello</span>
                      <span>key “key” → rijvs</span>
                    </>
                  }
                />
                <CipherCard
                  icon={<span className="text-sm font-bold">X</span>}
                  name="XOR Cipher"
                  description="Combines the message bytes with a repeating key byte-by-byte using XOR. Because the raw bytes may not be printable, the output is serialized as lowercase hex."
                  config="Key: any non-empty string (default “key”)"
                  invertible="Apply the same XOR to the hex (self-inverse)"
                  example={
                    <>
                      <span>in:  hello</span>
                      <span>key “k3y” → 0356140714</span>
                    </>
                  }
                />
                <CipherCard
                  icon={<span className="text-sm font-bold">R</span>}
                  name="Reverse"
                  description="Reverses the string end-to-end. It is its own inverse: running Reverse twice returns the original."
                  config="None"
                  invertible="Self-inverse"
                  example={
                    <>
                      <span>in:  hello</span>
                      <span>out: olleh</span>
                    </>
                  }
                />
                <CipherCard
                  icon={<span className="text-sm font-bold">B</span>}
                  name="Base64"
                  description="Standard Base64 encoding, UTF-8 safe. Handy for wrapping binary-ish output into ASCII so later stages can treat it as normal text."
                  config="None"
                  invertible="Standard Base64 decode"
                  example={
                    <>
                      <span>in:  hello</span>
                      <span>out: aGVsbG8=</span>
                    </>
                  }
                />
              </div>
              <Callout>
                Pieces that don&rsquo;t operate on letters (digits, spaces,
                punctuation) simply pass through the Caesar and Vigenère
                ciphers unchanged. Base64 and XOR handle every character,
                including emoji and non-English text.
              </Callout>
            </Section>

            {/* 6. Building */}
            <Section
              id="building"
              icon={<MousePointerClick size={18} strokeWidth={1.75} />}
              title="6. Building a pipeline"
            >
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-4">
                  <div className="mb-1 text-sm font-semibold text-neutral-100">
                    Add a node
                  </div>
                  <p className="text-xs text-neutral-300 sm:text-sm">
                    Click a cipher name in the Library. A new card appends to
                    the bottom of the Pipeline with default config.
                  </p>
                </div>
                <div className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-4">
                  <div className="mb-1 text-sm font-semibold text-neutral-100">
                    Configure
                  </div>
                  <p className="text-xs text-neutral-300 sm:text-sm">
                    Edit the value inside the card (shift, keyword, or key).
                    Changes are applied live. A red border means the config is
                    invalid.
                  </p>
                </div>
                <div className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-4">
                  <div className="mb-1 text-sm font-semibold text-neutral-100">
                    Reorder
                  </div>
                  <p className="text-xs text-neutral-300 sm:text-sm">
                    Grab the{" "}
                    <GripVertical size={12} strokeWidth={1.75} className="inline" />{" "}
                    handle on the left of the card and drag it up or down.
                  </p>
                </div>
                <div className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-4">
                  <div className="mb-1 text-sm font-semibold text-neutral-100">
                    Remove
                  </div>
                  <p className="text-xs text-neutral-300 sm:text-sm">
                    Click the{" "}
                    <X size={12} strokeWidth={1.75} className="inline" /> in
                    the top-right corner of a card. The node fades out; there
                    is no confirmation step.
                  </p>
                </div>
              </div>
              <Callout kind="warn">
                You need <strong>at least 3 nodes</strong> before Run becomes
                active. Fewer nodes = not really a cascade.
              </Callout>
            </Section>

            {/* 7. Running */}
            <Section
              id="running"
              icon={<Play size={18} strokeWidth={1.75} />}
              title="7. Running the pipeline"
            >
              <p>
                Click <strong>Run</strong> (or press{" "}
                <Kbd>Ctrl / ⌘</Kbd> + <Kbd>↵</Kbd>).
              </p>
              <ul className="list-disc space-y-1 pl-5 marker:text-neutral-600">
                <li>
                  In <strong>Encrypt</strong> mode, nodes run top-to-bottom.
                </li>
                <li>
                  In <strong>Decrypt</strong> mode, nodes run bottom-to-top and
                  each uses its inverse operation.
                </li>
                <li>
                  After a run, each node card displays <Code>in:</Code> (the
                  value it received) and <Code>out:</Code> (the value it
                  produced). Long values are truncated with ellipsis — hover
                  for the full text.
                </li>
              </ul>
              <CodeBlock>{`Encrypt example (Simple preset):
"hello world"
  → Caesar(3)  →  "khoor zruog"
  → Reverse    →  "gourz roohk"
  → Base64     →  "Z291cnogcm9vaGs="`}</CodeBlock>
              <p>The reverse journey brings it all the way back:</p>
              <CodeBlock>{`Decrypt example:
"Z291cnogcm9vaGs="
  → Base64 decode  →  "gourz roohk"
  → Reverse        →  "khoor zruog"
  → Caesar(-3)     →  "hello world"
  ✓ Round-trip verified`}</CodeBlock>
            </Section>

            {/* 8. Presets */}
            <Section
              id="presets"
              icon={<Sparkles size={18} strokeWidth={1.75} />}
              title="8. Presets"
            >
              <p>
                Three ready-made chains in the Library. One click replaces your
                current pipeline with the preset and fills in a sample
                plaintext.
              </p>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-4">
                  <div className="text-sm font-semibold text-neutral-100">
                    Simple
                  </div>
                  <p className="mt-1 text-xs text-neutral-400">
                    Caesar → Reverse → Base64
                  </p>
                  <p className="mt-2 font-mono text-xs text-emerald-300">
                    &ldquo;hello world&rdquo;
                  </p>
                </div>
                <div className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-4">
                  <div className="text-sm font-semibold text-neutral-100">
                    Classical
                  </div>
                  <p className="mt-1 text-xs text-neutral-400">
                    Caesar → Vigenère → Reverse
                  </p>
                  <p className="mt-2 font-mono text-xs text-emerald-300">
                    &ldquo;attack at dawn&rdquo;
                  </p>
                </div>
                <div className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-4">
                  <div className="text-sm font-semibold text-neutral-100">
                    Mixed
                  </div>
                  <p className="mt-1 text-xs text-neutral-400">
                    Base64 → XOR → Caesar
                  </p>
                  <p className="mt-2 font-mono text-xs text-emerald-300">
                    &ldquo;cascade encryption&rdquo;
                  </p>
                </div>
              </div>
            </Section>

            {/* 9. Export / Import */}
            <Section
              id="export-import"
              icon={<FileDown size={18} strokeWidth={1.75} />}
              title="9. Export & import"
            >
              <p>
                Save your pipeline configuration as a JSON file, share it with
                a friend, or load a previously saved chain.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-4">
                  <div className="mb-1 flex items-center gap-1.5 text-sm font-semibold text-neutral-100">
                    <Download size={14} strokeWidth={1.75} />
                    Export JSON
                  </div>
                  <p className="text-xs text-neutral-300 sm:text-sm">
                    Downloads{" "}
                    <Code>cipherstack-pipeline-YYYY-MM-DDTHH-MM-SS.json</Code>{" "}
                    with every node&rsquo;s type, config, and the current
                    plaintext.
                  </p>
                </div>
                <div className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-4">
                  <div className="mb-1 flex items-center gap-1.5 text-sm font-semibold text-neutral-100">
                    <Upload size={14} strokeWidth={1.75} />
                    Import JSON
                  </div>
                  <p className="text-xs text-neutral-300 sm:text-sm">
                    Opens a file picker. A valid file replaces your pipeline;
                    an invalid one shows an error toast and changes nothing.
                  </p>
                </div>
              </div>
              <Callout>
                Your pipeline also survives a page refresh — the app stores the
                nodes, current mode, and plaintext in your browser&rsquo;s
                local storage. Clearing site data resets everything.
              </Callout>
            </Section>

            {/* 10. Shortcuts */}
            <Section
              id="shortcuts"
              icon={<Keyboard size={18} strokeWidth={1.75} />}
              title="10. Keyboard shortcuts"
            >
              <div className="overflow-hidden rounded-lg border border-neutral-800">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-neutral-800 bg-neutral-900/50 text-xs uppercase tracking-wider text-neutral-500">
                    <tr>
                      <th className="px-4 py-2 font-medium">Shortcut</th>
                      <th className="px-4 py-2 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800">
                    <tr>
                      <td className="px-4 py-3">
                        <Kbd>Ctrl / ⌘</Kbd> + <Kbd>Enter</Kbd>
                      </td>
                      <td className="px-4 py-3 text-neutral-300">
                        Run the pipeline
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">
                        <Kbd>Ctrl / ⌘</Kbd> + <Kbd>K</Kbd>
                      </td>
                      <td className="px-4 py-3 text-neutral-300">
                        Toggle between Encrypt and Decrypt
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Section>

            {/* 11. Test cases */}
            <Section
              id="test-cases"
              icon={<FlaskConical size={18} strokeWidth={1.75} />}
              title="11. Test cases"
            >
              <p>
                Follow each one step by step and compare against the expected
                result. If something doesn&rsquo;t match, that&rsquo;s a bug —
                please report it.
              </p>

              <TestCase
                num={1}
                title="Simple preset round-trip"
                goal="Verify the end-to-end encrypt → decrypt cycle on a known input."
                steps={[
                  <>In the Library, click the <Code>Simple</Code> preset.</>,
                  <>Confirm 3 nodes appear: <Code>Caesar Cipher</Code>, <Code>Reverse</Code>, <Code>Base64</Code>, and that <Code>hello world</Code> is in the Plaintext box.</>,
                  <>Click <strong>Run</strong> (or press <Kbd>Ctrl</Kbd>+<Kbd>Enter</Kbd>).</>,
                  <>Switch to <strong>Decrypt</strong> and click <strong>Run</strong> again.</>,
                ]}
                expected={
                  <>
                    After encrypt, the Ciphertext box shows{" "}
                    <Code>Z291cnogcm9vaGs=</Code>. After decrypt, the Plaintext
                    box shows <Code>hello world</Code> and a green{" "}
                    <strong>Round-trip verified</strong> badge appears.
                  </>
                }
              />

              <TestCase
                num={2}
                title="Three Caesars = one bigger Caesar"
                goal="Understand how the cascade composes: three shifts of +3 should equal one shift of +9."
                steps={[
                  <>Click <strong>Clear pipeline</strong> to start fresh.</>,
                  <>Click <Code>Caesar Cipher</Code> in the Library <strong>three times</strong>. You now have three Caesar nodes, each at the default shift of 3.</>,
                  <>In the Plaintext box, type <Code>test</Code>.</>,
                  <>Click <strong>Run</strong>.</>,
                  <>Switch to <strong>Decrypt</strong> and click <strong>Run</strong>.</>,
                ]}
                expected={
                  <>
                    Encrypted ciphertext is <Code>cnbc</Code> (three shifts of
                    +3 = +9 total). Decryption returns <Code>test</Code> with a
                    green verification badge.
                  </>
                }
              />

              <TestCase
                num={3}
                title="Order matters"
                goal="Prove that re-ordering the same nodes produces a different ciphertext."
                steps={[
                  <>Load the <Code>Simple</Code> preset and click <strong>Run</strong>. Note the ciphertext (<Code>Z291cnogcm9vaGs=</Code>).</>,
                  <>Drag the <Code>Base64</Code> node (node 3) to the top (position 1) using the grip handle.</>,
                  <>Make sure you&rsquo;re still in <strong>Encrypt</strong> mode and click <strong>Run</strong>.</>,
                ]}
                expected={
                  <>
                    The ciphertext changes completely — the new order is{" "}
                    <Code>Base64 → Caesar → Reverse</Code>, so Base64 encodes
                    the plaintext first and the remaining ciphers transform
                    that Base64 string.
                  </>
                }
              />

              <TestCase
                num={4}
                title="UTF-8 survives the XOR → Base64 chain"
                goal="Check that non-ASCII characters (accents, emoji, other scripts) round-trip correctly."
                steps={[
                  <>Clear the pipeline.</>,
                  <>Add <Code>XOR Cipher</Code>, then <Code>Base64</Code>, then <Code>Reverse</Code>.</>,
                  <>Set the XOR key to <Code>secret</Code>.</>,
                  <>In Plaintext, paste: <Code>café — 日本語 — 123!</Code>.</>,
                  <>Click <strong>Run</strong>, switch to <strong>Decrypt</strong>, click <strong>Run</strong> again.</>,
                ]}
                expected={
                  <>
                    The exact original text returns, including accents and
                    non-ASCII characters. Badge turns green.
                  </>
                }
              />

              <TestCase
                num={5}
                title="Mismatch detection"
                goal="Verify the app correctly flags a broken round-trip."
                steps={[
                  <>Load the <Code>Classical</Code> preset.</>,
                  <>Click <strong>Run</strong> to encrypt.</>,
                  <>Switch to <strong>Decrypt</strong>.</>,
                  <>Edit the Ciphertext — change any one letter.</>,
                  <>Click <strong>Run</strong>.</>,
                ]}
                expected={
                  <>
                    The Plaintext that comes out does not match the original.
                    The badge shows a red{" "}
                    <span className="text-rose-300">
                      <XCircle size={12} strokeWidth={1.75} className="inline" /> Mismatch
                    </span>
                    .
                  </>
                }
              />

              <TestCase
                num={6}
                title="Export / import round-trip"
                goal="Save a pipeline, clear everything, then load it back exactly as it was."
                steps={[
                  <>Load the <Code>Mixed</Code> preset.</>,
                  <>Click <strong>Export JSON</strong>. A file downloads.</>,
                  <>Click <strong>Clear pipeline</strong>. The Pipeline empties; Run is now disabled.</>,
                  <>Click <strong>Import JSON</strong> and pick the file you just downloaded.</>,
                ]}
                expected={
                  <>
                    All three original nodes (
                    <Code>Base64</Code>, <Code>XOR</Code>, <Code>Caesar</Code>)
                    reappear in the original order and{" "}
                    <Code>cascade encryption</Code> returns to the Plaintext
                    box. A success toast confirms the load.
                  </>
                }
              />

              <TestCase
                num={7}
                title="Mobile layout check"
                goal="Make sure the app is usable on a phone-sized screen."
                steps={[
                  <>Open the app on a mobile browser, or resize your desktop window to ~375px wide.</>,
                  <>Confirm the Library, Pipeline, and Input/Output panels stack vertically.</>,
                  <>Load any preset and click Run.</>,
                ]}
                expected={
                  <>
                    Every control is reachable without horizontal scrolling.
                    Encrypt/Decrypt are icon-only at narrow widths; cipher and
                    preset buttons wrap into rows; the Ciphertext box scrolls
                    internally if the output is long.
                  </>
                }
              />
            </Section>

            {/* 12. Walkthrough */}
            <Section
              id="walkthrough"
              icon={<CheckCircle2 size={18} strokeWidth={1.75} />}
              title="12. Full walkthrough — prove every feature in 2 minutes"
            >
              <p>
                If you want one quick demo that exercises essentially every
                feature, follow this list:
              </p>
              <ol className="flex flex-col gap-2.5">
                <Step n={1}>Open the app.</Step>
                <Step n={2}>
                  Click the <Code>Classical</Code> preset.
                </Step>
                <Step n={3}>
                  Confirm the Pipeline shows <strong>Caesar → Vigenère → Reverse</strong> and the Plaintext reads <Code>attack at dawn</Code>.
                </Step>
                <Step n={4}>
                  Press <Kbd>Ctrl</Kbd> + <Kbd>Enter</Kbd> to Run. Watch each node fill in its <Code>in:</Code> / <Code>out:</Code>.
                </Step>
                <Step n={5}>
                  Drag the <Code>Vigenère</Code> node above <Code>Caesar</Code>. Run again — the ciphertext is now different. This proves order matters.
                </Step>
                <Step n={6}>
                  Press <Kbd>Ctrl</Kbd> + <Kbd>K</Kbd> to switch to Decrypt, then <Kbd>Ctrl</Kbd> + <Kbd>Enter</Kbd> to Run.
                </Step>
                <Step n={7}>
                  Confirm <Code>attack at dawn</Code> is back and the green verification badge shows.
                </Step>
                <Step n={8}>
                  Click <strong>Export JSON</strong>. A file downloads.
                </Step>
                <Step n={9}>
                  Click <strong>Clear pipeline</strong>. Everything empties.
                </Step>
                <Step n={10}>
                  Click <strong>Import JSON</strong>, pick the file you just exported, and confirm the pipeline restores exactly.
                </Step>
                <Step n={11}>
                  Refresh the browser tab. Confirm the pipeline is still there (it was saved to local storage).
                </Step>
              </ol>
              <Callout kind="tip">
                If all 11 steps pass, every feature works.
              </Callout>
            </Section>

            {/* 13. FAQ */}
            <Section
              id="faq"
              icon={<HelpCircle size={18} strokeWidth={1.75} />}
              title="13. FAQ"
            >
              <Faq q="Is this real encryption?">
                No. These are classic ciphers useful for learning, puzzles, and
                visualization. They are not secure against modern cryptanalysis
                — do not use them for real secrets.
              </Faq>
              <Faq q="Why does the ciphertext look like hex (long string of 0–9 a–f)?">
                That&rsquo;s XOR output. XOR works on raw bytes which may not
                be printable, so we serialize the result to lowercase hex.
                Everything downstream in the chain just treats it as a string.
              </Faq>
              <Faq q="Why is Run greyed out?">
                Run requires three things: <strong>at least 3 nodes</strong>,
                every config <strong>valid</strong>, and <strong>non-empty
                input</strong> in the active box (Plaintext in Encrypt mode,
                Ciphertext in Decrypt mode).
              </Faq>
              <Faq q="I closed the tab — will my pipeline come back?">
                Yes, if you reopen the same browser. The pipeline, mode, and
                plaintext are saved to your browser&rsquo;s local storage.
                They will not appear in a different browser or in private /
                incognito mode.
              </Faq>
              <Faq q="My Vigenère keyword input ignores numbers and symbols.">
                That&rsquo;s intentional. Vigenère only uses letters; non-letter
                characters in the keyword are filtered out as you type.
              </Faq>
              <Faq q="The round-trip badge is red (mismatch). What now?">
                Something changed between encrypt and decrypt — usually the
                ciphertext was edited, a node was removed, the order changed,
                or a config value was altered. Rebuild the exact same pipeline
                and try again.
              </Faq>
              <Faq q="Can I add more cipher types?">
                Yes — the cipher engine is a registry. Drop a new file in{" "}
                <Code>lib/ciphers/</Code> that exports a <Code>CipherDef</Code>
                {" "}and add it to the registry in <Code>lib/ciphers/index.ts</Code>.
                No other file needs to change.
              </Faq>
            </Section>

            {/* 14. Troubleshooting */}
            <Section
              id="troubleshooting"
              icon={<LifeBuoy size={18} strokeWidth={1.75} />}
              title="14. Troubleshooting"
            >
              <div className="flex flex-col gap-3">
                <div className="rounded-lg border border-rose-500/30 bg-rose-500/5 p-4">
                  <div className="text-sm font-semibold text-rose-300">
                    Red banner: &ldquo;XOR decrypt produced invalid UTF-8&rdquo;
                  </div>
                  <p className="mt-1 text-xs text-neutral-300 sm:text-sm">
                    Either the key is wrong or the input isn&rsquo;t an XOR
                    ciphertext produced by this app. Double-check the key and
                    make sure you&rsquo;re decrypting the output of a matching
                    encrypt.
                  </p>
                </div>
                <div className="rounded-lg border border-rose-500/30 bg-rose-500/5 p-4">
                  <div className="text-sm font-semibold text-rose-300">
                    Red banner: &ldquo;Input is not valid Base64&rdquo;
                  </div>
                  <p className="mt-1 text-xs text-neutral-300 sm:text-sm">
                    Make sure the ciphertext you pasted is a real Base64
                    string. Missing padding characters (<Code>=</Code>) or
                    stray quotes can cause this.
                  </p>
                </div>
                <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4">
                  <div className="text-sm font-semibold text-amber-300">
                    A node card has a red border
                  </div>
                  <p className="mt-1 text-xs text-neutral-300 sm:text-sm">
                    Its configuration is invalid (for example, an empty
                    Vigenère keyword). Fix the value and Run will re-enable.
                  </p>
                </div>
                <div className="rounded-lg border border-neutral-700 bg-neutral-900/60 p-4">
                  <div className="text-sm font-semibold text-neutral-100">
                    Nothing happens when I click Export
                  </div>
                  <p className="mt-1 text-xs text-neutral-300 sm:text-sm">
                    Your pipeline is empty — there&rsquo;s nothing to save. Add
                    or load some nodes first.
                  </p>
                </div>
                <div className="rounded-lg border border-neutral-700 bg-neutral-900/60 p-4">
                  <div className="text-sm font-semibold text-neutral-100">
                    I&rsquo;m on mobile and can&rsquo;t drag nodes
                  </div>
                  <p className="mt-1 text-xs text-neutral-300 sm:text-sm">
                    Touch-drag works best on tablet or larger. On very small
                    screens, remove and re-add nodes in the order you want, or
                    use a larger display.
                  </p>
                </div>
              </div>
            </Section>

            <div className="mt-4 flex flex-col items-start gap-3 rounded-lg border border-neutral-800 bg-neutral-900/50 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-sm font-semibold text-neutral-100">
                  Ready to build?
                </div>
                <p className="mt-1 text-xs text-neutral-400 sm:text-sm">
                  Head back to the app and try your own cascade.
                </p>
              </div>
              <Link
                href="/"
                className="flex items-center gap-1.5 rounded-md border border-emerald-500/40 bg-emerald-500/10 px-3 py-1.5 text-sm font-medium text-emerald-300 transition-colors duration-150 hover:cursor-pointer hover:bg-emerald-500/20"
              >
                <ArrowLeft size={14} strokeWidth={1.75} />
                Back to the app
              </Link>
            </div>
          </article>
        </main>
      </div>
    </div>
  );
}
