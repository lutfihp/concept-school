type CrestSize = 'sm' | 'md' | 'lg';

const SIZES: Record<CrestSize, { w: number; h: number; mono: string; sub: string }> = {
  sm: { w: 40, h: 46, mono: 'text-[10px]', sub: 'text-[6px]' },
  md: { w: 52, h: 60, mono: 'text-xs',     sub: 'text-[7px]' },
  lg: { w: 64, h: 74, mono: 'text-sm',     sub: 'text-[8px]' },
};

export default function Crest({ size = 'md' }: { size?: CrestSize }) {
  const { w, h, mono, sub } = SIZES[size];
  return (
    <div
      className="flex-shrink-0"
      style={{
        width: w,
        height: h,
        filter: 'drop-shadow(0 0 1.5px var(--color-accent))',
      }}
      aria-hidden="true"
    >
      <div
        className="w-full h-full bg-primary flex flex-col items-center justify-center gap-0.5 pt-1"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 70%, 50% 100%, 0 70%)' }}
      >
        <span className={`font-heading font-bold text-accent leading-none ${mono}`}>BPU</span>
        <span className={`font-body font-medium text-white/75 tracking-widest uppercase leading-none ${sub}`}>
          EST. 1998
        </span>
      </div>
    </div>
  );
}
