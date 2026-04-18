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
    <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center justify-between gap-2 border-b border-neutral-800 bg-neutral-950/90 px-3 backdrop-blur sm:h-16 sm:gap-3 sm:px-4">
      <div className="flex min-w-0 items-center gap-2">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-neutral-800 bg-neutral-900">
          <Layers size={18} strokeWidth={1.75} className="text-emerald-400" />
        </div>
        <div className="flex min-w-0 items-baseline gap-2">
          <span className="truncate text-base font-semibold tracking-tight sm:text-xl">
            CipherStack
          </span>
          <span className="hidden text-xs text-neutral-500 md:inline">
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
          aria-label="Encrypt mode"
          onClick={() => setMode("encrypt")}
          className={cx(
            "flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-medium transition-colors duration-200 hover:cursor-pointer sm:px-3",
            mode === "encrypt"
              ? "bg-emerald-500/15 text-emerald-300"
              : "text-neutral-400 hover:text-neutral-200",
          )}
        >
          <Lock size={14} strokeWidth={1.75} />
          <span className="hidden sm:inline">Encrypt</span>
        </button>
        <button
          role="tab"
          aria-selected={mode === "decrypt"}
          aria-label="Decrypt mode"
          onClick={() => setMode("decrypt")}
          className={cx(
            "flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-medium transition-colors duration-200 hover:cursor-pointer sm:px-3",
            mode === "decrypt"
              ? "bg-amber-500/15 text-amber-300"
              : "text-neutral-400 hover:text-neutral-200",
          )}
        >
          <Unlock size={14} strokeWidth={1.75} />
          <span className="hidden sm:inline">Decrypt</span>
        </button>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <span className="hidden text-xs text-neutral-500 xl:inline">
          {shortcutKey()}+K to toggle · {shortcutKey()}+↵ to run
        </span>
        <button
          onClick={() => run()}
          disabled={!canRun}
          title={runTitle}
          aria-label="Run pipeline"
          className={cx(
            "flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-sm font-medium transition-colors duration-200 sm:gap-2 sm:px-3.5",
            canRun
              ? mode === "encrypt"
                ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 hover:cursor-pointer"
                : "border-amber-500/40 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 hover:cursor-pointer"
              : "cursor-not-allowed border-neutral-800 bg-neutral-900 text-neutral-600 hover:cursor-not-allowed",
          )}
        >
          <Play size={16} strokeWidth={1.75} />
          <span>{runStatus === "running" ? "Running…" : "Run"}</span>
        </button>
      </div>
    </header>
  );
}
