import Image from 'next/image';
import PixelBracket from './PixelBracket';

export default function TeamCard({ member }) {
  return (
    <div className="team-card">
      <div className="team-card__image-container">
        <img src={member.image} alt={member.name} className="team-card__image" />
        <div className="team-card__overlay">
            <p className="team-card__bio">{member.bio}</p>
        </div>
      </div>
      <div className="team-card__info">
        <h4 className="team-card__name">{member.name}</h4>
        <p className="team-card__role"><PixelBracket>{member.role}</PixelBracket></p>
      </div>
    </div>
  );
}
