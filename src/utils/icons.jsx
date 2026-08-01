const paths = {
  diamond: (
    <>
      <path d="M6 3h12l4 6-10 12L2 9z" />
      <path d="M2 9h20M9 3l3 6-3 12M15 3l-3 6 3 12" />
    </>
  ),
  home: (
    <>
      <path d="M3 11l9-8 9 8" />
      <path d="M5 10v10h14V10" />
    </>
  ),
  pin: (
    <>
      <path d="M12 22s7-7.4 7-12.5A7 7 0 0 0 5 9.5C5 14.6 12 22 12 22z" />
      <circle cx="12" cy="9.5" r="2.3" />
    </>
  ),
  bag: (
    <>
      <path d="M6 8h12l1 13H5z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </>
  ),
  swap: <path d="M4 7h13l-3-3M20 17H7l3 3" />,
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 13a7.9 7.9 0 0 0 0-2l2-1.6-2-3.4-2.4.7a8 8 0 0 0-1.7-1L15 3h-4l-.3 2.7a8 8 0 0 0-1.7 1l-2.4-.7-2 3.4L6.6 11a7.9 7.9 0 0 0 0 2l-2 1.6 2 3.4 2.4-.7a8 8 0 0 0 1.7 1l.3 2.7h4l.3-2.7a8 8 0 0 0 1.7-1l2.4.7 2-3.4z" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
    </>
  ),
  bell: (
    <>
      <path d="M6 9a6 6 0 1 1 12 0c0 5 2 6 2 6H4s2-1 2-6" />
      <path d="M10 20a2 2 0 0 0 4 0" />
    </>
  ),
  store: (
    <>
      <path d="M4 9l1-5h14l1 5M4 9h16v11H4z" />
      <path d="M9 20v-6h6v6" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l8 3.5v5c0 5-3.4 8.5-8 9.5-4.6-1-8-4.5-8-9.5v-5z" />
      <path d="M9 12l2 2 4-4.5" />
    </>
  ),
  doc: (
    <>
      <path d="M7 3h7l4 4v14H7z" />
      <path d="M14 3v4h4M9 12h6M9 16h6" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" />
      <circle cx="18" cy="9" r="2.6" />
    </>
  ),
  coins: (
    <>
      <ellipse cx="12" cy="6" rx="7" ry="3" />
      <path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" />
    </>
  ),
  list: (
    <>
      <path d="M8 6h13M8 12h13M8 18h13" />
      <circle cx="3.5" cy="6" r="1" />
      <circle cx="3.5" cy="12" r="1" />
      <circle cx="3.5" cy="18" r="1" />
    </>
  ),
  heart: (
    <path d="M12 21s-7.5-4.6-10-9.3C.5 8 2.4 4.5 6 4a5.4 5.4 0 0 1 6 3 5.4 5.4 0 0 1 6-3c3.6.5 5.5 4 4 7.7C19.5 16.4 12 21 12 21z" />
  ),
  image: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="8.5" cy="9.5" r="1.6" />
      <path d="M21 16l-5.5-5.5L4 21" />
    </>
  ),
  percent: (
    <>
      <path d="M5 19L19 5" />
      <circle cx="7" cy="7" r="2.2" />
      <circle cx="17" cy="17" r="2.2" />
    </>
  ),
  check: <path d="M5 12.5l4.5 4.5L19 7" />,
  help: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.3 9a2.7 2.7 0 1 1 3.8 2.5c-.9.5-1.4 1-1.4 2M12 17h.01" />
    </>
  ),
}

export function Icon({ name, className = '' }) {
  return (
    <span className={className} style={{ display: 'inline-flex' }} aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        {paths[name] || paths.diamond}
      </svg>
    </span>
  )
}
