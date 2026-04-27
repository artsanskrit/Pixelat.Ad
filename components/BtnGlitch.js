import Link from 'next/link';

export default function BtnGlitch({ href, text, className = '', large = false }) {
  const classes = `btn-glitch ${large ? 'btn-glitch--lg' : ''} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} data-text={text}>
        <span>{text}</span>
      </Link>
    );
  }

  return (
    <button className={classes} data-text={text}>
      <span>{text}</span>
    </button>
  );
}
