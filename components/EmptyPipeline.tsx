"use client";

import { Boxes } from "lucide-react";

export function EmptyPipeline() {
  return (
    <div className="flex flex-1 items-center justify-center p-8">
      <div className="flex max-w-md flex-col items-center gap-3 rounded-xl border border-dashed border-neutral-800 bg-neutral-900/30 px-8 py-10 text-center">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-800 bg-neutral-900 text-neutral-500">
          <Boxes size={20} strokeWidth={1.5} />
        </div>
        <p className="text-sm text-neutral-300">Your pipeline is empty.</p>
        <p className="text-xs text-neutral-500">
          Add at least 3 cipher nodes from the library on the left to build a
          cascade.
        </p>
        <p className="text-xs text-neutral-500">
          Tip: click a preset to get started instantly.
        </p>
      </div>
    </div>
  );
}
