import { scoreLabel } from '../utils/moderation'

export default function RedFlagList({ pii = [], scam = [], score = 0 }){
  const label = scoreLabel(score)
  const color = score >= 75 ? '#b00020' : score >= 40 ? '#a15c00' : '#1c7c54'

  return (
    <div className="callout subtle" style={{borderColor:color}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline'}}>
        <strong>Safety check:</strong>
        <span style={{color}}>{label} · Score {score}</span>
      </div>
      {(pii.length + scam.length) === 0 ? (
        <p className="muted" style={{margin:'.25rem 0 0'}}>No obvious red flags found.</p>
      ) : (
        <ul style={{margin:'.5rem 0 0 1rem'}}>
          {pii.map((f,i)=><li key={`p-${i}`}>{f}. Consider removing from public text.</li>)}
          {scam.map((f,i)=><li key={`s-${i}`}>{f}. Be cautious with requests for money or codes.</li>)}
        </ul>
      )}
    </div>
  )
}