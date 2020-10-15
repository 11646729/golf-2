import axios from "axios"

export default async function get20WeatherDataPoints() {
  const url = "http://localhost:5000/api/weather/temperatureReadings"

  const result = await axios(url)

  // Only display data for the last 20 values
  result.data.splice(0, result.data.length - 20)

  return result.data
}