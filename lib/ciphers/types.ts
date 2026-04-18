import type { CipherId } from "@/types";

export type ValidationResult = { ok: true } | { ok: false; error: string };

export type CipherDef<C = unknown> = {
  id: CipherId;
  label: string;
  description: string;
  configurable: boolean;
  defaultConfig: C;
  validateConfig: (config: C) => ValidationResult;
  encrypt: (input: string, config: C) => string;
  decrypt: (input: string, config: C) => string;
};
