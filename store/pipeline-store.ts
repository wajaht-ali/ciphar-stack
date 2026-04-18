"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CipherId, Mode, PipelineNode } from "@/types";
import { CIPHER_DEFS } from "@/lib/ciphers";
import { runPipeline } from "@/lib/pipeline";
import { PRESETS } from "@/lib/presets";
import { newId } from "@/lib/utils";

export type RunStatus = "idle" | "running" | "ok" | "error";

export type PipelineState = {
  mode: Mode;
  nodes: PipelineNode[];
  plaintext: string;
  ciphertext: string;
  lastRunVerified: boolean | null;
  originalForVerify: string | null;
  runStatus: RunStatus;
  runError: string | null;
  lastRunAt: number | null;
  activeNodeId: string | null;

  addNode: (cipherId: CipherId) => void;
  removeNode: (id: string) => void;
  reorderNodes: (fromIndex: number, toIndex: number) => void;
  updateConfig: (id: string, config: unknown) => void;
  setMode: (mode: Mode) => void;
  setPlaintext: (value: string) => void;
  setCiphertext: (value: string) => void;
  run: () => Promise<void>;
  clear: () => void;
  loadPreset: (presetId: string) => void;
  importPipeline: (json: string) => { ok: boolean; error?: string };
  exportPipeline: () => string;
};

function buildNode(cipherId: CipherId, config?: unknown): PipelineNode {
  const def = CIPHER_DEFS[cipherId];
  return {
    id: newId(),
    cipherId,
    config:
      config !== undefined
        ? config
        : structuredClone(def.defaultConfig as object) as unknown,
  };
}

function clearRunArtifacts(nodes: PipelineNode[]): PipelineNode[] {
  return nodes.map((n) => ({
    ...n,
    lastIn: undefined,
    lastOut: undefined,
    hasError: false,
    errorMsg: undefined,
  }));
}

