interface OliveTreeLogoProps {
  size?: number;
}

/** The product mark is deliberately SVG so it stays crisp in the compact header and login card. */
export function OliveTreeLogo({ size = 32 }: OliveTreeLogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M16 27V15M16 20C11.4 18.9 9.8 15.8 10 12.5M16 21.5C20.6 20.2 22.4 16.8 22 13" stroke="#FFFEF7" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="10.5" cy="10.5" r="4" fill="#D9F99D" /><circle cx="16" cy="7.5" r="4.3" fill="#ECFCCB" />
      <circle cx="22" cy="10.8" r="4" fill="#BEF264" /><circle cx="10.5" cy="15.5" r="3.3" fill="#A3E635" />
      <circle cx="22" cy="15.5" r="3.3" fill="#D9F99D" /><path d="M10.5 27H21.5" stroke="#FFFEF7" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}
