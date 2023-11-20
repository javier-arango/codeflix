export default function Tab({ label, content }) {
  return (
    <div>
      <h3>{label}</h3>
      <div>{content}</div>
    </div>
  )
}