export default function PixelBracket({ children }) {
  return (
    <span className="pixel-bracket">
      <span className="bracket-left">[</span>
      {children}
      <span className="bracket-right">]</span>
    </span>
  );
}
