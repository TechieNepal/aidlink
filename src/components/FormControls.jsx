export function TextInput({ id, label, value, onChange, placeholder, error, hint, required=false }) {
  return (
    <div style={{marginBottom: '0.75rem'}}>
      <label htmlFor={id}><strong>{label}</strong>{required ? ' *' : ''}</label><br />
      <input
        id={id}
        type="text"
        value={value}
        onChange={(e)=>onChange(e.target.value)}
        placeholder={placeholder}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : undefined}
        style={inputStyle(error)}
      />
      {hint ? <div className="muted" style={{fontSize:'.9rem'}}>{hint}</div> : null}
      {error ? <div id={`${id}-err`} role="alert" style={{color:'#b00020'}}>{error}</div> : null}
    </div>
  )
}

export function Select({ id, label, value, onChange, options, error, required=false }) {
  return (
    <div style={{marginBottom: '0.75rem'}}>
      <label htmlFor={id}><strong>{label}</strong>{required ? ' *' : ''}</label><br />
      <select
        id={id}
        value={value}
        onChange={(e)=>onChange(e.target.value)}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : undefined}
        style={selectStyle(error)}
      >
        <option value="">Select…</option>
        {options.map(opt => <option key={opt} value={opt}>{cap(opt)}</option>)}
      </select>
      {error ? <div id={`${id}-err`} role="alert" style={{color:'#b00020'}}>{error}</div> : null}
    </div>
  )
}

export function TextArea({ id, label, value, onChange, placeholder, rows=5, error, hint, required=false }) {
  return (
    <div style={{marginBottom: '0.75rem'}}>
      <label htmlFor={id}><strong>{label}</strong>{required ? ' *' : ''}</label><br />
      <textarea
        id={id}
        value={value}
        onChange={(e)=>onChange(e.target.value)}
        rows={rows}
        placeholder={placeholder}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : undefined}
        style={areaStyle(error)}
      />
      {hint ? <div className="muted" style={{fontSize:'.9rem'}}>{hint}</div> : null}
      {error ? <div id={`${id}-err`} role="alert" style={{color:'#b00020'}}>{error}</div> : null}
    </div>
  )
}

function cap(s){ return s.charAt(0).toUpperCase() + s.slice(1) }
function border(error){ return error ? '1px solid #b00020' : '1px solid #d0d7de' }
function inputStyle(err){ return ({ padding:'.6rem .8rem', border:border(err), borderRadius:'.6rem', width:'100%' }) }
function selectStyle(err){ return ({ padding:'.55rem .8rem', border:border(err), borderRadius:'.6rem', width:'100%' }) }
function areaStyle(err){ return ({ padding:'.6rem .8rem', border:border(err), borderRadius:'.6rem', width:'100%', resize:'vertical' }) }