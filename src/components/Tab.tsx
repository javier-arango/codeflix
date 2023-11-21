type Props = {
  label: string
  content: React.JSX.Element
}

export default function Tab({ label, content }: Props) {
  return <div>{content}</div>
}
