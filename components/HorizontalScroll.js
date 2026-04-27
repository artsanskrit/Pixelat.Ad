"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger, since it's a client component
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HorizontalScroll({ children }) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Desktop horizontal scroll logic
      ScrollTrigger.matchMedia({
        "(min-width: 769px)": function() {
          const track = trackRef.current;
          const slides = gsap.utils.toArray('.portfolio-slide');
          
          if (!track || slides.length === 0) return;
          
          const totalWidth = track.scrollWidth - window.innerWidth;
          
          // Apply horizontal pinning
          gsap.to(track, {
            x: () => -totalWidth + "px",
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              pin: true,
              scrub: 1,
              end: () => `+=${totalWidth}`,
              invalidateOnRefresh: true,
            }
          });

          // Text reveals per slide
          slides.forEach((slide) => {
            const content = slide.querySelector('.portfolio-content');
            if (content) {
              gsap.from(content.children, {
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                scrollTrigger: {
                  trigger: slide,
                  containerAnimation: gsap.getById("hScroll") || null, // Will hook into the track translation if needed, but simple intersection often works
                  start: "left center",
                  toggleActions: "play none none reverse"
                }
              });
            }
          });
        },
        
        // Mobile fallback
        "(max-width: 768px)": function() {
          const slides = gsap.utils.toArray('.portfolio-slide');
          
          slides.forEach((slide) => {
            const content = slide.querySelector('.portfolio-content');
            if (content) {
              gsap.from(content.children, {
                y: 30,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                scrollTrigger: {
                  trigger: slide,
                  start: "top 80%",
                  toggleActions: "play none none reverse"
                }
              });
            }
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="portfolio-section" id="work" ref={sectionRef}>
      <div className="portfolio-track-wrap">
        <div className="portfolio-track" ref={trackRef}>
          {children}
        </div>
      </div>
    </section>
  );
}
