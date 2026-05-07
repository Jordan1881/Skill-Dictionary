/**
 * TOCList — shared table-of-contents list.
 * Used by both TOCPage (in-book) and TOCDrawer (portrait overlay).
 */
export default function TOCList({ grouped, currentSkill, onSelect }) {
  const domains = Object.keys(grouped).sort()

  return (
    <>
      {domains.map(domain => (
        <div key={domain} className="toc-domain">
          <div className="toc-domain-label">
            <span>{domain}</span>
            <span className="toc-domain-dots" />
          </div>
          <ul className="toc-list">
            {grouped[domain].map((skill, i) => (
              <li key={skill.name} className="toc-item">
                <span
                  className={`toc-link ${currentSkill === skill.name ? 'active' : ''}`}
                  onClick={() => onSelect(skill.name)}
                  title={skill.name}
                >
                  <span className="toc-link-name">{skill.name}</span>
                  <span className="toc-link-dots" />
                  <span className="toc-link-num">{i + 1}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  )
}
