import axios from "axios"

export default async function getGTFSRouteData() {
  const shapesUrl = "http://localhost:5000/api/gtfsTransport/shapes"

  const result = await axios(shapesUrl)

  return result.data
}
