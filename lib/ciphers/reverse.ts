import type { CipherDef } from "./types";

export type ReverseConfig = Record<string, never>;

function reverseString(input: string): string {
  return [...input].reverse().join("");
}

const ReverseCipher: CipherDef<ReverseConfig> = {
  id: "reverse",
  label: "Reverse",
  description: "Reverses the string. Self-inverse.",
  configurable: false,
  defaultConfig: {},
  validateConfig() {
    return { ok: true };
  },
  encrypt(input) {
    return reverseString(input);
  },
  decrypt(input) {
    return reverseString(input);
  },
};

export default ReverseCipher;
