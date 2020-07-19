import gtfs from "gtfs"
import mongoose from "mongoose"
import config from "./custom-config.json"

mongoose.connect(config.mongoUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
})

// Function to fetch weather data from the Dark Skies website
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
    console.log("Error in fetchDarkSkiesData: ", err)
  }
}
