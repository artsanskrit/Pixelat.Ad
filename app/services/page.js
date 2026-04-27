import PageHero from "@/components/PageHero";
import ServiceCard from "@/components/ServiceCard";
import servicesData from "@/data/services.json";

export default function Services() {
  return (
    <>
      <PageHero 
        title="Our Capabilities" 
        subtitle="End-to-end digital solutions designed to elevate your brand and drive measurable growth."
        label="SERVICES" 
      />

      <section className="container">
        <div className="services-grid">
            {servicesData.map((service, index) => (
               <ServiceCard key={service.slug} service={service} index={index} />
            ))}
        </div>
      </section>
    </>
  );
}
