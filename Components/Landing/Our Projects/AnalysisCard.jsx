import React from "react";

export const AnalysisCard = ({ data, loading }) => {
  if (!data && !loading) return null;

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full max-w-3xl px-6 z-50 pointer-events-none">
      <div className="glass-panel p-6 rounded-[2rem] shadow-2xl animate-in fade-in slide-in-from-bottom-6 duration-700 pointer-events-auto border-indigo-500/20">
        {loading ? (
          <div className="flex items-center space-x-6 py-4 animate-pulse">
            <div className="h-16 w-16 bg-white/5 rounded-2xl" />
            <div className="flex-1 space-y-3">
              <div className="h-2 bg-white/5 rounded w-1/4" />
              <div className="h-3 bg-white/5 rounded w-3/4" />
              <div className="h-2 bg-white/5 rounded w-1/2" />
            </div>
          </div>
        ) : (
          data && (
            <div className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-8">
              <div className="flex flex-col items-center justify-center space-y-2 border-r border-white/5 pr-8">
                <div className="relative flex items-center justify-center">
                  <svg className="w-20 h-20 transform -rotate-90">
                    <circle
                      cx="40"
                      cy="40"
                      r="36"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="transparent"
                      className="text-white/5"
                    />
                    <circle
                      cx="40"
                      cy="40"
                      r="36"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="transparent"
                      strokeDasharray={226}
                      strokeDashoffset={
                        226 - (226 * data.performanceScore) / 100
                      }
                      className="text-indigo-500 transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <span className="absolute text-xl font-black text-white">
                    {data.performanceScore}
                  </span>
                </div>
                <span className="text-[10px] uppercase font-bold text-white/40 tracking-widest">
                  Perf. Score
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-indigo-400">
                    AI Architect Audit
                  </span>
                  <span className="text-[10px] font-bold px-2 py-1 bg-white/5 rounded-lg text-white/40 uppercase">
                    V3.1 Engine
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-indigo-400/80 uppercase tracking-tighter">
                      Architecture Summary
                    </p>
                    <p className="text-xs text-white/70 leading-relaxed italic">
                      "{data.analysis}"
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-purple-400/80 uppercase tracking-tighter">
                      UX Optimization
                    </p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      {data.uxInsight}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[10px] text-white/40">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping" />
                    Scaling Potential:{" "}
                    <span className="text-white/60 font-medium">
                      {data.futureScalability}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};
