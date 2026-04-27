import Link from 'next/link';

export default function BtnOutlineGlitch({ href, text, className = '' }) {
  const inner = (
    <>
      <span className="btn-outline-glitch__text">{text}</span>
      <span className="btn-outline-glitch__corner btn-outline-glitch__corner--tl"></span>
      <span className="btn-outline-glitch__corner btn-outline-glitch__corner--tr"></span>
      <span className="btn-outline-glitch__corner btn-outline-glitch__corner--bl"></span>
      <span className="btn-outline-glitch__corner btn-outline-glitch__corner--br"></span>
    </>
  );

  if (href) {
    return <Link href={href} className={`btn-outline-glitch ${className}`}>{inner}</Link>;
  }

  return <button className={`btn-outline-glitch ${className}`}>{inner}</button>;
}
