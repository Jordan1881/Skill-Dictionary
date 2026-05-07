import TOCList from './TOCList'

export default function TOCPage({ grouped, currentSkill, skillCount, onSelect }) {
  return (
    <div className="toc-page">
      <div className="toc-header">
        <span className="toc-header-ornament">❧</span>
        <span>Table of Contents</span>
        <span className="toc-header-ornament">❧</span>
      </div>
      <div className="toc-rule" />

      <div className="toc-scroll">
        <TOCList grouped={grouped} currentSkill={currentSkill} onSelect={onSelect} />
      </div>

      <div className="toc-footer">
        {skillCount} entries · drag pages or click to navigate
      </div>
    </div>
  )
}
