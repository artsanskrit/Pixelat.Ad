export default function SectionLabel({ num, name }) {
  return (
    <div className="section-label">
      <span className="section-num">{num}</span>
      <span className="section-line"></span>
      <span className="section-name glitch-text" data-text={name}>{name}</span>
    </div>
  );
}
