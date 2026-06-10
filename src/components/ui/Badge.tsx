type BadgeVariant = 'pill' | 'square';
type BadgeColor = 'accent' | 'primary' | 'default';

interface BadgeProps {
  variant?: BadgeVariant;
  color?: BadgeColor;
  children: React.ReactNode;
  className?: string;
}

const colors: Record<BadgeColor, string> = {
  accent:  'bg-accent/15 text-accent-dark border border-accent/30',
  primary: 'bg-primary text-white',
  default: 'bg-primary-tint text-primary border border-border',
};

export default function Badge({
  variant = 'pill',
  color = 'default',
  children,
  className = '',
}: BadgeProps) {
  const shape = variant === 'pill' ? 'rounded-full px-3 py-0.5' : 'rounded-[var(--radius)] px-2 py-0.5';
  return (
    <span
      className={`inline-block text-xs font-semibold uppercase tracking-wide ${shape} ${colors[color]} ${className}`}
    >
      {children}
    </span>
  );
}
