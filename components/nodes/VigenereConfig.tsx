"use client";

import { usePipelineStore } from "@/store/pipeline-store";
import type { VigenereConfig } from "@/lib/ciphers/vigenere";
import { cx } from "@/lib/utils";

export function VigenereConfigView({
  nodeId,
  config,
}: {
  nodeId: string;
  config: VigenereConfig;
}) {
  const updateConfig = usePipelineStore((s) => s.updateConfig);

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const cleaned = e.target.value.replace(/[^A-Za-z]/g, "");
    updateConfig(nodeId, { keyword: cleaned });
  }

  const invalid = !config.keyword || config.keyword.length === 0;

  return (
    <div className="flex items-center gap-2">
      <label className="text-xs text-neutral-500">Keyword</label>
      <input
        type="text"
        value={config.keyword}
        onChange={onChange}
        placeholder="letters only"
        className={cx(
          "w-40 rounded-md border bg-neutral-850 px-2 py-1 font-mono text-sm text-neutral-100 outline-none transition-colors duration-150",
          invalid
            ? "border-rose-500/50 focus:border-rose-400"
            : "border-neutral-800 focus:border-emerald-500/40",
        )}
      />
    </div>
  );
}
