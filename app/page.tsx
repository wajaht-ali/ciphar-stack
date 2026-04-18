"use client";

import { useEffect } from "react";
import { Header } from "@/components/Header";
import { LibraryPanel } from "@/components/LibraryPanel";
import { PipelinePanel } from "@/components/PipelinePanel";
import { IOPanel } from "@/components/IOPanel";
import { ToastProvider } from "@/components/Toast";
import { usePipelineStore } from "@/store/pipeline-store";

export default function Home() {
  const run = usePipelineStore((s) => s.run);
  const setMode = usePipelineStore((s) => s.setMode);

  useEffect(() => {
    void usePipelineStore.persist.rehydrate();
  }, []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const isMod = e.metaKey || e.ctrlKey;
      if (!isMod) return;
      if (e.key === "Enter") {
        e.preventDefault();
        void run();
      } else if (e.key.toLowerCase() === "k") {
        e.preventDefault();
        const current = usePipelineStore.getState().mode;
        setMode(current === "encrypt" ? "decrypt" : "encrypt");
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [run, setMode]);

  return (
    <ToastProvider>
      <div className="flex min-h-screen flex-col bg-neutral-950 lg:h-screen">
        <Header />
        <div className="flex flex-1 flex-col lg:flex-row lg:overflow-hidden">
          <LibraryPanel />
          <PipelinePanel />
          <IOPanel />
        </div>
      </div>
    </ToastProvider>
  );
}
