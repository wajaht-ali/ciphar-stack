import type { Preset } from "@/types";

export const PRESETS: Preset[] = [
  {
    id: "simple",
    name: "Simple",
    description: "Caesar → Reverse → Base64",
    plaintext: "hello world",
    nodes: [
      { cipherId: "caesar", config: { shift: 3 } },
      { cipherId: "reverse", config: {} },
      { cipherId: "base64", config: {} },
    ],
  },
  {
    id: "classical",
    name: "Classical",
    description: "Caesar → Vigenère → Reverse",
    plaintext: "attack at dawn",
    nodes: [
      { cipherId: "caesar", config: { shift: 7 } },
      { cipherId: "vigenere", config: { keyword: "secret" } },
      { cipherId: "reverse", config: {} },
    ],
  },
  {
    id: "mixed",
    name: "Mixed",
    description: "Base64 → XOR → Caesar",
    plaintext: "cascade encryption",
    nodes: [
      { cipherId: "base64", config: {} },
      { cipherId: "xor", config: { key: "k3y" } },
      { cipherId: "caesar", config: { shift: 5 } },
    ],
  },
];
