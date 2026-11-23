import React, { useRef, useState } from 'react';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  ariaLabel?: string;
}

export function MagneticButton({
  children,
  className = '',
  onClick,
  href,
  type = 'button',
  disabled = false,
  ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (disabled) return;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.16;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.16;
    setOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  const style: React.CSSProperties = {
    transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
    transition: offset.x === 0 && offset.y === 0
      ? 'transform 220ms cubic-bezier(0.16, 1, 0.3, 1)'
      : 'transform 80ms linear',
  };

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={style}
        aria-label={ariaLabel}
        className={`inline-flex items-center justify-center whitespace-nowrap shrink-0 cursor-pointer ${className}`}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
      aria-label={ariaLabel}
      className={`inline-flex items-center justify-center whitespace-nowrap shrink-0 cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
}
