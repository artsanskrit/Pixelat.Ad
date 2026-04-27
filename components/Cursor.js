"use client";

import { useEffect } from 'react';
import gsap from 'gsap';

export default function Cursor() {
  useEffect(() => {
    const cursor = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.cursor-follower');
    if (!cursor || !follower) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    
    // Set initial position
    gsap.set(cursor, { x: mouseX, y: mouseY, xPercent: -50, yPercent: -50 });
    gsap.set(follower, { x: mouseX, y: mouseY, xPercent: -50, yPercent: -50 });

    const xToCursor = gsap.quickTo(cursor, "x", { duration: 0.1, ease: "power3" });
    const yToCursor = gsap.quickTo(cursor, "y", { duration: 0.1, ease: "power3" });
    const xToFollower = gsap.quickTo(follower, "x", { duration: 0.6, ease: "power3" });
    const yToFollower = gsap.quickTo(follower, "y", { duration: 0.6, ease: "power3" });

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      xToCursor(mouseX);
      yToCursor(mouseY);
      xToFollower(mouseX);
      yToFollower(mouseY);
    };

    window.addEventListener('mousemove', onMouseMove);

    // Hover effects
    const interactiveElements = document.querySelectorAll('a, button, .portfolio-slide, .service-card');
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-hover');
        follower.classList.add('follower-hover');
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-hover');
        follower.classList.remove('follower-hover');
      });
    });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <>
      <div className="custom-cursor"></div>
      <div className="cursor-follower"></div>
    </>
  );
}
