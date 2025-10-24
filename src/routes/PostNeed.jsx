export default function PostNeed(){
  return (
    <section className="container">
      <h1>Post a Need</h1>
      <p>In PR 2, this becomes a privacy-aware form to create a minimal JSON post you can share.</p>
      <ul>
        <li>Title (e.g., “Ride to clinic on Tuesday”)</li>
        <li>Category (Food, Education, Mobility, Tech help…)</li>
        <li>Details (no personal identifiers)</li>
        <li>Preferred contact hint (non-identifying)</li>
      </ul>
    </section>
  )
}