import React from 'react';
import { sensoryAudio } from '../../audio/SensoryAudioEngine';

export function SensoryButton({
  children,
  onClick,
  variant = 'primary', // 'primary', 'secondary', 'success', 'accent'
  size = 'normal',      // 'normal', 'large'
  ariaLabel,
  className = '',
  disabled = false,
  ...props
}) {
  const handleClick = (e) => {
    if (disabled) return;
    sensoryAudio.playClickSound();
    if (onClick) onClick(e);
  };

  const variantClass = variant !== 'primary' ? ` ${variant}` : '';
  const sizeClass = size === 'large' ? ' large' : '';

  return (
    <button
      className={`sensory-button${variantClass}${sizeClass} ${className}`}
      onClick={handleClick}
      disabled={disabled}
      aria-label={ariaLabel || (typeof children === 'string' ? children : 'Botão Tagarela')}
      {...props}
    >
      {children}
    </button>
  );
}
