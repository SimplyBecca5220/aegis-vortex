"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Activity, Network, Zap } from "lucide-react";

export function Stats() {
  const [drift, setDrift] = useState(0.040);
  const [appeals, setAppeals] = useState(1432);

  useEffect(() => {
    const driftInterval = setInterval(() => {
      setDrift(prev => {
        const change = (Math.random() - 0.5) * 0.002;
        return Math.max(0, prev + change);
      });
    }, 2000);

    const appealInterval = setInterval(() => {
      if (Math.random() > 0.8) {
        setAppeals(prev => prev + 1);
      }
    }, 4500);

    return () => {
      clearInterval(driftInterval);
      clearInterval(appealInterval);
    };
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <StatCard 
        title="Network Drift" 
        value={`${drift.toFixed(3)}%`} 
        trend="-0.01% / hr" 
        icon={<Activity className="w-5 h-5 text-crimson-alarm" />}
        desc="Difference between on-chain & shadow consensus"
      />
      <StatCard 
        title="Appeals Won" 
        value={appeals.toLocaleString()} 
        trend="+12 today" 
        icon={<Zap className="w-5 h-5 text-teal-neon" />}
        desc="Total malicious nodes slashed"
      />
      <DiversityOptimizerCard />
    </div>
  );
}

function StatCard({ title, value, trend, icon, desc }: { title: string, value: string, trend: string, icon: React.ReactNode, desc: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel p-6 rounded-xl flex flex-col justify-between"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-gray-400 font-mono text-xs uppercase tracking-widest mb-1">{title}</h3>
          <div className="text-3xl font-bold text-white font-mono">{value}</div>
        </div>
        <div className="p-2 bg-obsidian-light rounded-lg border border-teal-neon/20">
          {icon}
        </div>
      </div>
      <div className="flex items-center gap-2 text-xs font-mono text-gray-500">
        <span className="text-teal-neon">{trend}</span>
        <span>• {desc}</span>
      </div>
    </motion.div>
  );
}

function DiversityOptimizerCard() {
  const [selectedModel, setSelectedModel] = useState("Llama 3");
  
  const models = [
    { name: "Llama 3", usage: 80, recommendation: "Mixtral 8x7B", bonus: "+15%" },
    { name: "GPT-4", usage: 50, recommendation: "Claude 3", bonus: "+10%" },
    { name: "Claude 3", usage: 30, recommendation: "Mixtral 8x7B", bonus: "+5%" },
    { name: "Mixtral 8x7B", usage: 10, recommendation: null, bonus: "MAX" },
  ];

  const current = models.find(m => m.name === selectedModel) || models[0];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel p-6 rounded-xl border border-teal-neon/40 shadow-[0_0_15px_rgba(0,240,255,0.2)] flex flex-col justify-between group overflow-hidden relative"
    >
      <div className="code-rain transition-opacity duration-300 opacity-0 group-hover:opacity-30" />
      <div className="flex justify-between items-start mb-2 relative z-10">
        <div>
          <h3 className="text-teal-neon font-mono text-xs uppercase tracking-widest mb-1">Model Diversity Optimizer</h3>
          <div className="text-sm font-bold text-white mb-2">Select Your Validator LLM:</div>
        </div>
        <div className="p-2 bg-obsidian-light rounded-lg border border-teal-neon/20">
          <Network className="w-5 h-5 text-teal-neon" />
        </div>
      </div>

      <div className="relative z-10 mb-3">
        <select 
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
          className="w-full bg-obsidian-light border border-teal-neon/30 text-white text-sm rounded p-2 focus:outline-none focus:ring-1 focus:ring-teal-neon font-mono"
        >
          {models.map(m => (
            <option key={m.name} value={m.name}>{m.name}</option>
          ))}
        </select>
      </div>

      <div className="relative z-10 text-xs text-gray-300 font-mono leading-relaxed bg-obsidian/60 p-3 rounded border border-white/5 h-[80px] flex flex-col justify-center">
        <div>&gt; {current.usage}% of validators use <span className="text-white">{current.name}</span>.</div>
        {current.recommendation ? (
          <>
            <div>&gt; ACTION: Switch to <span className="text-teal-neon font-bold">{current.recommendation}</span>.</div>
            <div>&gt; REWARD: <span className="text-teal-neon font-bold">{current.bonus}</span> Health Bonus.</div>
          </>
        ) : (
          <>
            <div>&gt; ACTION: Stay the course!</div>
            <div>&gt; REWARD: <span className="text-teal-neon font-bold">{current.bonus}</span> Diversity Bonus.</div>
          </>
        )}
      </div>
    </motion.div>
  );
}
