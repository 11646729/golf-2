import axios from "axios"

const fetchData = async (url) => {
  return await axios(url)
}

export const getData = async (url) => {
  const resultData = await fetchData(url)
  return resultData.data
}

// Function to fetch Unique Gtfs Route data
export const getRoutesData = async (url) => {
  // const resultData = await fetchData(url, {})

  // Filter out Duplicate Routes here
  // let sortedDisplayArray = removeDuplicates(resultData.data, "routeNumber")

  // Sort Routes code here
  let res = []
  // sortedDisplayArray.sort((a, b) => (a.routeNumber > b.routeNumber ? 1 : -1))
  // res[0] = sortedDisplayArray

  return res
}

// Function to fetch Unique Gtfs Stops data
export const getStopsData = async (url) => {
  // const resultData = await fetchData(url, {})
  // return removeDuplicates(resultData.data, "coordsString")
}

// Function to fetch Unique Shapes data
export const getShapesData = async (url) => {
  const resultData = await fetchData(url, {})
  return resultData.data
  // removeDuplicates(result.data, "routeNumber")
}

// Function to remove Gtfs data fields routeVisible === false
export const getDisplayData = (originalArray) => {
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
// const removeDuplicates = (originalArray, prop) => {
//   return [...new Map(originalArray.map((item) => [item[prop], item])).values()]
// }

// Function to fetch Bus Agencies
export const getAgencyNames = (originalArray) => {
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

export { getData as default }
