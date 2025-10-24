import Tooltip from './Tooltip'

export default function PrivacyTips(){
  return (
    <div className="callout info" style={{marginBottom:'.75rem'}}>
      <strong>Share safely.</strong> Avoid email, phone, exact address, or links in public posts.
      <span style={{marginLeft:'.5rem'}}>
        <Tooltip label="Why? Public info can be scraped or misused. Keep contact hints indirect (e.g., 'coordinate via community admin').">
          {/* empty child; we just show the ? button */}
        </Tooltip>
      </span>
    </div>
  )
}