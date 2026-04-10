import { Vortex } from "@/components/Vortex";
import { Stats } from "@/components/Stats";
import { ConstitutionChecker } from "@/components/ConstitutionChecker";
import { Shield } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-obsidian text-foreground">
      {/* 3D Visualizer Background */}
      <Vortex />
      
      {/* Main Content Overlay */}
      <div className="relative z-10 container mx-auto px-6 py-12 lg:px-12 flex flex-col min-h-screen">
        
        {/* Header */}
        <header className="flex justify-between items-center mb-16">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-teal-neon" />
            <h1 className="text-3xl font-black tracking-tighter uppercase text-white drop-shadow-[0_0_10px_rgba(0,240,255,0.5)]">
              Aegis<span className="text-teal-neon text-opacity-80">.</span>Vortex
            </h1>
          </div>
          <div className="font-mono text-xs tracking-widest text-teal-neon/60 border border-teal-neon/30 px-3 py-1 rounded bg-teal-neon/5">
            GENLAYER TESTNET BRADBURY
          </div>
        </header>

        <div className="flex-grow flex flex-col">
          {/* Tagline / Intro */}
          <div className="max-w-2xl mb-12">
            <h2 className="text-xl md:text-2xl font-mono text-gray-300 font-light mb-4">
              Predatory Consensus <span className="text-white font-bold">Engine</span>.
            </h2>
            <p className="text-sm text-gray-500 font-mono leading-relaxed">
              Automate "Shadow Simulations" to identify non-deterministic drift. 
              Punish malicious validators. Secure the Optimistic Democracy. 
              The Scholar's Gym refined into a Commander's Bridge.
            </p>
          </div>

          {/* Stats & Optimizer */}
          <Stats />

          {/* Constitution Checker Area */}
          <div className="mt-auto grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="flex flex-col justify-end">
              <div className="glass-panel p-6 rounded-xl border-crimson-alarm/20 terminal-monitor">
                <h3 className="font-mono text-crimson-alarm uppercase tracking-widest text-xs mb-2">Live Appeals</h3>
                <div className="text-gray-400 font-mono text-sm leading-relaxed">
                  <span className="text-white">ID: tx-8492...</span> Drift detected: 8.2% &gt; $\epsilon$<br/>
                  Triggering automated appeal on <span className="text-crimson-alarm">Validator #042</span>.<br/>
                  &gt; Slashed 1,200 $GEN stake.
                </div>
              </div>
            </div>
            
            <ConstitutionChecker />
          </div>
        </div>
      </div>
    </main>
  );
}
