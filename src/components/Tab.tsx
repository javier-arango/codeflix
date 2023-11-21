type Props = {
  label: string
  content: React.JSX.Element
}

export default function Tab({ label, content }: Props) {
  return (
    <div>
      <h3>{label}</h3>
      <div>{content}</div>
    </div>
  )
}