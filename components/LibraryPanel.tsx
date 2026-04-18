"use client";

import { useRef } from "react";
import { Plus, Sparkles, Download, Upload, Trash2 } from "lucide-react";
import { CIPHER_LIST } from "@/lib/ciphers";
import { PRESETS } from "@/lib/presets";
import { usePipelineStore } from "@/store/pipeline-store";
import { downloadText } from "@/lib/utils";
import { useToast } from "./Toast";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="px-1 text-xs font-medium uppercase tracking-wider text-neutral-500">
        {title}
      </div>
      <div className="flex flex-wrap gap-1.5 lg:flex-col">{children}</div>
    </div>
  );
}

export function LibraryPanel() {
  const addNode = usePipelineStore((s) => s.addNode);
  const loadPreset = usePipelineStore((s) => s.loadPreset);
  const clear = usePipelineStore((s) => s.clear);
  const exportPipeline = usePipelineStore((s) => s.exportPipeline);
  const importPipeline = usePipelineStore((s) => s.importPipeline);
  const nodesCount = usePipelineStore((s) => s.nodes.length);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const toast = useToast();

  function handleExport() {
    if (nodesCount === 0) {
      toast.show("Nothing to export — pipeline is empty.", "info");
      return;
    }
    const json = exportPipeline();
    const ts = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
    downloadText(`cipherstack-pipeline-${ts}.json`, json);
    toast.show("Exported pipeline.", "success");
  }

  function handleImportClick() {
    fileRef.current?.click();
  }

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    try {
      const text = await file.text();
      const res = importPipeline(text);
      if (res.ok) {
        toast.show("Pipeline loaded.", "success");
      } else {
        toast.show(res.error ?? "Import failed.", "error");
      }
    } catch {
      toast.show("Couldn't read file.", "error");
    }
  }

  return (
    <aside className="flex w-full shrink-0 flex-col gap-4 border-b border-neutral-800 bg-neutral-950 p-4 lg:w-[240px] lg:gap-5 lg:overflow-y-auto lg:border-b-0 lg:border-r">
      <Section title="Ciphers">
        {CIPHER_LIST.map((def) => (
          <button
            key={def.id}
            onClick={() => addNode(def.id)}
            title={def.description}
            className="group flex items-center justify-between gap-2 rounded-md border border-neutral-800 bg-neutral-900 px-3 py-2 text-left text-sm text-neutral-200 transition-colors duration-150 hover:cursor-pointer hover:border-neutral-700 hover:bg-neutral-850 lg:w-full"
          >
            <span>{def.label}</span>
            <Plus
              size={14}
              strokeWidth={1.75}
              className="text-neutral-600 group-hover:text-emerald-400"
            />
          </button>
        ))}
      </Section>

      <Section title="Presets">
        {PRESETS.map((p) => (
          <button
            key={p.id}
            onClick={() => loadPreset(p.id)}
            title={p.description}
            className="group flex items-center justify-between gap-2 rounded-md border border-neutral-800 bg-neutral-900 px-3 py-2 text-left text-sm text-neutral-200 transition-colors duration-150 hover:cursor-pointer hover:border-neutral-700 hover:bg-neutral-850 lg:w-full"
          >
            <span className="flex flex-col">
              <span>{p.name}</span>
              <span className="hidden text-[11px] text-neutral-500 lg:inline">
                {p.description}
              </span>
            </span>
            <Sparkles
              size={14}
              strokeWidth={1.75}
              className="text-neutral-600 group-hover:text-emerald-400"
            />
          </button>
        ))}
      </Section>

      <Section title="Tools">
        <button
          onClick={handleExport}
          className="flex items-center gap-2 rounded-md border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-neutral-200 transition-colors duration-150 hover:cursor-pointer hover:border-neutral-700 hover:bg-neutral-850 lg:w-full"
        >
          <Download size={14} strokeWidth={1.75} />
          <span>Export</span>
          <span className="hidden sm:inline">JSON</span>
        </button>
        <button
          onClick={handleImportClick}
          className="flex items-center gap-2 rounded-md border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-neutral-200 transition-colors duration-150 hover:cursor-pointer hover:border-neutral-700 hover:bg-neutral-850 lg:w-full"
        >
          <Upload size={14} strokeWidth={1.75} />
          <span>Import</span>
          <span className="hidden sm:inline">JSON</span>
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="application/json,.json"
          onChange={handleFile}
          className="hidden"
        />
        <button
          onClick={() => clear()}
          className="flex items-center gap-2 rounded-md border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-neutral-400 transition-colors duration-150 hover:cursor-pointer hover:border-rose-500/40 hover:text-rose-300 lg:w-full"
        >
          <Trash2 size={14} strokeWidth={1.75} />
          <span className="sm:hidden">Clear</span>
          <span className="hidden sm:inline">Clear pipeline</span>
        </button>
      </Section>
    </aside>
  );
}
