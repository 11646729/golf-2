import axios from "axios"
import { saveTemperatureReading } from "./controllers/weatherControllers/v1/weatherController"

// -------------------------------------------------------
// Fetch weather data from the Dark Skies website
// Path:
// -------------------------------------------------------
export const getAndSaveDarkSkiesData = async () => {
  // build Dark Skies Url
  const darkSkiesUrl =
    process.env.DARK_SKY_URL +
    process.env.DARK_SKY_WEATHER_API_KEY +
    "/" +
    process.env.HOME_LATITUDE +
    "," +
    process.env.HOME_LONGITUDE

  try {
    // fetch data from the url endpoint and return it
    const data = await axios.get(darkSkiesUrl)

    // Reformat data into Transient object
    const temperatureReading = [
      process.env.DATABASE_VERSION,
      data.data.currently.time,
      "Home",
      data.data.currently.temperature,
      process.env.HOME_LATITUDE,
      process.env.HOME_LONGITUDE,
    ]

    // Save data in the Database
    saveTemperatureReading(temperatureReading)

    return temperatureReading
  } catch (err) {
    console.log("Error in getAndSaveDarkSkiesData: ", err)
  }
}

// -------------------------------------------------------
// Socket Emit weather data to be consumed by the client
// Path:
// -------------------------------------------------------
export const emitDarkSkiesData = async (socket, darkSkiesData) => {
  // Guard clauses
  if (socket == null) return
  if (darkSkiesData == null) return

  try {
    await socket.emit("DataFromDarkSkiesAPI", darkSkiesData)
  } catch (err) {
    console.log("Error in emitDarkSkiesData: ", err)
  }
}
