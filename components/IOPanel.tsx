"use client";

import { motion } from "framer-motion";
import { Check, Copy, CheckCircle2, XCircle, Lock, Unlock } from "lucide-react";
import { useState } from "react";
import { usePipelineStore } from "@/store/pipeline-store";
import { cx } from "@/lib/utils";
import { useToast } from "./Toast";

export function IOPanel() {
  const mode = usePipelineStore((s) => s.mode);
  const plaintext = usePipelineStore((s) => s.plaintext);
  const ciphertext = usePipelineStore((s) => s.ciphertext);
  const setPlaintext = usePipelineStore((s) => s.setPlaintext);
  const setCiphertext = usePipelineStore((s) => s.setCiphertext);
  const lastRunVerified = usePipelineStore((s) => s.lastRunVerified);

  const toast = useToast();
  const [copied, setCopied] = useState<"plaintext" | "ciphertext" | null>(null);

  async function copy(value: string, which: "plaintext" | "ciphertext") {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(which);
      toast.show("Copied!", "success");
      window.setTimeout(() => setCopied(null), 1500);
    } catch {
      toast.show("Copy failed.", "error");
    }
  }

  const plaintextEditable = mode === "encrypt";
  const ciphertextEditable = mode === "decrypt";

  return (
    <aside className="flex w-full shrink-0 flex-col gap-4 border-t border-neutral-800 bg-neutral-950 p-4 lg:w-[320px] lg:overflow-y-auto lg:border-l lg:border-t-0">
      <Field
        label="Plaintext"
        icon={<Lock size={12} strokeWidth={1.75} />}
        accent={mode === "encrypt" ? "emerald" : undefined}
      >
        <textarea
          value={plaintext}
          onChange={(e) => setPlaintext(e.target.value)}
          readOnly={!plaintextEditable}
          placeholder={
            plaintextEditable
              ? "Type something to encrypt…"
              : "Recovered plaintext will appear here."
          }
          rows={5}
          className={cx(
            "w-full resize-none rounded-md border bg-neutral-900 px-3 py-2 text-sm outline-none transition-colors duration-150",
            plaintextEditable
              ? "border-neutral-800 text-neutral-100 focus:border-emerald-500/40"
              : "border-neutral-800 text-neutral-300",
          )}
        />
        <CopyButton
          onClick={() => copy(plaintext, "plaintext")}
          active={copied === "plaintext"}
          disabled={!plaintext}
        />
      </Field>

      <Field
        label="Ciphertext"
        icon={<Unlock size={12} strokeWidth={1.75} />}
        accent={mode === "decrypt" ? "amber" : undefined}
      >
        <textarea
          value={ciphertext}
          onChange={(e) => setCiphertext(e.target.value)}
          readOnly={!ciphertextEditable}
          placeholder={
            ciphertextEditable
              ? "Paste ciphertext to decrypt…"
              : "Ciphertext will appear here after Run."
          }
          rows={6}
          className={cx(
            "w-full resize-none rounded-md border bg-neutral-900 px-3 py-2 font-mono text-xs outline-none transition-colors duration-150",
            ciphertextEditable
              ? "border-neutral-800 text-neutral-100 focus:border-amber-500/40"
              : "border-neutral-800 text-neutral-300",
          )}
        />
        <CopyButton
          onClick={() => copy(ciphertext, "ciphertext")}
          active={copied === "ciphertext"}
          disabled={!ciphertext}
        />
      </Field>

      {mode === "decrypt" && lastRunVerified !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className={cx(
            "flex items-center gap-2 rounded-md border px-3 py-2 text-xs",
            lastRunVerified
              ? "border-emerald-500/40 bg-emerald-500/5 text-emerald-300"
              : "border-rose-500/40 bg-rose-500/5 text-rose-300",
          )}
        >
          {lastRunVerified ? (
            <>
              <CheckCircle2 size={14} strokeWidth={1.75} />
              Round-trip verified
            </>
          ) : (
            <>
              <XCircle size={14} strokeWidth={1.75} />
              Mismatch — recovered text differs from original
            </>
          )}
        </motion.div>
      )}
    </aside>
  );
}

function Field({
  label,
  icon,
  accent,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  accent?: "emerald" | "amber";
  children: React.ReactNode;
}) {
  const tint =
    accent === "emerald"
      ? "text-emerald-300"
      : accent === "amber"
        ? "text-amber-300"
        : "text-neutral-400";
  return (
    <div className="relative flex flex-col gap-1.5">
      <div className={cx("flex items-center gap-1.5 text-xs font-medium", tint)}>
        {icon}
        {label}
      </div>
      {children}
    </div>
  );
}

function CopyButton({
  onClick,
  active,
  disabled,
}: {
  onClick: () => void;
  active: boolean;
  disabled: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cx(
        "absolute bottom-2 right-2 rounded-md border p-1.5 transition-colors duration-150",
        disabled
          ? "cursor-not-allowed border-neutral-800 bg-neutral-900 text-neutral-700"
          : active
            ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
            : "border-neutral-800 bg-neutral-900 text-neutral-400 hover:border-neutral-700 hover:text-neutral-100",
      )}
      aria-label="Copy to clipboard"
    >
      {active ? (
        <Check size={14} strokeWidth={1.75} />
      ) : (
        <Copy size={14} strokeWidth={1.75} />
      )}
    </button>
  );
}
