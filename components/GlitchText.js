export default function GlitchText({ text, tag: Tag = 'span', className = '' }) {
  return (
    <Tag className={`glitch-text ${className}`} data-text={text}>
      {text}
    </Tag>
  );
}
