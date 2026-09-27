export function Arrow({ direction = 'right' }) {
  const path = direction === 'down' ? 'M12 4v16m0 0 6-6m-6 6-6-6' : 'M4 12h16m0 0-6-6m6 6-6 6'
  return <svg className="arrow-icon" viewBox="0 0 24 24" aria-hidden="true"><path d={path} fill="none" stroke="currentColor" strokeWidth="1.6" /></svg>
}
