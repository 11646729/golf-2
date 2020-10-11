import axios from "axios"

export default async function getGFTSTransportShapesData() {
  let shapesUrl = "http://localhost:5000/api/gtfsTransport/shapes"

  const result = await axios(shapesUrl)

  return result.data
}
