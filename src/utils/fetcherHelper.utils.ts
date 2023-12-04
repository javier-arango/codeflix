export const fetcher = (url: string, options?: RequestInit) =>
  fetch(url, options).then((res) => {
    if (!res.ok) {
      throw new Error('An error occurred while fetching the data.')
    }
    return res.json()
  })
