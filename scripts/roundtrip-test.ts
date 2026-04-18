import { runPipeline } from "../lib/pipeline";
import { PRESETS } from "../lib/presets";
import { CIPHER_DEFS } from "../lib/ciphers";

let failed = 0;
for (const preset of PRESETS) {
  const nodes = preset.nodes.map((n, i) => ({
    id: "n" + i,
    cipherId: n.cipherId,
    config:
      n.config !== undefined
        ? n.config
        : CIPHER_DEFS[n.cipherId].defaultConfig,
  }));
  const enc = runPipeline(nodes, preset.plaintext, "encrypt");
  if (!enc.ok) {
    console.log("FAIL ENC", preset.id, enc.error);
    failed++;
    continue;
  }
  const dec = runPipeline(nodes, enc.finalOutput, "decrypt");
  if (!dec.ok) {
    console.log("FAIL DEC", preset.id, dec.error);
    failed++;
    continue;
  }
  const pass = dec.finalOutput === preset.plaintext;
  console.log(
    pass ? "PASS" : "FAIL",
    preset.name,
    "=> ct:",
    JSON.stringify(enc.finalOutput).slice(0, 80),
  );
  if (!pass) {
    console.log("  expected:", preset.plaintext, "got:", dec.finalOutput);
    failed++;
  }
}

// extra: UTF-8 plaintext through Base64 + XOR + Caesar + Reverse + Vigenere
const stress = [
  { id: "a", cipherId: "base64" as const, config: {} },
  { id: "b", cipherId: "xor" as const, config: { key: "secret" } },
  { id: "c", cipherId: "caesar" as const, config: { shift: 11 } },
  { id: "d", cipherId: "reverse" as const, config: {} },
  { id: "e", cipherId: "vigenere" as const, config: { keyword: "hackathon" } },
];
const stressInput = "café — 日本語 — mixed ASCII 123!";
const e2 = runPipeline(stress, stressInput, "encrypt");
const d2 = runPipeline(stress, e2.finalOutput, "decrypt");
console.log(
  d2.finalOutput === stressInput ? "PASS" : "FAIL",
  "stress (utf-8 5-layer)",
);
if (d2.finalOutput !== stressInput) {
  console.log("  expected:", stressInput);
  console.log("  got:     ", d2.finalOutput);
  failed++;
}

process.exit(failed ? 1 : 0);
