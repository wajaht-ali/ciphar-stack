"use client";

import { motion } from "framer-motion";
import { GripVertical, X, AlertTriangle } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { CSSProperties } from "react";
import type { PipelineNode, Mode } from "@/types";
import { CIPHER_DEFS } from "@/lib/ciphers";
import { usePipelineStore } from "@/store/pipeline-store";
import { cx, truncate } from "@/lib/utils";
import { CaesarConfigView } from "./nodes/CaesarConfig";
import { VigenereConfigView } from "./nodes/VigenereConfig";
import { XORConfigView } from "./nodes/XORConfig";
import { ReverseConfigView } from "./nodes/ReverseConfig";
import { Base64ConfigView } from "./nodes/Base64Config";

function renderConfig(node: PipelineNode) {
  switch (node.cipherId) {
    case "caesar":
      return (
        <CaesarConfigView nodeId={node.id} config={node.config as { shift: number }} />
      );
    case "vigenere":
      return (
        <VigenereConfigView
          nodeId={node.id}
          config={node.config as { keyword: string }}
        />
      );
    case "xor":
      return <XORConfigView nodeId={node.id} config={node.config as { key: string }} />;
    case "reverse":
      return <ReverseConfigView />;
    case "base64":
      return <Base64ConfigView />;
    default:
      return null;
  }
}

export function NodeCard({
  node,
  index,
  mode,
  isActive,
  lastRunAt,
}: {
  node: PipelineNode;
  index: number;
  mode: Mode;
  isActive: boolean;
  lastRunAt: number | null;
}) {
  const removeNode = usePipelineStore((s) => s.removeNode);
  const def = CIPHER_DEFS[node.cipherId];

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: node.id });

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 20 : undefined,
  };

  const hasTrace = node.lastIn !== undefined && node.lastOut !== undefined;
  const accentBorder =
    node.hasError
      ? "border-rose-500/50"
      : isActive
        ? mode === "encrypt"
          ? "border-emerald-500/50"
          : "border-amber-500/50"
        : "border-neutral-800 hover:border-neutral-700";

  const numberBg =
    mode === "encrypt"
      ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
      : "bg-amber-500/10 text-amber-300 border-amber-500/30";

  return (
    <motion.div
      ref={setNodeRef}
      layout
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0, marginTop: 0, marginBottom: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      style={style}
      className={cx(
        "group relative rounded-lg border bg-neutral-900 p-4 transition-colors duration-200",
        accentBorder,
        isDragging && "shadow-sm ring-1 ring-neutral-700",
      )}
    >
      <div className="flex items-start gap-3">
        <button
          {...attributes}
          {...listeners}
          aria-label="Drag to reorder"
          className="mt-0.5 cursor-grab touch-none text-neutral-600 transition-colors hover:text-neutral-300 active:cursor-grabbing"
        >
          <GripVertical size={16} strokeWidth={1.75} />
        </button>

        <div
          className={cx(
            "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-semibold",
            numberBg,
          )}
        >
          {index + 1}
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-base font-medium text-neutral-100">
                {def.label}
              </span>
              <span className="hidden text-[11px] text-neutral-500 lg:inline">
                {def.description}
              </span>
            </div>
            <button
              onClick={() => removeNode(node.id)}
              aria-label="Remove node"
              className="rounded-md p-1 text-neutral-500 transition-colors hover:bg-rose-500/10 hover:text-rose-400"
            >
              <X size={16} strokeWidth={1.75} />
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {renderConfig(node)}
          </div>

          {node.hasError && node.errorMsg && (
            <div className="flex items-center gap-2 rounded-md border border-rose-500/30 bg-rose-500/5 px-2 py-1.5 text-xs text-rose-300">
              <AlertTriangle size={12} strokeWidth={1.75} />
              {node.errorMsg}
            </div>
          )}

          {hasTrace && (
            <motion.div
              key={`${node.id}-${lastRunAt ?? "static"}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.18 }}
              className="flex flex-col gap-1 border-t border-neutral-800 pt-2 font-mono text-xs"
            >
              <TraceRow label="in"  value={node.lastIn!}  />
              <TraceRow label="out" value={node.lastOut!} />
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function TraceRow({ label, value }: { label: string; value: string }) {
  const display = truncate(value, 80);
  return (
    <div className="flex items-baseline gap-2">
      <span className="w-8 shrink-0 text-[10px] uppercase tracking-wide text-neutral-500">
        {label}
      </span>
      <span
        className="break-all text-neutral-300"
        title={value.length > 80 ? value : undefined}
      >
        {value.length === 0 ? (
          <span className="italic text-neutral-600">(empty)</span>
        ) : (
          display
        )}
      </span>
    </div>
  );
}
