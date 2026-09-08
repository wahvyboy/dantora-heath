import React, { useEffect, useRef, useState } from 'react';
import { Dna, ArrowUpRight } from 'lucide-react';

export const PreFooterAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeBase, setActiveBase] = useState<'A' | 'T' | 'C' | 'G'>('A');

  const basePairs = [
    { code: 'A', name: 'Adenine', pair: 'Thymine (T)', role: 'Gives cells the energy to repair and grow', color: '#10b981' },
    { code: 'T', name: 'Thymine', pair: 'Adenine (A)', role: 'Keeps genetic code stable and secure', color: '#34d399' },
    { code: 'C', name: 'Cytosine', pair: 'Guanine (G)', role: 'Helps turn good genes on when needed', color: '#84cc16' },
    { code: 'G', name: 'Guanine', pair: 'Cytosine (C)', role: 'Protects DNA ends so cells stay youthful', color: '#a3e635' },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = 280);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.parentElement.clientWidth;
      height = 280;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    let angle = 0;
    const pointsCount = width < 640 ? 30 : 50;

    const render = () => {
      angle += 0.022;
      ctx.clearRect(0, 0, width, height);

      const centerY = height / 2;
      const step = width / (pointsCount - 1);
      const amp = Math.min(width * 0.1, 55);
      const waveFreq = 0.045;

      // Ribbon strand 1
      ctx.beginPath();
      for (let i = 0; i < pointsCount; i++) {
        const x = i * step;
        const y = centerY + Math.sin(x * waveFreq + angle) * amp;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = 'rgba(45, 90, 68, 0.5)';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Ribbon strand 2
      ctx.beginPath();
      for (let i = 0; i < pointsCount; i++) {
        const x = i * step;
        const y = centerY + Math.sin(x * waveFreq + angle + Math.PI) * amp;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = 'rgba(74, 122, 95, 0.5)';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Base pairs connections
      for (let i = 0; i < pointsCount; i += 2) {
        const x = i * step;
        const y1 = centerY + Math.sin(x * waveFreq + angle) * amp;
        const y2 = centerY + Math.sin(x * waveFreq + angle + Math.PI) * amp;
        const depth = Math.cos(x * waveFreq + angle);

        const alpha = Math.max(0.2, (depth + 1.2) / 2.2);
        ctx.beginPath();
        ctx.moveTo(x, y1);
        ctx.lineTo(x, y2);
        ctx.strokeStyle = `rgba(163, 230, 53, ${alpha * 0.8})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Node circles
        const nodeSize = 3 * Math.max(0.6, (depth + 1.5) / 2.5);
        ctx.beginPath();
        ctx.arc(x, y1, nodeSize, 0, Math.PI * 2);
        ctx.fillStyle = depth > 0 ? '#10b981' : '#2d5a44';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x, y2, nodeSize, 0, Math.PI * 2);
        ctx.fillStyle = depth < 0 ? '#10b981' : '#4a7a5f';
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const selectedBaseObj = basePairs.find((b) => b.code === activeBase) || basePairs[0];

  return (
    <section
      id="genomics-integrity"
      className="relative overflow-hidden bg-stone-900 py-16 text-stone-100 border-t border-stone-800"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
          
          {/* Left info */}
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3 py-1 text-xs font-medium text-emerald-300">
              <Dna className="h-3.5 w-3.5" />
              <span>DNA Technology</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-light tracking-tight text-white">
              From tiny DNA code to <span className="font-normal text-emerald-400">clear health choices</span>
            </h2>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              Every person is built with unique DNA. We turn this code into simple advice so you know exactly which foods, exercises, and medicines fit you best.
            </p>

            {/* Interactive nucleotide explorer */}
            <div className="rounded-2xl border border-stone-800 bg-stone-950/80 p-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-2">
                Click a DNA Letter to see what it does:
              </span>

              <div className="grid grid-cols-4 gap-2 mb-3">
                {basePairs.map((b) => (
                  <button
                    key={b.code}
                    onClick={() => setActiveBase(b.code as any)}
                    className={`rounded-xl py-2 text-center text-sm font-bold transition-all ${
                      activeBase === b.code
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-stone-900 text-stone-300 hover:bg-stone-800 border border-stone-800'
                    }`}
                  >
                    {b.code}
                  </button>
                ))}
              </div>

              <div className="text-xs text-stone-300">
                <span className="font-bold text-emerald-300">{selectedBaseObj.name}: </span>
                <span>{selectedBaseObj.role}</span>
              </div>
            </div>
          </div>

          {/* Right canvas */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="w-full relative rounded-3xl bg-stone-950/60 p-4 border border-stone-800/80">
              <canvas ref={canvasRef} className="w-full h-56 block rounded-2xl" />
              <div className="text-center pt-2 text-[11px] text-stone-400">
                Live smooth wave of molecular DNA pairs
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
