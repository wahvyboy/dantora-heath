import React, { useEffect, useRef } from 'react';

interface DnaCanvasProps {
  scrollProgress?: number;
  className?: string;
  density?: 'full' | 'ambient' | 'hero';
}

export const DnaCanvas: React.FC<DnaCanvasProps> = ({
  className = '',
  density = 'full',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Smooth scroll interpolation
    let targetScroll = window.scrollY;
    let currentScroll = window.scrollY;

    // Mouse parallax tracking
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleScroll = () => {
      targetScroll = window.scrollY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 40;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 40;
    };

    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize);

    // Ambient floating particles around the DNA helix
    const particleCount = width < 768 ? 35 : 75;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.5 + 0.8,
      speedY: Math.random() * 0.4 + 0.1,
      speedX: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.5 + 0.2,
      pulseSpeed: Math.random() * 0.02 + 0.01,
      pulsePhase: Math.random() * Math.PI * 2,
    }));

    let time = 0;

    const render = () => {
      time += 0.015;
      currentScroll += (targetScroll - currentScroll) * 0.08;
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Draw ambient floating biological particles
      particles.forEach((p) => {
        p.y -= p.speedY;
        p.x += p.speedX;
        p.pulsePhase += p.pulseSpeed;

        if (p.y < -10) p.y = height + 10;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        const currentAlpha = p.alpha * (0.6 + 0.4 * Math.sin(p.pulsePhase));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(62, 115, 87, ${currentAlpha * 0.5})`;
        ctx.fill();
      });

      // DNA Helix Geometry Settings
      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;

      // Dynamic path positioning across viewport based on scroll
      const docHeight = Math.max(
        document.body.scrollHeight - window.innerHeight,
        1000
      );
      const totalScrollNorm = Math.min(Math.max(currentScroll / docHeight, 0), 1);

      // Horizontal path curve: starts on right side for hero (as in screenshot), snakes across sections
      const heroX = isMobile ? width * 0.75 : width * 0.68;
      const midWave = Math.sin(totalScrollNorm * Math.PI * 2.5) * (isMobile ? 30 : 90);
      const centerX = heroX + midWave + currentMouseX;
      
      const rungs = isMobile ? 48 : 80;
      const helixRadius = isMobile ? 42 : isTablet ? 70 : 85;
      const verticalSpacing = isMobile ? 22 : 28;
      const rotationSpeed = 0.08;
      const scrollRotation = (currentScroll * 0.0035);

      // Draw base pairs and helix backbone
      for (let i = 0; i < rungs; i++) {
        const yPos = (i * verticalSpacing - (currentScroll % verticalSpacing) + time * 15) % (height + 200) - 100;
        
        // Progress angle along the spiral
        const angle = (i * 0.28) + (time * 0.4) + scrollRotation;
        
        // Sinuous 3D perspective projection
        const xOffsetA = Math.cos(angle) * helixRadius;
        const zA = Math.sin(angle); // -1 (back) to +1 (front)

        const xOffsetB = Math.cos(angle + Math.PI) * helixRadius;
        const zB = Math.sin(angle + Math.PI);

        // Perspective scale & depth
        const scaleA = (zA + 2.4) / 3.4;
        const scaleB = (zB + 2.4) / 3.4;

        const posXA = centerX + xOffsetA;
        const posXB = centerX + xOffsetB;
        const posYA = yPos + zA * 12 + currentMouseY;
        const posYB = yPos + zB * 12 + currentMouseY;

        const alphaA = Math.max(0.12, (zA + 1.2) / 2.2);
        const alphaB = Math.max(0.12, (zB + 1.2) / 2.2);

        // Connecting nucleotide rung (Hydrogen bond between base pairs)
        if (i % 2 === 0) {
          const avgZ = (zA + zB) / 2;
          const rungAlpha = Math.max(0.15, (avgZ + 1.5) / 2.5) * (density === 'ambient' ? 0.35 : 0.65);

          // Alternating base pair colors (A-T: Emerald/Teal, C-G: Lime/Sage)
          const isAtPair = i % 4 === 0;
          const grad = ctx.createLinearGradient(posXA, posYA, posXB, posYB);
          
          if (isAtPair) {
            grad.addColorStop(0, `rgba(45, 90, 68, ${alphaA * rungAlpha})`);
            grad.addColorStop(0.5, `rgba(132, 185, 140, ${rungAlpha * 0.9})`);
            grad.addColorStop(1, `rgba(32, 70, 52, ${alphaB * rungAlpha})`);
          } else {
            grad.addColorStop(0, `rgba(74, 122, 95, ${alphaA * rungAlpha})`);
            grad.addColorStop(0.5, `rgba(180, 220, 150, ${rungAlpha * 0.95})`);
            grad.addColorStop(1, `rgba(45, 90, 68, ${alphaB * rungAlpha})`);
          }

          ctx.beginPath();
          ctx.moveTo(posXA, posYA);
          ctx.lineTo(posXB, posYB);
          ctx.strokeStyle = grad;
          ctx.lineWidth = Math.max(1.2, 2.2 * ((scaleA + scaleB) / 2));
          ctx.stroke();

          // Central hydrogen bond node
          const midX = (posXA + posXB) / 2;
          const midY = (posYA + posYB) / 2;
          ctx.beginPath();
          ctx.arc(midX, midY, 1.8 * ((scaleA + scaleB) / 2), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(163, 230, 53, ${rungAlpha * 0.75})`;
          ctx.fill();
        }

        // Backbone Strand A Node (Sugar-Phosphate unit)
        const radiusA = Math.max(2.2, 4.5 * scaleA);
        ctx.beginPath();
        ctx.arc(posXA, posYA, radiusA, 0, Math.PI * 2);
        const nodeGradA = ctx.createRadialGradient(posXA, posYA, 0, posXA, posYA, radiusA * 2.2);
        nodeGradA.addColorStop(0, `rgba(110, 190, 140, ${alphaA})`);
        nodeGradA.addColorStop(0.6, `rgba(38, 80, 60, ${alphaA * 0.8})`);
        nodeGradA.addColorStop(1, `rgba(20, 50, 36, 0)`);
        ctx.fillStyle = nodeGradA;
        ctx.fill();

        // Core bright center for Strand A
        ctx.beginPath();
        ctx.arc(posXA, posYA, Math.max(1, radiusA * 0.45), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220, 252, 231, ${alphaA * 0.95})`;
        ctx.fill();

        // Backbone Strand B Node
        const radiusB = Math.max(2.2, 4.5 * scaleB);
        ctx.beginPath();
        ctx.arc(posXB, posYB, radiusB, 0, Math.PI * 2);
        const nodeGradB = ctx.createRadialGradient(posXB, posYB, 0, posXB, posYB, radiusB * 2.2);
        nodeGradB.addColorStop(0, `rgba(160, 215, 130, ${alphaB})`);
        nodeGradB.addColorStop(0.6, `rgba(45, 95, 70, ${alphaB * 0.8})`);
        nodeGradB.addColorStop(1, `rgba(20, 50, 36, 0)`);
        ctx.fillStyle = nodeGradB;
        ctx.fill();

        // Core bright center for Strand B
        ctx.beginPath();
        ctx.arc(posXB, posYB, Math.max(1, radiusB * 0.45), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(240, 253, 244, ${alphaB * 0.95})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none fixed inset-0 z-0 h-full w-full opacity-85 transition-opacity duration-700 ${className}`}
      aria-hidden="true"
    />
  );
};
