export default function Marquee({ items }) {
  const doubled = [...items, ...items];
  return (
    <div className="services-marquee">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={i} className="marquee-item">{item} ◆</span>
        ))}
      </div>
    </div>
  );
}
