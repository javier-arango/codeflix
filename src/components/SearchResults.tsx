type Props = {
  query: string
}
export default function SearchResults({ query } : Props) {
  return (
    <section>
      <div className="container">
        <h1>Results for {query}</h1>
      </div>
    </section>
  )
}
