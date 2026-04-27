import Link from 'next/link';

export default function ProjectCard({ project }) {
  return (
    <Link href={`/work/${project.slug}`} className="project-card">
      <div className="project-card__image">
        <img src={project.image} alt={project.title} />
        <div className="project-card__overlay">
          <span>View Project</span>
        </div>
      </div>
      <div className="project-card__info">
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__category">{project.category} / {project.year}</p>
      </div>
    </Link>
  );
}
