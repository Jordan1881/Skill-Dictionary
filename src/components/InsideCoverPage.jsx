import { BookMark } from './LogoSymbols'

export default function InsideCoverPage() {
  return (
    <div className="inside-cover">
      <div className="inside-cover-frame">
        <div className="inside-cover-badge">
          <BookMark size={96} includeNeural={true} idPrefix="icp-bm"/>
        </div>
        <div className="inside-cover-ornament">· ✦ ·</div>
        <h2 className="inside-cover-title">
          Jordan's<br />Skill Dictionary
        </h2>
        <div className="inside-cover-rule" />
        <p className="inside-cover-edition">First Edition</p>
        <p className="inside-cover-sub">
          A personal compendium of<br />craft, method, and expertise
        </p>
        <div className="inside-cover-gold-line" />
        <p className="inside-cover-latin">— Ars sine scientia nihil —</p>
        <div className="inside-cover-ornament">· ✦ ·</div>
      </div>
      <p className="inside-cover-footer">Turn the page to begin →</p>
    </div>
  )
}
