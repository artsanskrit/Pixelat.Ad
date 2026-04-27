import Link from 'next/link';

export default function PortfolioSlide({ project, index, total }) {
  const numPad = (num) => String(num).padStart(2, '0');
  
  return (
    <div className="portfolio-slide">
      <div className="portfolio-image">
        <img src={project.image} alt={project.title} />
      </div>
      <div className="portfolio-content">
        <div className="portfolio-meta">
          <span className="portfolio-index">{numPad(index + 1)} / {numPad(total)}</span>
          <span className="portfolio-category">_{project.category}</span>
        </div>
        <h3 className="portfolio-title glitch-text" data-text={project.title}>
          {project.title}
        </h3>
        <p className="portfolio-client">Client: {project.client}</p>
        
        <Link href={`/work/${project.slug}`} className="portfolio-link">
          <span className="link-text">VIEW_CASE_STUDY</span>
          <span className="link-arrow">→</span>
        </Link>
      </div>
    </div>
  );
}
