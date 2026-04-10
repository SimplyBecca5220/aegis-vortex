"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldAlert, ShieldCheck, FileCheck2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function ConstitutionChecker() {
  const [transaction, setTransaction] = useState("");
  const [status, setStatus] = useState<"idle" | "checking" | "banned" | "passed">("idle");
  const [reasoning, setReasoning] = useState("");

  const handleCheck = () => {
    if (!transaction.trim()) return;
    setStatus("checking");
    setReasoning("Analyizing against off-chain GenLayer constitution...");
    
    // Simulate Greybox AI check delay
    setTimeout(() => {
      if (transaction.toLowerCase().includes("exploit") || transaction.toLowerCase().includes("reentrancy")) {
        setStatus("banned");
        setReasoning("Malicious intent detected. Transaction violates the Optimistic Democracy Guidelines Section 4: Deterministic Guardrails.");
      } else {
        setStatus("passed");
        setReasoning("Transaction meets consensus criteria. No injection drift detected.");
      }
    }, 2500);
  };

  return (
    <div className="glass-panel rounded-xl p-6 relative overflow-hidden group">
      {/* Code Rain overlay on hover */}
      <div className="code-rain transition-opacity duration-300 opacity-0 group-hover:opacity-30" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <FileCheck2 className="w-6 h-6 text-teal-neon" />
          <h2 className="text-xl font-bold tracking-wider text-teal-neon uppercase font-mono">Constitution Checker</h2>
        </div>
        
        <p className="text-sm text-gray-400 mb-6 font-mono">
          Paste a transaction payload to simulate it against the GenLayer Constitution shadow-node.
        </p>

        <textarea
          value={transaction}
          onChange={(e) => setTransaction(e.target.value)}
          placeholder="e.g. { 'type': 'call', 'payload': 'invoke_contract()' }"
          className="w-full h-32 bg-obsidian-light border border-teal-neon/20 rounded-lg p-3 text-sm font-mono text-gray-300 focus:outline-none focus:border-teal-neon/60 focus:ring-1 focus:ring-teal-neon/60 transition-all resize-none shadow-inner"
        />

        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={handleCheck}
            disabled={status === "checking" || !transaction.trim()}
            className="px-6 py-2 bg-teal-neon/10 hover:bg-teal-neon/20 border border-teal-neon text-teal-neon rounded uppercase font-bold text-sm tracking-widest transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === "checking" ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" /> Simulating...
              </span>
            ) : "Simulate Payload"}
          </button>
        </div>

        {status !== "idle" && status !== "checking" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "mt-6 p-4 rounded-lg border font-mono text-sm",
              status === "banned" 
                ? "bg-crimson-alarm/10 border-crimson-alarm/30 text-crimson-alarm" 
                : "bg-teal-neon/10 border-teal-neon/30 text-teal-neon"
            )}
          >
            <div className="flex items-center gap-2 mb-2 font-bold uppercase">
              {status === "banned" ? <ShieldAlert className="w-5 h-5" /> : <ShieldCheck className="w-5 h-5" />}
              {status === "banned" ? "Vetoed by Shadow Validators" : "Consensus Achieved"}
            </div>
            <p className="text-gray-300">{reasoning}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
