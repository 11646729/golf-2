import axios from "axios"

export async function get20WeatherDataPoints(url) {
  const result = await axios(url)

  // Only display data for the last 20 values
  return result.data.splice(0, result.data.length - 20)

  // return result.data
}

// Function to remove duplicates from array
const removeDuplicates = (originalArray, prop) => {
  return [...new Map(originalArray.map((item) => [item[prop], item])).values()]
}

export async function getGolfCoursesData(url) {
  const result = await axios(url)
  return result.data
}

// Function to fetch Unique Gtfs Route data
export async function getGtfsRoutesData(url) {
  const result = await axios(url)
  return removeDuplicates(result.data, "routeNumber")
}

// Function to fetch Unique Gtfs Stops data
export async function getGtfsStopsData(url) {
  const result = await axios(url)
  return removeDuplicates(result.data, "coordsString")
}

// Function to fetch Gtfs Stops data
export async function getGtfsData(url) {
  const result = await axios(url)
  return result.data
}

// Function to remove Gtfs data fields routeVisible === false
export function getDisplayGtfsData(originalArray) {
  let displayArray = []
  let index = 0
  do {
    if (originalArray[index].routeVisible === true) {
      displayArray.push(originalArray[index])
    }
    index++
  } while (index < originalArray.length)
  return displayArray
}

export { removeDuplicates as default }
