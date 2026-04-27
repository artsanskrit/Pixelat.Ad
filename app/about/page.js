import PageHero from "@/components/PageHero";
import TeamCard from "@/components/TeamCard";
import teamData from "@/data/team.json";

export default function About() {
  return (
    <>
      <PageHero 
        title="We Are Pixelat" 
        subtitle="Where pixels meet purpose. We are a collective of digital craftsmen building the future of brand experiences."
        label="OUR_AGENCY" 
      />

      <section className="container">
        <div className="section-label">
          <span className="section-num">01</span>
          <span className="section-line"></span>
          <span className="section-name glitch-text" data-text="OUR_TEAM">OUR_TEAM</span>
        </div>
        
        <div className="team-grid">
          {teamData.map((member, i) => (
            <TeamCard key={i} member={member} />
          ))}
        </div>
      </section>
      
      <section className="container" style={{ paddingTop: 0 }}>
        <div className="section-label">
          <span className="section-num">02</span>
          <span className="section-line"></span>
          <span className="section-name glitch-text" data-text="OUR_PROCESS">OUR_PROCESS</span>
        </div>
        <div className="process-grid">
          <div>
            <h3 style={{fontSize: '2rem', marginBottom: '1rem', color: 'var(--c-red)'}}>Discovery.</h3>
            <p style={{color: 'var(--c-white-dim)', lineHeight: 1.8}}>We dive deep into your brand, market, and audience to uncover the strategic insights that will drive our creative direction.</p>
          </div>
          <div>
            <h3 style={{fontSize: '2rem', marginBottom: '1rem', color: 'var(--c-red)'}}>Design.</h3>
            <p style={{color: 'var(--c-white-dim)', lineHeight: 1.8}}>Where strategy meets aesthetics. We craft pixel-perfect visual systems that resonate emotionally and function flawlessly.</p>
          </div>
          <div>
            <h3 style={{fontSize: '2rem', marginBottom: '1rem', color: 'var(--c-red)'}}>Delivery.</h3>
            <p style={{color: 'var(--c-white-dim)', lineHeight: 1.8}}>We bring designs to life through cutting-edge development, ensuring blazing-fast performance and accessible experiences.</p>
          </div>
        </div>
      </section>
    </>
  );
}
