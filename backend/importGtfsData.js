import gtfs from "gtfs"
import config from "./custom-config.json"

// Function to fetch GTFS data
export const importGtfsData = async () => {
  try {
    gtfs
      .import(config)
      .then(() => {
        console.log("Import Successful")
        return mongoose.connection.close()
      })
      .catch((err) => {
        console.error(err)
      })
  } catch (err) {
    console.log("Error in importGtfsData: ", err)
  }
}
