export type CipherId = "caesar" | "vigenere" | "xor" | "reverse" | "base64";

export type Mode = "encrypt" | "decrypt";

export type PipelineNode = {
  id: string;
  cipherId: CipherId;
  config: unknown;
  lastIn?: string;
  lastOut?: string;
  hasError?: boolean;
  errorMsg?: string;
};

export type Preset = {
  id: string;
  name: string;
  description: string;
  nodes: Array<Pick<PipelineNode, "cipherId" | "config">>;
  plaintext: string;
};
