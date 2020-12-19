// not so unlike interface extensions (interface inheritance of combined interfaces) -- from TS Handbook
interface ErrorHandler {
  success: boolean
  error?: { message: string }
}

interface ArtworksData {
  artworks: { title: string }[]
}

interface ArtistsData {
  artists: { name: string }[]
}

// give both ArtworksData and ArtistsDate error-handling capability
type ArtistsResponse = ArtistsData & ErrorHandler
type ArtworksResponse = ArtworksData

const handleArtistsResponse = (res: ArtistsResponse) => {
  if (res.error) {
    console.error(res.error.message)
  }
  console.log(res.artists)
}

// similar handler for artworks
