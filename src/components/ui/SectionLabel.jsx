export function SectionLabel({ index, children, light = false }) {
  return <div className={`section-label${light ? ' section-label--light' : ''}`}><span>{index}</span><p>{children}</p></div>
}
