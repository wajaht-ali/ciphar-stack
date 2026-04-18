# CipherStack

A browser-based **cascade encryption builder**. Chain cipher algorithms in
sequence, feed in plaintext, and watch each layer transform the data. Run
the pipeline in reverse to verify a clean round-trip back to the original.

Built for the **VYRO Hackathon 2026** (Frontend track).

## Tech stack

- **Next.js 16** (App Router, client-only page, Turbopack)
- **React 19** + **TypeScript 5**
- **Tailwind CSS 4** (zero config, inline `@theme` tokens)
- **Zustand 5** (+ `persist` middleware for localStorage survival)
- **@dnd-kit/core + sortable** (accessible drag-to-reorder)
- **framer-motion** (layout/enter/exit animations + reduced-motion aware)
- **lucide-react** (icons)

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## How it works

1. Pick ciphers from the **Library** on the left to add nodes to the pipeline.
2. Configure each node inline (shift, keyword, key — depending on cipher).
3. Drag the grip handle to reorder; click the × to remove.
4. Type in the **Plaintext** box on the right and hit **Run** (or ⌘/Ctrl+↵).
5. Toggle to **Decrypt** (⌘/Ctrl+K) and hit Run again — the pipeline runs in
   reverse with inverse operations, and a **Round-trip verified** badge
   appears in emerald if the recovered plaintext matches.

Every node card shows its intermediate `in:` and `out:` after each run, so
you can see data flow through the cascade.

## Cipher library

| Cipher    | Configurable | Inverse                                |
|-----------|--------------|----------------------------------------|
| Caesar    | shift (-25..25) | Shift by `-shift`                   |
| Vigenère  | keyword (a-z)   | Subtract keyword shifts             |
| XOR       | key (string)    | Same XOR (hex in / hex out for chain safety) |
| Reverse   | —               | Self-inverse                        |
| Base64    | —               | Standard decode (UTF-8 safe)        |

New ciphers plug in by adding a file under `lib/ciphers/` and registering
it in `lib/ciphers/index.ts`. No other files need to change.

## Architecture notes

The cipher engine is a **registry of `CipherDef` objects**, each exposing a
uniform `{ encrypt, decrypt, validateConfig, defaultConfig }` contract
(`lib/ciphers/types.ts`). A small **pipeline orchestrator**
(`lib/pipeline.ts`) runs the chain in order for encrypt and in reverse with
inverse operations for decrypt, returning a `trace` of `{ in, out }` pairs
the UI stitches back onto each node card. State lives in a single **Zustand
store** (`store/pipeline-store.ts`) that owns nodes, mode, plaintext,
ciphertext, and the round-trip verification flag — persisted to
`localStorage` so a refresh keeps the pipeline intact.

## Keyboard shortcuts

- **⌘/Ctrl + Enter** — Run the pipeline
- **⌘/Ctrl + K** — Toggle Encrypt ⇄ Decrypt

## Not a security product

The ciphers here are implemented for demonstration. They are not suitable
for protecting real data. The point is to make cascade encryption *visible*.
