import PageHero from "@/components/PageHero";
import PixelBracket from "@/components/PixelBracket";
import BtnGlitch from "@/components/BtnGlitch";
import projectsData from "@/data/projects.json";

// Support static generation
export function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectDetail({ params }) {
  const { slug } = await params;
  const project = projectsData.find(p => p.slug === slug);

  if (!project) {
    return (
      <div className="container" style={{paddingTop: '20vh', textAlign: 'center'}}>
        <h1>Project Not Found</h1>
        <BtnGlitch href="/work" text="RETURN TO WORK" className="mt-8"/>
      </div>
    );
  }

  return (
    <>
      <PageHero 
        title={project.title} 
        label={project.category.toUpperCase()} 
        bgImage={project.image}
      />

      <section className="container">
        <div className="project-detail-grid">
            
            {/* Left Meta Sidebar */}
            <div className="project-meta-sidebar" style={{ fontFamily: 'var(--f-mono)', fontSize: '0.85rem' }}>
                <div style={{ marginBottom: '2rem' }}>
                    <div style={{ color: 'var(--c-white-muted)', marginBottom: '0.5rem' }}><PixelBracket>CLIENT</PixelBracket></div>
                    <div style={{ color: 'var(--c-white)', fontSize: '1rem' }}>{project.client}</div>
                </div>
                <div style={{ marginBottom: '2rem' }}>
                    <div style={{ color: 'var(--c-white-muted)', marginBottom: '0.5rem' }}><PixelBracket>YEAR</PixelBracket></div>
                    <div style={{ color: 'var(--c-white)', fontSize: '1rem' }}>{project.year}</div>
                </div>
                <div>
                    <div style={{ color: 'var(--c-white-muted)', marginBottom: '0.5rem' }}><PixelBracket>SERVICES</PixelBracket></div>
                    <ul style={{ color: 'var(--c-red)', lineHeight: '1.8' }}>
                        {project.services.map((service, i) => (
                            <li key={i}>{service}</li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Right Content */}
            <div>
                <h3 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', marginBottom: '2rem', lineHeight: '1.3' }}>{project.tagline}</h3>
                <p style={{ fontSize: '1.1rem', color: 'var(--c-white-dim)', marginBottom: '3rem' }}>{project.description}</p>
                
                <h4 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--c-red)' }}>The Challenge</h4>
                <p style={{ color: 'var(--c-white-dim)', marginBottom: '2rem' }}>{project.challenge}</p>

                <h4 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--c-red)' }}>The Solution</h4>
                <p style={{ color: 'var(--c-white-dim)', marginBottom: '4rem' }}>{project.solution}</p>

                 {/* Results */}
                <div className="project-results-grid">
                    {project.results.map((result, i) => (
                        <div key={i}>
                            <div style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: 'bold', color: 'var(--c-white)', marginBottom: '0.5rem' }}>{result.value}</div>
                            <div style={{ color: 'var(--c-white-dim)', fontSize: '0.9rem' }}>{result.detail}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* Gallery */}
        <div className="gallery-grid">
            {project.gallery.map((img, i) => (
                <img key={i} src={img} alt={`${project.title} gallery image ${i+1}`} />
            ))}
        </div>

        {/* Testimonial */}
        {project.testimonial && (
            <div style={{ textAlign: 'center', padding: '6rem 0', maxWidth: '800px', margin: '0 auto' }}>
                <p style={{ fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', fontStyle: 'italic', marginBottom: '2rem' }}>"{project.testimonial.quote}"</p>
                <div style={{ fontFamily: 'var(--f-mono)', color: 'var(--c-red)' }}>
                   — {project.testimonial.author}, {project.testimonial.role}
                </div>
            </div>
        )}
      </section>
    </>
  );
}
