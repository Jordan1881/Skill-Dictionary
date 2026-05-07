import { useState } from 'react'
import Cover from './components/Cover'
import Book from './components/Book'
import { useSkills } from './hooks/useSkills'
import { useBookSize } from './hooks/useBookSize'

export default function App() {
  const [isOpen, setIsOpen] = useState(false)
  const { skills, grouped, loading, error } = useSkills()
  const { portrait, pageW, pageH } = useBookSize()

  const bookW = portrait ? pageW : pageW * 2

  // CSS custom properties flow down to Cover, Book, and all page children
  const sizeVars = {
    '--page-w': `${pageW}px`,
    '--page-h': `${pageH}px`,
    '--book-w': `${bookW}px`,
  }

  return (
    <div className="app">
      <div className="scene" style={sizeVars}>
        {!isOpen && <Cover onOpen={() => setIsOpen(true)} />}

        <div className={`book-wrapper ${isOpen ? 'book-visible' : ''}`}>
          {loading && <LoadingSkeleton />}
          {error   && <ErrorPage message={error} />}
          {!loading && !error && skills.length > 0 && (
            <Book
              skills={skills}
              grouped={grouped}
              portrait={portrait}
              pageW={pageW}
              pageH={pageH}
            />
          )}
        </div>
      </div>
    </div>
  )
}

function LoadingSkeleton() {
  return (
    <div className="book-stage skeleton-book">
      <div className="skeleton-page" />
      <div className="skeleton-page" />
    </div>
  )
}

function ErrorPage({ message }) {
  return (
    <div className="book-stage error-book">
      <p className="error-title">⚠ Could not load skills</p>
      <p className="error-detail">{message}</p>
    </div>
  )
}
