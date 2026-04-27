import PageHero from "@/components/PageHero";
import ProjectCard from "@/components/ProjectCard";
import projectsData from "@/data/projects.json";

export default function Work() {
  return (
    <>
      <PageHero 
        title="Selected Works" 
        subtitle="A showcase of our recent projects across branding, web design, and digital marketing."
        label="CASE_STUDIES" 
      />

      <section className="container">
        <div className="projects-grid">
            {projectsData.map((project) => (
                <ProjectCard key={project.slug} project={project} />
            ))}
        </div>
      </section>
    </>
  );
}
