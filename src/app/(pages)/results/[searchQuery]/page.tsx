import NavBar from '@components/NavBar'

// async function getResults(query: string) {
//   const response = await fetch('/api/search', {
//     method: 'POST',
//     body: JSON.stringify({query: query}),
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   })

//   console.log(response)

//   if (!response || !response.ok) {
//     return null
//   }

//   const data: CategoryResponse = await response.json()

//   return data
// }

export default async function ResultsPage({ params }: { params: { searchQuery: string } }) {
  // const { searchQuery } = params
  // const data = await getResults(searchQuery)

  // if (!data) {
  //   return null
  // }

  // console.log(data)
  return (
    <>
      <NavBar />
    </>
  )
}
