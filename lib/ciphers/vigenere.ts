import type { CipherDef, ValidationResult } from "./types";

export type VigenereConfig = { keyword: string };

const UPPER_A = "A".charCodeAt(0);
const LOWER_A = "a".charCodeAt(0);

function normalizeKeyword(keyword: string): number[] {
  const shifts: number[] = [];
  for (let i = 0; i < keyword.length; i++) {
    const ch = keyword[i];
    const code = ch.charCodeAt(0);
    if (code >= UPPER_A && code <= UPPER_A + 25) {
      shifts.push(code - UPPER_A);
    } else if (code >= LOWER_A && code <= LOWER_A + 25) {
      shifts.push(code - LOWER_A);
    }
  }
  return shifts;
}

function apply(input: string, shifts: number[], sign: 1 | -1): string {
  if (shifts.length === 0) return input;
  let out = "";
  let keyIdx = 0;
  for (let i = 0; i < input.length; i++) {
    const ch = input[i];
    const code = ch.charCodeAt(0);
    const shift = sign * shifts[keyIdx % shifts.length];
    if (code >= UPPER_A && code <= UPPER_A + 25) {
      out += String.fromCharCode(
        UPPER_A + ((((code - UPPER_A + shift) % 26) + 26) % 26),
      );
      keyIdx++;
    } else if (code >= LOWER_A && code <= LOWER_A + 25) {
      out += String.fromCharCode(
        LOWER_A + ((((code - LOWER_A + shift) % 26) + 26) % 26),
      );
      keyIdx++;
    } else {
      out += ch;
    }
  }
  return out;
}

const VigenereCipher: CipherDef<VigenereConfig> = {
  id: "vigenere",
  label: "Vigenère Cipher",
  description: "Polyalphabetic shift driven by a keyword.",
  configurable: true,
  defaultConfig: { keyword: "key" },
  validateConfig(config): ValidationResult {
    if (typeof config.keyword !== "string" || config.keyword.trim() === "") {
      return { ok: false, error: "Keyword cannot be empty." };
    }
    if (normalizeKeyword(config.keyword).length === 0) {
      return { ok: false, error: "Keyword must contain at least one letter." };
    }
    return { ok: true };
  },
  encrypt(input, config) {
    return apply(input, normalizeKeyword(config.keyword), 1);
  },
  decrypt(input, config) {
    return apply(input, normalizeKeyword(config.keyword), -1);
  },
};

export default VigenereCipher;
