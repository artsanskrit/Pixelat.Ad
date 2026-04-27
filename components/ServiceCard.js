import PixelBracket from './PixelBracket';

export default function ServiceCard({ service, index }) {
  const numPad = (num) => String(num).padStart(2, '0');
  
  return (
    <div className="service-card">
      <div className="service-card__header">
        <span className="service-card__index"><PixelBracket>{numPad(index + 1)}</PixelBracket></span>
        <span className="service-card__icon">{service.icon}</span>
      </div>
      <h3 className="service-card__title">{service.title}</h3>
      <p className="service-card__desc">{service.description}</p>
      <ul className="service-card__features">
        {service.features.map((feature, i) => (
          <li key={i}>{feature}</li>
        ))}
      </ul>
    </div>
  );
}
