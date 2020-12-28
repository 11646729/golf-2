import axios from "axios"

export default async function getAllReducedRoutes() {
  const routesUrl = "http://localhost:5000/api/gtfsTransport/reducedRoutes"
  const result = await axios.get(routesUrl)
  return result.data
}
