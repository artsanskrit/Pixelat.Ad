"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Loader() {
  const canvasRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    // Canvas Matrix Effect
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = '01ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ'.split('');
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(5, 5, 8, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#e5333f'; // Red matrix text
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    // Loading Animation Timeline
    const tl = gsap.timeline();

    tl.to('.loader-progress', {
      width: '100%',
      duration: 2,
      ease: 'power2.inOut',
    })
    .to('.loader-counter', {
      innerText: '100%',
      duration: 2,
      snap: { innerText: 1 },
      ease: 'power2.inOut',
    }, '<')
    .to('.loader-text', {
      opacity: 0,
      duration: 0.3,
      y: -20,
      stagger: 0.1
    })
    .to(wrapperRef.current, {
      yPercent: -100,
      duration: 1.2,
      ease: 'power4.inOut',
      onComplete: () => {
        cancelAnimationFrame(animationFrameId);
        wrapperRef.current.style.display = 'none';
        
        // Trigger generic "loaderComplete" event for other components to listen to
        window.dispatchEvent(new Event('loaderComplete'));
      }
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="loader-wrapper" ref={wrapperRef}>
      <canvas className="loader-canvas" ref={canvasRef}></canvas>
      <div className="loader-content">
        <div className="loader-text-group">
          <div className="loader-text">[ INITIALIZING_SYSTEM ]</div>
          <div className="loader-text">LOADING_ASSETS...</div>
        </div>
        <div className="loader-bar">
          <div className="loader-progress"></div>
        </div>
        <div className="loader-counter">0%</div>
      </div>
    </div>
  );
}
