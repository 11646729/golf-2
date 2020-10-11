import axios from "axios"

export default async function getGFTSTransportStopsDataPoints() {
  const stopsUrl = "http://localhost:5000/api/gtfsTransport/stops"

  const result = await axios(stopsUrl)

  return result.data
}
