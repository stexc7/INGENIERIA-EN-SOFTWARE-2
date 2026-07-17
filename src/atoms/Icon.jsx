const PATHS = {
  home: 'M4 11.5 12 4l8 7.5M6 10v9a1 1 0 0 0 1 1h4v-6h2v6h4a1 1 0 0 0 1-1v-9',
  calendar:
    'M7 3v3M17 3v3M4 8h16M5 6h14a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Z',
  pill: 'M8 3a5 5 0 0 1 5 5v8a5 5 0 0 1-10 0V8a5 5 0 0 1 5-5ZM4 10h8',
  bell: 'M6 10a6 6 0 0 1 12 0v4l1.5 3h-15L6 14Zm3.5 9a2.5 2.5 0 0 0 5 0',
  user: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8a7 7 0 0 1 14 0',
  'chevron-right': 'm9 6 6 6-6 6',
  clock: 'M12 8v4l3 2M20 12a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z',
  location: 'M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11Zm0-9a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z',
  'wifi-off':
    'M2 8.5c2.4-2 5.5-3.2 8.8-3.4M13.6 5.3c2.3.4 4.5 1.5 6.4 3.2M5.5 12.5a10 10 0 0 1 4-2.1M14.7 10.6a10 10 0 0 1 3.8 2M8.5 16.3a5 5 0 0 1 3.3-1.3c1 0 2 .3 2.8.9M12 20h.01M2 2l20 20',
  check: 'm5 13 4 4L19 7',
}

function Icon({ name, size = 24, ...rest }) {
  const d = PATHS[name]
  if (!d) return null
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <path d={d} />
    </svg>
  )
}

export default Icon
