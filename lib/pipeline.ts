import type { Mode, PipelineNode } from "@/types";
import { CIPHER_DEFS } from "./ciphers";

export type TraceStep = { nodeId: string; in: string; out: string };

export type RunResult = {
  ok: boolean;
  finalOutput: string;
  trace: TraceStep[];
  error?: { nodeId: string; message: string };
};

export function runPipeline(
  nodes: PipelineNode[],
  input: string,
  mode: Mode,
): RunResult {
  const trace: TraceStep[] = [];
  if (nodes.length === 0) {
    return { ok: true, finalOutput: input, trace };
  }

  const order = mode === "encrypt" ? nodes : [...nodes].reverse();
  let current = input;

  for (const node of order) {
    const def = CIPHER_DEFS[node.cipherId];
    if (!def) {
      return {
        ok: false,
        finalOutput: current,
        trace,
        error: { nodeId: node.id, message: `Unknown cipher: ${node.cipherId}` },
      };
    }
    const validation = def.validateConfig(node.config);
    if (!validation.ok) {
      return {
        ok: false,
        finalOutput: current,
        trace,
        error: { nodeId: node.id, message: validation.error },
      };
    }
    try {
      const out =
        mode === "encrypt"
          ? def.encrypt(current, node.config)
          : def.decrypt(current, node.config);
      trace.push({ nodeId: node.id, in: current, out });
      current = out;
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      return {
        ok: false,
        finalOutput: current,
        trace,
        error: { nodeId: node.id, message },
      };
    }
  }

  // For decrypt: traversal was in reverse order, but we want the UI to show
  // trace entries keyed to nodes in their original top-to-bottom order.
  const displayTrace = mode === "encrypt" ? trace : [...trace].reverse();

  return { ok: true, finalOutput: current, trace: displayTrace };
}
