import Link from 'next/link';
import Image from 'next/image';
import PixelBracket from './PixelBracket';

export default function Footer({ siteData }) {
  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-grid">
          
          <div className="footer-brand">
            <div className="footer-logo">
              <Image src="/logo.png" alt="Pixelat.Ad" width={160} height={40} style={{ height: '36px', width: 'auto', objectFit: 'contain' }} />
            </div>
            <p className="footer-desc">Creative Ideas.<br/>Pixel Perfect Execution.</p>
            <div className="system-status">
              <span className="status-dot"></span>
              SYSTEM_ONLINE
            </div>
          </div>
          
          <div className="footer-links">
            <h4 className="footer-heading"><PixelBracket>NAVIGATION</PixelBracket></h4>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/work">Work</Link></li>
              <li><Link href="/services">Services</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
          
          <div className="footer-links">
            <h4 className="footer-heading"><PixelBracket>SOCIALS</PixelBracket></h4>
            <ul>
              <li><a href={siteData?.socials?.instagram} target="_blank" rel="noreferrer">Instagram</a></li>
              <li><a href={siteData?.socials?.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></li>
              <li><a href={siteData?.socials?.dribbble} target="_blank" rel="noreferrer">Dribbble</a></li>
              <li><a href={siteData?.socials?.behance} target="_blank" rel="noreferrer">Behance</a></li>
            </ul>
          </div>
          
          <div className="footer-contact">
            <h4 className="footer-heading"><PixelBracket>CONTACT</PixelBracket></h4>
            <div className="footer-details">
              <p>{siteData?.email || "hello@pixelatad.com"}</p>
              <p>{siteData?.phone || "+1 (234) 567-890"}</p>
              <p>{siteData?.address || "Design District, NY"}</p>
            </div>
          </div>

        </div>

        <div className="footer-bottom">
          <p className="copyright">&copy; {new Date().getFullYear()} PIXELAT AD. ALL_RIGHTS_RESERVED.</p>
          <div className="footer-policies">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
