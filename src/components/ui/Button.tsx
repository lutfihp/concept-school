interface ButtonProps {
  variant?: 'accent' | 'primary' | 'outline' | 'outline-light' | 'link-arrow';
  size?: 'sm' | 'md';
  href?: string;
  className?: string;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
  accent:          'bg-accent text-primary hover:bg-accent-dark',
  primary:         'bg-primary text-white hover:bg-primary-dark',
  outline:         'border border-primary text-primary hover:bg-primary-tint',
  'outline-light': 'border border-white text-white hover:bg-white/10',
  'link-arrow':    'text-primary hover:text-primary-dark underline-offset-2 hover:underline',
};

const sizes: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'px-4 py-2 text-sm gap-1.5',
  md: 'px-6 py-3 text-sm gap-2',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  href,
  className = '',
  children,
  onClick,
  type = 'button',
  disabled,
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center font-semibold rounded-[var(--radius)] transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent';
  const sizeClass = variant !== 'link-arrow' ? sizes[size] : '';
  const cls = `${base} ${variants[variant]} ${sizeClass} ${className}`.trim();

  if (href) {
    return (
      <a href={href} className={cls} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} disabled={disabled} onClick={onClick} className={cls}>
      {children}
    </button>
  );
}
