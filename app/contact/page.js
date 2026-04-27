import PageHero from "@/components/PageHero";
import BtnGlitch from "@/components/BtnGlitch";
import siteData from "@/data/site.json";

export default function Contact() {
  return (
    <>
      <PageHero 
        title="Get In Touch" 
        subtitle="Ready to start your next project? Drop us a line and let's create something extraordinary together."
        label="CONTACT_US" 
      />

      <section className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '6rem' }}>
            
            {/* Contact Info Sidebar */}
            <div>
                <div style={{ marginBottom: '3rem' }}>
                    <h4 style={{ fontFamily: 'var(--f-mono)', color: 'var(--c-red)', marginBottom: '1rem' }}>[ EMAIL ]</h4>
                    <p style={{ fontSize: '1.2rem' }}>{siteData.email}</p>
                </div>
                <div style={{ marginBottom: '3rem' }}>
                    <h4 style={{ fontFamily: 'var(--f-mono)', color: 'var(--c-red)', marginBottom: '1rem' }}>[ CALL ]</h4>
                    <p style={{ fontSize: '1.2rem' }}>{siteData.phone}</p>
                </div>
                <div style={{ marginBottom: '3rem' }}>
                    <h4 style={{ fontFamily: 'var(--f-mono)', color: 'var(--c-red)', marginBottom: '1rem' }}>[ VISIT ]</h4>
                    <p style={{ fontSize: '1.2rem', color: 'var(--c-white-dim)', lineHeight: 1.6 }}>{siteData.address}<br/>New York, NY 10001</p>
                </div>
            </div>

            {/* Contact Form */}
            <div style={{ background: 'rgba(17, 17, 26, 0.2)', padding: '3rem', border: '1px solid var(--c-grid)' }}>
                <form style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                        <div>
                            <label style={{ display: 'block', fontFamily: 'var(--f-mono)', fontSize: '0.8rem', color: 'var(--c-white-dim)', marginBottom: '0.5rem' }}>NAME</label>
                            <input type="text" style={{ width: '100%', background: 'var(--c-bg)', border: '1px solid var(--c-grid)', padding: '1rem', color: 'var(--c-white)', outline: 'none' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontFamily: 'var(--f-mono)', fontSize: '0.8rem', color: 'var(--c-white-dim)', marginBottom: '0.5rem' }}>EMAIL</label>
                            <input type="email" style={{ width: '100%', background: 'var(--c-bg)', border: '1px solid var(--c-grid)', padding: '1rem', color: 'var(--c-white)', outline: 'none' }} />
                        </div>
                    </div>
                    <div>
                        <label style={{ display: 'block', fontFamily: 'var(--f-mono)', fontSize: '0.8rem', color: 'var(--c-white-dim)', marginBottom: '0.5rem' }}>SUBJECT</label>
                        <select style={{ width: '100%', background: 'var(--c-bg)', border: '1px solid var(--c-grid)', padding: '1rem', color: 'var(--c-white)', outline: 'none' }}>
                            <option>New Project Inquiry</option>
                            <option>Job Application</option>
                            <option>Press / Media</option>
                            <option>Other</option>
                        </select>
                    </div>
                    <div>
                        <label style={{ display: 'block', fontFamily: 'var(--f-mono)', fontSize: '0.8rem', color: 'var(--c-white-dim)', marginBottom: '0.5rem' }}>MESSAGE</label>
                        <textarea rows={6} style={{ width: '100%', background: 'var(--c-bg)', border: '1px solid var(--c-grid)', padding: '1rem', color: 'var(--c-white)', outline: 'none', resize: 'vertical' }}></textarea>
                    </div>
                    <div>
                        <BtnGlitch text="SEND MESSAGE" large />
                    </div>
                </form>
            </div>
        </div>
      </section>
    </>
  );
}
