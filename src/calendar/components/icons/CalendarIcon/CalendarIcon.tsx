import type { MouseEventHandler } from "react";
import styles from './CalendarIcon.module.css'

type CalendarIconProps = {
  size?: string;
  secondDotPalette?: 1 | 2 | 3 | 4 | 5 | 6 | "primary" | null;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  ariaLabel?: string
  disabled?: boolean
}

export function CalendarIcon({
  size = "24",
  secondDotPalette = null,
  onClick,
  ariaLabel = "Calendar",
  disabled = false
}: CalendarIconProps) {
  const icon = (
    <svg viewBox="0 0 235 235" fill="none" width={size} height={size}>
      <rect x="27" y="27" width="180" height="180" rx="20"
        stroke="currentColor" strokeWidth="5" />
      <path d="M77 17v30M157 17v30"
        stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="M27 77h180" stroke="currentColor" strokeWidth="4" />
      <g fill="none" stroke="currentColor" strokeWidth={5}>
        <circle cx="70" cy="120" r="15" />

        <circle
          cx="117"
          cy="120"
          r={secondDotPalette === null ? "15" : "18"}
          fill={secondDotPalette === null
            ? "none"
            : secondDotPalette === "primary"
              ? "var(--calendar-primary)"
              : `var(--calendar-palette-${secondDotPalette})`}
          stroke={secondDotPalette === null ? "currentColor" : "noone"}
        />

        <circle cx="164" cy="120" r="15" />
        <circle cx="70" cy="166" r="15" />
        <circle cx="117" cy="166" r="15" />
        <circle cx="164" cy="166" r="15" />
      </g>
    </svg>
  )

  if (!onClick) {
    return icon
  }

  return (
    <button
      type="button"
      className={styles.iconButton}
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={disabled}
    >
      {icon}
    </button>
  )
}