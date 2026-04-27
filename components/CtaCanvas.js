"use client";

import { useEffect, useRef } from 'react';

export default function CtaCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const setCanvasSize = () => {
      // Find parent dimensions securely
      const parent = canvas.parentElement;
      if (parent) {
          canvas.width = parent.offsetWidth;
          canvas.height = parent.offsetHeight;
      } else {
          canvas.width = window.innerWidth;
          canvas.height = 400; // fallback
      }
    };

    setCanvasSize();

    const blocks = [];
    const blockCount = 30;

    for (let i = 0; i < blockCount; i++) {
        blocks.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 40 + 10,
            speedY: Math.random() * -1 - 0.5,
            opacity: Math.random() * 0.1 + 0.02
        });
    }

    const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        blocks.forEach(b => {
            ctx.fillStyle = `rgba(229, 51, 63, ${b.opacity})`; // Use red variable equivalent
            ctx.fillRect(b.x, b.y, b.size, b.size);
            
            // Wireframe stroke
            ctx.strokeStyle = `rgba(229, 51, 63, ${b.opacity * 2})`;
            ctx.strokeRect(b.x, b.y, b.size, b.size);

            b.y += b.speedY;

            if (b.y + b.size < 0) {
                b.y = canvas.height + b.size;
                b.x = Math.random() * canvas.width;
            }
        });

        animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    window.addEventListener('resize', setCanvasSize);

    return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  return <canvas className="cta-canvas" ref={canvasRef}></canvas>;
}
