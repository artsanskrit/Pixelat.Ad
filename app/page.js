import PixelBracket from "@/components/PixelBracket";
import GlitchText from "@/components/GlitchText";
import BtnGlitch from "@/components/BtnGlitch";
import BtnOutlineGlitch from "@/components/BtnOutlineGlitch";
import SectionLabel from "@/components/SectionLabel";
import PixelTransition from "@/components/PixelTransition";
import Marquee from "@/components/Marquee";
import HorizontalScroll from "@/components/HorizontalScroll";
import PortfolioSlide from "@/components/PortfolioSlide";
import HeroGraphic from "@/components/HeroGraphic";
import HeroCanvas from "@/components/HeroCanvas";
import CtaCanvas from "@/components/CtaCanvas";
import projectsData from "@/data/projects.json";

export default function Home() {
  const marqueeItems = ["Brand Identity", "Web Design", "Motion Graphics", "Digital Ads"];
  
  return (
    <>
      {/* 1. Hero Section */}
      <section className="hero-section">
        <HeroCanvas />
        <div className="container hero-grid">
          <div className="hero-content">
            <span className="hero-tag"><PixelBracket>CREATIVE DIGITAL AGENCY — EST.2018</PixelBracket></span>
            <h1 className="hero-title">
              Creative<br/>Ideas.<br/>
              <span className="highlight">Pixel Perfect</span><br/>
              Execution.
            </h1>
            <p className="hero-desc">We build brands that break through the noise — one pixel at a time.</p>
            <div className="hero-ctas">
              <BtnGlitch href="/work" text="VIEW PROJECTS" />
              <BtnOutlineGlitch href="/contact" text="START A PROJECT" />
            </div>
          </div>
          <HeroGraphic />
        </div>
      </section>

      {/* 2. Marquee */}
      <Marquee items={marqueeItems} />

      {/* 4. Portfolio Horizontal Scroll */}
      <PixelTransition />
      <HorizontalScroll>
        {projectsData.map((project, index) => (
          <PortfolioSlide 
            key={project.slug} 
            project={project} 
            index={index} 
            total={projectsData.length} 
          />
        ))}
      </HorizontalScroll>

      {/* 5. CTA Section */}
      <section className="cta-section">
        <PixelTransition />
        <CtaCanvas />
        <div className="container cta-content">
          <SectionLabel num="04" name="CONTACT" />
          <h2 className="cta-title">
            Let's Build<br/>Something<br/>
            <span className="highlight glitch-text" data-text="Creative">Creative</span><br/>
            Together.
          </h2>
          <BtnGlitch href="/contact" text="GET IN TOUCH →" large />
        </div>
      </section>
    </>
  );
}
