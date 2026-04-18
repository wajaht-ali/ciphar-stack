"use client";

import { Fragment, useEffect, useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { AnimatePresence } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { usePipelineStore } from "@/store/pipeline-store";
import { NodeCard } from "./NodeCard";
import { ConnectorArrow } from "./ConnectorArrow";
import { EmptyPipeline } from "./EmptyPipeline";

export function PipelinePanel() {
  const nodes = usePipelineStore((s) => s.nodes);
  const mode = usePipelineStore((s) => s.mode);
  const reorderNodes = usePipelineStore((s) => s.reorderNodes);
  const activeNodeId = usePipelineStore((s) => s.activeNodeId);
  const lastRunAt = usePipelineStore((s) => s.lastRunAt);
  const runError = usePipelineStore((s) => s.runError);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const from = nodes.findIndex((n) => n.id === active.id);
    const to = nodes.findIndex((n) => n.id === over.id);
    if (from === -1 || to === -1) return;
    reorderNodes(from, to);
  }

  if (!mounted) {
    return (
      <main className="flex flex-1 flex-col bg-neutral-950 p-4 sm:p-6 lg:overflow-y-auto">
        <div className="mx-auto w-full max-w-2xl" />
      </main>
    );
  }

  return (
    <main className="flex flex-1 flex-col overflow-y-auto bg-neutral-950 p-6">
      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col">
        {runError && (
          <div className="mb-4 flex items-center gap-2 rounded-md border border-rose-500/40 bg-rose-500/5 px-3 py-2 text-sm text-rose-300">
            <AlertTriangle size={14} strokeWidth={1.75} />
            <span>{runError}</span>
          </div>
        )}

        {nodes.length === 0 ? (
          <EmptyPipeline />
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={nodes.map((n) => n.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="flex flex-col">
                <AnimatePresence initial={false}>
                  {nodes.map((node, index) => (
                    <Fragment key={node.id}>
                      <NodeCard
                        node={node}
                        index={index}
                        mode={mode}
                        isActive={activeNodeId === node.id}
                        lastRunAt={lastRunAt}
                      />
                      {index < nodes.length - 1 && (
                        <ConnectorArrow mode={mode} />
                      )}
                    </Fragment>
                  ))}
                </AnimatePresence>
              </div>
            </SortableContext>
          </DndContext>
        )}

        {nodes.length > 0 && nodes.length < 3 && (
          <div className="mt-4 rounded-md border border-dashed border-neutral-800 bg-neutral-900/30 px-3 py-2 text-center text-xs text-neutral-500">
            Add {3 - nodes.length} more{" "}
            {3 - nodes.length === 1 ? "node" : "nodes"} to enable Run.
          </div>
        )}
      </div>
    </main>
  );
}
