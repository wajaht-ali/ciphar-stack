import type { CipherDef, ValidationResult } from "./types";

export type XORConfig = { key: string };

function utf8Encode(input: string): Uint8Array {
  return new TextEncoder().encode(input);
}

function utf8Decode(bytes: Uint8Array): string {
  return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
}

function bytesToHex(bytes: Uint8Array): string {
  let hex = "";
  for (let i = 0; i < bytes.length; i++) {
    hex += bytes[i].toString(16).padStart(2, "0");
  }
  return hex;
}

function hexToBytes(hex: string): Uint8Array {
  const clean = hex.trim();
  if (clean.length % 2 !== 0 || !/^[0-9a-fA-F]*$/.test(clean)) {
    throw new Error("Input is not valid hex (XOR expects hex ciphertext).");
  }
  const out = new Uint8Array(clean.length / 2);
  for (let i = 0; i < out.length; i++) {
    out[i] = parseInt(clean.slice(i * 2, i * 2 + 2), 16);
  }
  return out;
}

function xorBytes(data: Uint8Array, key: Uint8Array): Uint8Array {
  const out = new Uint8Array(data.length);
  for (let i = 0; i < data.length; i++) {
    out[i] = data[i] ^ key[i % key.length];
  }
  return out;
}

const XORCipher: CipherDef<XORConfig> = {
  id: "xor",
  label: "XOR Cipher",
  description: "Bytewise XOR with a repeating key (hex ciphertext).",
  configurable: true,
  defaultConfig: { key: "key" },
  validateConfig(config): ValidationResult {
    if (typeof config.key !== "string" || config.key.length === 0) {
      return { ok: false, error: "Key cannot be empty." };
    }
    return { ok: true };
  },
  encrypt(input, config) {
    const keyBytes = utf8Encode(config.key);
    if (keyBytes.length === 0) throw new Error("XOR key is empty.");
    const inputBytes = utf8Encode(input);
    return bytesToHex(xorBytes(inputBytes, keyBytes));
  },
  decrypt(input, config) {
    const keyBytes = utf8Encode(config.key);
    if (keyBytes.length === 0) throw new Error("XOR key is empty.");
    const cipherBytes = hexToBytes(input);
    const plainBytes = xorBytes(cipherBytes, keyBytes);
    try {
      return utf8Decode(plainBytes);
    } catch {
      throw new Error(
        "XOR decrypt produced invalid UTF-8. Wrong key or input is not an XOR ciphertext.",
      );
    }
  },
};

export default XORCipher;
