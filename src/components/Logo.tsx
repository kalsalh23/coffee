export default function Logo({ size = 42 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-label="5mintcoffee">
      <rect width="48" height="48" rx="14" fill="#4e5b39" />
      <path d="M16 14c0-2.4 1.6-2.6 1.6-5" stroke="#d6ddc2" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <path d="M24 14c0-2.4 1.6-2.6 1.6-5" stroke="#d6ddc2" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <path d="M32 14c0-2.4 1.6-2.6 1.6-5" stroke="#d6ddc2" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <text x="24" y="38" textAnchor="middle" fontSize="24" fontWeight="800" fill="#faf9f3" fontFamily="Cairo, sans-serif">
        5
      </text>
    </svg>
  );
}
