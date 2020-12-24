import axios from "axios"
import { selectOnlyGeojsonFiles } from "./selectOnlyGeojsonFiles"

// Function to fetch all the GeoJson route filenames in a directory irrespective of trip direction
export const createReducedRoutes = async () => {
  console.log("Fetching list of filenames in the geojson directory")

  const filePath = "http://localhost:5000/api/gtfsTransport/filenames"
  const busRoutesResult = await axios.get(filePath)

  selectOnlyGeojsonFiles(busRoutesResult.data)
}
