import axios from "axios"

export default async function getGTFSRouteFilesList() {
  const filePath = "http://localhost:5000/api/gtfsTransport/filenames"
  let files = await axios.get(filePath)
  return files.data
}
