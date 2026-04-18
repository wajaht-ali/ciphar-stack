import type { CipherId } from "@/types";
import type { CipherDef } from "./types";
import CaesarCipher from "./caesar";
import VigenereCipher from "./vigenere";
import XORCipher from "./xor";
import ReverseCipher from "./reverse";
import Base64Cipher from "./base64";

export const CIPHER_DEFS: Record<CipherId, CipherDef<any>> = {
  caesar: CaesarCipher,
  vigenere: VigenereCipher,
  xor: XORCipher,
  reverse: ReverseCipher,
  base64: Base64Cipher,
};

export const CIPHER_LIST: CipherDef<any>[] = [
  CaesarCipher,
  VigenereCipher,
  XORCipher,
  ReverseCipher,
  Base64Cipher,
];

export type { CipherDef, ValidationResult } from "./types";
