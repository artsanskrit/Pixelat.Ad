"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import PixelBracket from './PixelBracket';

export default function PageHero({ title, subtitle, label, bgImage }) {
  const titleRef = useRef(null);

  useEffect(() => {
    // Simple reveal animation
    gsap.fromTo(titleRef.current, 
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 }
    );
  }, []);

  return (
    <header className="page-hero">
      <div className="container">
        {label && <div className="page-hero__label"><PixelBracket>{label}</PixelBracket></div>}
        <h1 className="page-hero__title glitch-text" data-text={title} ref={titleRef}>
          {title}
        </h1>
        {subtitle && <p className="page-hero__subtitle">{subtitle}</p>}
      </div>
      {bgImage && (
        <div className="page-hero__bg">
          <img src={bgImage} alt="" />
          <div className="page-hero__bg-overlay"></div>
        </div>
      )}
    </header>
  );
}
