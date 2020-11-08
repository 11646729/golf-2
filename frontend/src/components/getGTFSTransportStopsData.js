import axios from "axios"

export default async function getGTFSTransportStopsDataPoints() {
  const stopsUrl = "http://localhost:5000/api/gtfsTransport/stops"

  const result = await axios(stopsUrl)

  return result.data
}