export const usePipelineStore = create<PipelineState>()(
  persist(
    (set, get) => ({
      mode: "encrypt",
      nodes: [],
      plaintext: "",
      ciphertext: "",
      lastRunVerified: null,
      originalForVerify: null,
      runStatus: "idle",
      runError: null,
      lastRunAt: null,
      activeNodeId: null,

      addNode: (cipherId) =>
        set((s) => ({
          nodes: [...clearRunArtifacts(s.nodes), buildNode(cipherId)],
          runStatus: "idle",
          runError: null,
          lastRunVerified: null,
        })),

      removeNode: (id) =>
        set((s) => ({
          nodes: clearRunArtifacts(s.nodes.filter((n) => n.id !== id)),
          runStatus: "idle",
          runError: null,
          lastRunVerified: null,
        })),

      reorderNodes: (fromIndex, toIndex) =>
        set((s) => {
          if (
            fromIndex < 0 ||
            toIndex < 0 ||
            fromIndex >= s.nodes.length ||
            toIndex >= s.nodes.length ||
            fromIndex === toIndex
          ) {
            return {};
          }
          const copy = clearRunArtifacts(s.nodes);
          const [moved] = copy.splice(fromIndex, 1);
          copy.splice(toIndex, 0, moved);
          return {
            nodes: copy,
            runStatus: "idle",
            runError: null,
            lastRunVerified: null,
          };
        }),

      updateConfig: (id, config) =>
        set((s) => ({
          nodes: s.nodes.map((n) =>
            n.id === id
              ? { ...n, config, hasError: false, errorMsg: undefined }
              : n,
          ),
          runStatus: "idle",
          runError: null,
          lastRunVerified: null,
        })),

      setMode: (mode) =>
        set({
          mode,
          runStatus: "idle",
          runError: null,
        }),

      setPlaintext: (value) =>
        set({
          plaintext: value,
          lastRunVerified: null,
          originalForVerify: null,
        }),

      setCiphertext: (value) =>
        set({
          ciphertext: value,
          lastRunVerified: null,
        }),

      run: async () => {
        const state = get();
        const { mode, nodes } = state;
        if (nodes.length < 3) return;

        const input = mode === "encrypt" ? state.plaintext : state.ciphertext;
        if (!input) return;

        // validate every config up front
        for (const node of nodes) {
          const def = CIPHER_DEFS[node.cipherId];
          const v = def.validateConfig(node.config);
          if (!v.ok) {
            set({
              runStatus: "error",
              runError: `${def.label}: ${v.error}`,
              nodes: state.nodes.map((n) =>
                n.id === node.id
                  ? { ...n, hasError: true, errorMsg: v.error }
                  : n,
              ),
            });
            return;
          }
        }

        const result = runPipeline(nodes, input, mode);
        const runId = Date.now();

        if (!result.ok) {
          set({
            runStatus: "error",
            runError: result.error?.message ?? "Pipeline failed.",
            lastRunAt: runId,
            nodes: state.nodes.map((n) =>
              n.id === result.error?.nodeId
                ? {
                    ...n,
                    hasError: true,
                    errorMsg: result.error.message,
                  }
                : n,
            ),
          });
          return;
        }

        // clear existing trace + mark running
        set({
          runStatus: "running",
          runError: null,
          nodes: clearRunArtifacts(state.nodes),
          activeNodeId: null,
        });

        // stagger trace application
        const prefersReducedMotion =
          typeof window !== "undefined" &&
          window.matchMedia &&
          window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const step = prefersReducedMotion ? 0 : 120;

        await new Promise<void>((resolve) => {
          const apply = (i: number) => {
            if (i >= result.trace.length) {
              resolve();
              return;
            }
            const entry = result.trace[i];
            set((s) => ({
              activeNodeId: entry.nodeId,
              nodes: s.nodes.map((n) =>
                n.id === entry.nodeId
                  ? { ...n, lastIn: entry.in, lastOut: entry.out }
                  : n,
              ),
            }));
            if (step === 0) {
              apply(i + 1);
            } else {
              window.setTimeout(() => apply(i + 1), step);
            }
          };
          apply(0);
        });

        if (mode === "encrypt") {
          set({
            ciphertext: result.finalOutput,
            originalForVerify: input,
            lastRunVerified: null,
            runStatus: "ok",
            lastRunAt: runId,
            activeNodeId: null,
          });
        } else {
          const original = state.originalForVerify;
          const verified =
            original !== null && original !== undefined
              ? result.finalOutput === original
              : null;
          set({
            plaintext: result.finalOutput,
            lastRunVerified: verified,
            runStatus: "ok",
            lastRunAt: runId,
            activeNodeId: null,
          });
        }
      },

      clear: () =>
        set({
          nodes: [],
          plaintext: "",
          ciphertext: "",
          lastRunVerified: null,
          originalForVerify: null,
          runStatus: "idle",
          runError: null,
          activeNodeId: null,
        }),

      loadPreset: (presetId) => {
        const preset = PRESETS.find((p) => p.id === presetId);
        if (!preset) return;
        set({
          nodes: preset.nodes.map((n) => buildNode(n.cipherId, n.config)),
          plaintext: preset.plaintext,
          ciphertext: "",
          mode: "encrypt",
          lastRunVerified: null,
          originalForVerify: null,
          runStatus: "idle",
          runError: null,
          activeNodeId: null,
        });
      },

      importPipeline: (json) => {
        try {
          const data = JSON.parse(json);
          if (!data || !Array.isArray(data.nodes)) {
            return { ok: false, error: "Invalid pipeline file." };
          }
          const nodes: PipelineNode[] = [];
          for (const raw of data.nodes) {
            if (!raw || typeof raw.cipherId !== "string") {
              return { ok: false, error: "Node missing cipherId." };
            }
            if (!(raw.cipherId in CIPHER_DEFS)) {
              return {
                ok: false,
                error: `Unknown cipher: ${raw.cipherId}`,
              };
            }
            nodes.push(
              buildNode(
                raw.cipherId as CipherId,
                raw.config ?? CIPHER_DEFS[raw.cipherId as CipherId].defaultConfig,
              ),
            );
          }
          set({
            nodes,
            plaintext:
              typeof data.plaintext === "string" ? data.plaintext : "",
            ciphertext: "",
            mode: "encrypt",
            lastRunVerified: null,
            originalForVerify: null,
            runStatus: "idle",
            runError: null,
            activeNodeId: null,
          });
          return { ok: true };
        } catch (err) {
          const msg = err instanceof Error ? err.message : "Bad JSON.";
          return { ok: false, error: msg };
        }
      },

      exportPipeline: () => {
        const s = get();
        const payload = {
          version: 1,
          createdAt: new Date().toISOString(),
          plaintext: s.plaintext,
          nodes: s.nodes.map((n) => ({
            cipherId: n.cipherId,
            config: n.config,
          })),
        };
        return JSON.stringify(payload, null, 2);
      },
    }),
    {
      name: "cipherstack-v1",
      skipHydration: true,
      partialize: (state) => ({
        mode: state.mode,
        nodes: state.nodes.map((n) => ({
          id: n.id,
          cipherId: n.cipherId,
          config: n.config,
        })),
        plaintext: state.plaintext,
      }),
    },
  ),
);
