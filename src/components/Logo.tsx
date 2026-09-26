export default function Logo({ size = 46 }: { size?: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo.png"
      width={size}
      height={size}
      alt="5mintcoffee"
      className="rounded-full shadow-sm shadow-brand-950/10"
    />
  );
}
