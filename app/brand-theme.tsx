import type {CSSProperties} from 'react';
import type {DirectoryBrand} from '@/lib/brand-directory';

export function brandStyle(brand: DirectoryBrand): CSSProperties {
  const theme = brand.theme;
  return {
    '--brand-bg': theme.background,
    '--brand-surface': theme.surface,
    '--brand-ink': theme.ink,
    '--brand-accent': theme.accent,
    '--brand-secondary': theme.secondary,
    '--logo-filter': theme.logoMode === 'inverse' ? 'brightness(0) invert(1)' : theme.logoMode === 'dark' ? 'brightness(0)' : 'none',
    '--opaque-filter': theme.logoMode === 'inverse' ? 'invert(1)' : 'none',
    '--opaque-blend': theme.logoMode === 'inverse' ? 'screen' : 'multiply',
  } as CSSProperties;
}

/** Shared lightweight geometry; each brand supplies its own palette and composition. */
export function BrandBackdrop({brand, compact = false}: {brand: DirectoryBrand; compact?: boolean}) {
  return <div className={`brand-world brand-world--${brand.theme.scene}${compact ? ' brand-world--compact' : ''}`} aria-hidden="true">
    <span className="brand-world-halo" />
    <span className="brand-world-shape shape-one" />
    <span className="brand-world-shape shape-two" />
    <span className="brand-world-shape shape-three" />
    <span className="brand-world-floor" />
    <span className="brand-world-grain" />
  </div>;
}
