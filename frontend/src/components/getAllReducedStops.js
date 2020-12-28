import axios from "axios"

export default async function getAllReducedStops() {
  const stopsUrl = "http://localhost:5000/api/gtfsTransport/reducedStops"
  const result = await axios.get(stopsUrl)
  return result.data
}
