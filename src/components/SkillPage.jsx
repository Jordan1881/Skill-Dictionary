import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const ROMAN = [
  [1000,'M'],[900,'CM'],[500,'D'],[400,'CD'],
  [100,'C'],[90,'XC'],[50,'L'],[40,'XL'],
  [10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']
]
function toRoman(n) {
  let r = ''
  for (const [v, s] of ROMAN) { while (n >= v) { r += s; n -= v } }
  return r
}

const mdComponents = {
  table: ({ children }) => (
    <div className="table-wrap"><table>{children}</table></div>
  ),
  // Demote h1 → h2 since skill name is already the heading
  h1: ({ children }) => <h2>{children}</h2>,
}

const SkillPage = React.memo(function SkillPage({ skill, pageNumber }) {
  if (!skill) return null

  return (
    // No flexbox — explicit heights so content scroll works inside react-pageflip
    <div className="sp-root">
      <div className="sp-header">
        <div className="sp-name">{skill.name}</div>
        <div className="sp-domain">{skill.domain}</div>
        <div className="sp-rule" />
      </div>

      {/* Explicit height = page(620) - header(~110) - footer(~36) - padding(~40) */}
      <div className="sp-body">
        <div className="skill-md">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
            {skill.content}
          </ReactMarkdown>
        </div>
      </div>

      <div className="sp-footer">
        <span className="sp-page-num">{toRoman(pageNumber)}</span>
      </div>
    </div>
  )
})

export default SkillPage
