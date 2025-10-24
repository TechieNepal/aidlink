import { useId, useState } from 'react'

export default function Tooltip({ label, children }) {
  const [open, setOpen] = useState(false)
  const id = useId()
  return (
    <span className="tip-wrap"
      onMouseEnter={()=>setOpen(true)} onMouseLeave={()=>setOpen(false)}
      onFocus={()=>setOpen(true)} onBlur={()=>setOpen(false)}
    >
      <button
        type="button"
        className="tip-btn"
        aria-describedby={open ? id : undefined}
        onClick={()=>setOpen(!open)}
      >?</button>
      {open && (
        <span role="tooltip" id={id} className="tip-bubble">
          {label}
        </span>
      )}
      {children}
    </span>
  )
}