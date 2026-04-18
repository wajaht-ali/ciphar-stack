"use client";

import { usePipelineStore } from "@/store/pipeline-store";
import type { XORConfig } from "@/lib/ciphers/xor";
import { cx } from "@/lib/utils";

export function XORConfigView({
  nodeId,
  config,
}: {
  nodeId: string;
  config: XORConfig;
}) {
  const updateConfig = usePipelineStore((s) => s.updateConfig);
  const invalid = !config.key || config.key.length === 0;

  return (
    <div className="flex items-center gap-2">
      <label className="text-xs text-neutral-500">Key</label>
      <input
        type="text"
        value={config.key}
        onChange={(e) => updateConfig(nodeId, { key: e.target.value })}
        placeholder="any key"
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
