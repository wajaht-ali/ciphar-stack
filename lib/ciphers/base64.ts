import type { CipherDef } from "./types";

export type Base64Config = Record<string, never>;

function b64Encode(input: string): string {
  const bytes = new TextEncoder().encode(input);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function b64Decode(input: string): string {
  const clean = input.replace(/\s+/g, "");
  const binary = atob(clean);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
}

const Base64Cipher: CipherDef<Base64Config> = {
  id: "base64",
  label: "Base64",
  description: "Standard Base64 encode / decode (UTF-8 safe).",
  configurable: false,
  defaultConfig: {},
  validateConfig() {
    return { ok: true };
  },
  encrypt(input) {
    return b64Encode(input);
  },
  decrypt(input) {
    try {
      return b64Decode(input);
    } catch {
      throw new Error("Input is not valid Base64.");
    }
  },
};

export default Base64Cipher;
