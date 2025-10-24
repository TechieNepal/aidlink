import { useEffect, useRef, useState } from 'react'

export default function Tabs({ tabs, initialIndex = 0, onChange }) {
  const [index, setIndex] = useState(initialIndex)
  const refs = useRef([])

  useEffect(() => { onChange?.(index) }, [index, onChange])

  function onKeyDown(e) {
    if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % tabs.length)
    if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + tabs.length) % tabs.length)
  }

  return (
    <div className="tabs">
      <div role="tablist" aria-label="Discover tabs" onKeyDown={onKeyDown}>
        {tabs.map((t, i) => (
          <button
            key={t.id}
            role="tab"
            ref={(el) => refs.current[i] = el}
            aria-selected={i === index}
            aria-controls={`panel-${t.id}`}
            id={`tab-${t.id}`}
            className={i === index ? 'active' : ''}
            onClick={() => setIndex(i)}
          >
            {t.label}
          </button>
        ))}
      </div>
      {tabs.map((t, i) => (
        <div
          key={t.id}
          role="tabpanel"
          id={`panel-${t.id}`}
          aria-labelledby={`tab-${t.id}`}
          hidden={i !== index}
        >
          {i === index ? t.content : null}
        </div>
      ))}
    </div>
  )
}