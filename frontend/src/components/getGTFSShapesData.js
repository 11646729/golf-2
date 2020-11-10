import axios from "axios"

export default async function getGTFSShapesData() {
  const shapesUrl = "http://localhost:5000/api/gtfsTransport/shapes"
  const result = await axios.get(shapesUrl)
  return result.data
}
