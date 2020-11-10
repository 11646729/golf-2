import axios from "axios"

export default async function getGTFSStopsData() {
  const stopsUrl = "http://localhost:5000/api/gtfsTransport/stops"
  const result = await axios.get(stopsUrl)
  return result.data
}
