"use client";

import { Play, Lock, Unlock, Layers } from "lucide-react";
import { usePipelineStore } from "@/store/pipeline-store";
import { cx } from "@/lib/utils";

function shortcutKey(): string {
  if (typeof navigator === "undefined") return "Ctrl";
  return /Mac/i.test(navigator.platform) ? "⌘" : "Ctrl";
}

export function Header() {
  const mode = usePipelineStore((s) => s.mode);
  const nodes = usePipelineStore((s) => s.nodes);
  const plaintext = usePipelineStore((s) => s.plaintext);
  const ciphertext = usePipelineStore((s) => s.ciphertext);
  const runStatus = usePipelineStore((s) => s.runStatus);
  const setMode = usePipelineStore((s) => s.setMode);
  const run = usePipelineStore((s) => s.run);

  const input = mode === "encrypt" ? plaintext : ciphertext;
  const hasMinNodes = nodes.length >= 3;
  const hasInput = input.trim().length > 0;
  const canRun = hasMinNodes && hasInput && runStatus !== "running";

  const runTitle = !hasMinNodes
    ? "Need 3+ nodes to run"
    : !hasInput
      ? mode === "encrypt"
        ? "Enter plaintext to run"
        : "Enter ciphertext to run"
      : `Run (${shortcutKey()}+Enter)`;

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-neutral-800 bg-neutral-950/90 px-4 backdrop-blur">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-md border border-neutral-800 bg-neutral-900">
          <Layers size={18} strokeWidth={1.75} className="text-emerald-400" />
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-semibold tracking-tight">CipherStack</span>
          <span className="hidden text-xs text-neutral-500 sm:inline">
            Cascade encryption builder
          </span>
        </div>
      </div>

      <div
        role="tablist"
        aria-label="Mode"
        className="flex items-center gap-1 rounded-lg border border-neutral-800 bg-neutral-900 p-1"
      >
        <button
          role="tab"
          aria-selected={mode === "encrypt"}
          onClick={() => setMode("encrypt")}
          className={cx(
            "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors duration-200",
            mode === "encrypt"
              ? "bg-emerald-500/15 text-emerald-300"
              : "text-neutral-400 hover:text-neutral-200",
          )}
        >
          <Lock size={14} strokeWidth={1.75} />
          Encrypt
        </button>
        <button
          role="tab"
          aria-selected={mode === "decrypt"}
          onClick={() => setMode("decrypt")}
          className={cx(
            "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors duration-200",
            mode === "decrypt"
              ? "bg-amber-500/15 text-amber-300"
              : "text-neutral-400 hover:text-neutral-200",
          )}
        >
          <Unlock size={14} strokeWidth={1.75} />
          Decrypt
        </button>
      </div>

      <div className="flex items-center gap-3">
        <span className="hidden text-xs text-neutral-500 sm:inline">
          {shortcutKey()}+K to toggle · {shortcutKey()}+↵ to run
        </span>
        <button
          onClick={() => run()}
          disabled={!canRun}
          title={runTitle}
          className={cx(
            "flex items-center gap-2 rounded-md border px-3.5 py-1.5 text-sm font-medium transition-colors duration-200",
            canRun
              ? mode === "encrypt"
                ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20"
                : "border-amber-500/40 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20"
              : "cursor-not-allowed border-neutral-800 bg-neutral-900 text-neutral-600",
          )}
        >
          <Play size={16} strokeWidth={1.75} />
          {runStatus === "running" ? "Running…" : "Run"}
        </button>
      </div>
    </header>
  );
}
