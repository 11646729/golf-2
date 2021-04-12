import axios from "axios"

export async function get20WeatherDataPoints(url) {
  const result = await axios(url)

  // Only display data for the last 20 values
  return result.data.splice(0, result.data.length - 20)
}

export async function getGolfCoursesData(url) {
  const result = await axios(url, {
    // params: {
    //   agencyId: "MET",
    // },
  })
  return result.data
}

// Function to fetch Unique Gtfs Route data
export async function getRoutesData(url) {
  const result = await axios(url, {
    // params: {
    //   agencyId: "MET",
    // },
  })

  // Filter out Duplicate Routes here
  let sortedDisplayArray = removeDuplicates(result.data, "routeNumber")

  // Sort Routes code here
  let res = []
  sortedDisplayArray.sort((a, b) => (a.routeNumber > b.routeNumber ? 1 : -1))
  res[0] = sortedDisplayArray

  return res
}

// Function to fetch Unique Gtfs Stops data
export async function getStopsData(url) {
  const result = await axios(url, {
    // params: {
    //   agencyId: "HSR",
    // },
  })
  return removeDuplicates(result.data, "coordsString")
}

// Function to fetch Unique Shapes data
export async function getShapesData(url) {
  const result = await axios(url, {
    // params: {
    //   agencyId: "MET",
    // },
  })
  return result.data
  // removeDuplicates(result.data, "routeNumber")
}

// Function to remove Gtfs data fields routeVisible === false
export function getDisplayData(originalArray) {
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

// Function to remove duplicates from array
const removeDuplicates = (originalArray, prop) => {
  return [...new Map(originalArray.map((item) => [item[prop], item])).values()]
}

// Function to fetch Bus Agencies
export function getAgencyNames(originalArray) {
  let namesArray = []
  let index = 0
  do {
    namesArray.push(originalArray[index].agencyName)
    index++
  } while (index < originalArray.length)

  console.log(originalArray.length)

  return [
    ...new Map(namesArray.map((item) => [item["agencyName"], item])).values(),
  ]
}

export { removeDuplicates as default }
