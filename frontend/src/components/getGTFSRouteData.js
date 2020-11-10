import axios from "axios"

export default async function getGTFSRouteData() {
  const routeUrl = "http://localhost:5000/api/gtfsTransport/route"
  const result = await axios.get(routeUrl)
  return result.data
}
