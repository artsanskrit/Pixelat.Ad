import PageHero from "@/components/PageHero";
import blogData from "@/data/blog.json";
import Link from "next/link";
import PixelBracket from "@/components/PixelBracket";

export default function Blog() {
  return (
    <>
      <PageHero 
        title="Field Notes" 
        subtitle="Insights, opinions, and deep dives into design, technology, and culture."
        label="BLOG" 
      />

      <section className="container">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
            {blogData.map((post) => (
                <article key={post.slug} style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '3rem', borderBottom: '1px solid var(--c-grid)', paddingBottom: '4rem' }}>
                    <div style={{ aspectRatio: '16/9', overflow: 'hidden' }}>
                        <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div>
                        <div style={{ fontFamily: 'var(--f-mono)', fontSize: '0.8rem', color: 'var(--c-red)', marginBottom: '1rem', display: 'flex', gap: '1rem' }}>
                            <PixelBracket>{post.category}</PixelBracket>
                            <span style={{ color: 'var(--c-white-muted)' }}>{post.date}</span>
                        </div>
                        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
                            <Link href="#" className="glitch-text" data-text={post.title}>
                                {post.title}
                            </Link>
                        </h2>
                        <p style={{ color: 'var(--c-white-dim)', marginBottom: '2rem', fontSize: '1.1rem' }}>
                            {post.excerpt}
                        </p>
                        <Link href="#" style={{ fontFamily: 'var(--f-mono)', fontSize: '0.9rem', color: 'var(--c-white)', borderBottom: '1px solid var(--c-red)', paddingBottom: '0.2rem' }}>
                            READ_ARTICLE →
                        </Link>
                    </div>
                </article>
            ))}
        </div>
      </section>
    </>
  );
}
