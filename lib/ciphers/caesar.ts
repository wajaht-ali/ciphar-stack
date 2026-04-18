import type { CipherDef, ValidationResult } from "./types";

export type CaesarConfig = { shift: number };

const UPPER_A = "A".charCodeAt(0);
const LOWER_A = "a".charCodeAt(0);

function shiftChar(ch: string, shift: number): string {
  const code = ch.charCodeAt(0);
  if (code >= UPPER_A && code <= UPPER_A + 25) {
    return String.fromCharCode(UPPER_A + ((((code - UPPER_A + shift) % 26) + 26) % 26));
  }
  if (code >= LOWER_A && code <= LOWER_A + 25) {
    return String.fromCharCode(LOWER_A + ((((code - LOWER_A + shift) % 26) + 26) % 26));
  }
  return ch;
}

function apply(input: string, shift: number): string {
  let out = "";
  for (let i = 0; i < input.length; i++) {
    out += shiftChar(input[i], shift);
  }
  return out;
}

const CaesarCipher: CipherDef<CaesarConfig> = {
  id: "caesar",
  label: "Caesar Cipher",
  description: "Shifts each letter by a fixed amount.",
  configurable: true,
  defaultConfig: { shift: 3 },
  validateConfig(config): ValidationResult {
    if (!Number.isInteger(config.shift)) {
      return { ok: false, error: "Shift must be an integer." };
    }
    if (config.shift < -25 || config.shift > 25) {
      return { ok: false, error: "Shift must be between -25 and 25." };
    }
    return { ok: true };
  },
  encrypt(input, config) {
    return apply(input, config.shift);
  },
  decrypt(input, config) {
    return apply(input, -config.shift);
  },
};

export default CaesarCipher;
