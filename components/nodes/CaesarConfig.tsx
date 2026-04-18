"use client";

import { usePipelineStore } from "@/store/pipeline-store";
import { clamp } from "@/lib/utils";
import type { CaesarConfig } from "@/lib/ciphers/caesar";

export function CaesarConfigView({
  nodeId,
  config,
}: {
  nodeId: string;
  config: CaesarConfig;
}) {
  const updateConfig = usePipelineStore((s) => s.updateConfig);

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value;
    if (raw === "" || raw === "-") {
      updateConfig(nodeId, { shift: 0 });
      return;
    }
    const parsed = parseInt(raw, 10);
    if (Number.isNaN(parsed)) return;
    updateConfig(nodeId, { shift: clamp(parsed, -25, 25) });
  }

  return (
    <div className="flex items-center gap-2">
      <label className="text-xs text-neutral-500">Shift</label>
      <input
        type="number"
        min={-25}
        max={25}
        step={1}
        value={config.shift}
        onChange={onChange}
        className="w-20 rounded-md border border-neutral-800 bg-neutral-850 px-2 py-1 text-sm text-neutral-100 outline-none transition-colors duration-150 focus:border-emerald-500/40"
      />
      <span className="text-xs text-neutral-600">-25 to 25</span>
    </div>
  );
}
