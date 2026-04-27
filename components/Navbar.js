"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    // Scroll handling
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Time interval
    const updateTime = () => setTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
    updateTime();
    const timer = setInterval(updateTime, 1000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(timer);
    };
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <Link href="/" className="logo">
        PIXELAT.AD
      </Link>
      
      <div className="nav-links">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/services">Services</Link>
        <Link href="/work">Work</Link>
        <Link href="/contact">Contact</Link>
      </div>

      <div className="nav-meta">
        <span className="local-time">{time}</span>
      </div>

      <div 
        className={`mobile-menu-btn ${mobileMenuOpen ? 'active' : ''}`}
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        <span></span>
        <span></span>
      </div>

      {/* Mobile nav overlay can be added here or centrally managed later */}
    </nav>
  );
}
