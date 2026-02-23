export function Logo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 280 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Дом Плитки Cersanit"
    >
      {/* House with tiles icon */}
      <g>
        {/* Roof - dark blue */}
        <path
          d="M10 25L25 15L35 20V18L25 12L10 22V25Z"
          fill="#1e3a8a"
        />
        <path
          d="M25 15L40 25V22L25 12L35 18V20L25 15Z"
          fill="#2563eb"
        />
        
        {/* House body - light blue/gray tiles */}
        <rect x="12" y="25" width="8" height="8" fill="#93c5fd" />
        <rect x="20" y="25" width="8" height="8" fill="#bfdbfe" />
        <rect x="28" y="25" width="8" height="8" fill="#93c5fd" />
        
        <rect x="12" y="33" width="8" height="8" fill="#bfdbfe" />
        <rect x="20" y="33" width="8" height="8" fill="#93c5fd" />
        <rect x="28" y="33" width="8" height="8" fill="#bfdbfe" />
        
        {/* Window tiles - accent */}
        <rect x="14" y="27" width="4" height="4" fill="#1e40af" opacity="0.3" />
        <rect x="18" y="27" width="4" height="4" fill="#1e40af" opacity="0.3" />
        <rect x="14" y="31" width="4" height="4" fill="#1e40af" opacity="0.3" />
        <rect x="18" y="31" width="4" height="4" fill="#1e40af" opacity="0.3" />
        
        {/* Wave decoration - blue gradient */}
        <path
          d="M10 42Q17.5 40 25 42T40 42"
          stroke="#2563eb"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M10 45Q17.5 43 25 45T40 45"
          stroke="#3b82f6"
          strokeWidth="1.5"
          fill="none"
        />
      </g>

      {/* Text: ДОМ ПЛИТКИ */}
      <text
        x="50"
        y="28"
        fontSize="14"
        fontWeight="600"
        fill="#64748b"
        letterSpacing="1"
      >
        ДОМ ПЛИТКИ
      </text>

      {/* Text: CERSANIT - bold blue */}
      <text
        x="50"
        y="48"
        fontSize="22"
        fontWeight="700"
        fill="#1e3a8a"
        letterSpacing="0.5"
      >
        CERSANIT
      </text>
    </svg>
  )
}
