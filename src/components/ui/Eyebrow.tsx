export default function Eyebrow({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`inline-flex items-center gap-2 text-ink-muted text-xs font-semibold uppercase tracking-widest ${className}`}
    >
      <span className="inline-block w-6 h-0.5 bg-accent flex-shrink-0" aria-hidden="true" />
      {children}
    </p>
  );
}
