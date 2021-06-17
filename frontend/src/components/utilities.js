import axios from "axios"

var fetchData = async (url) => {
  return await axios(url)
}

export var getData = async (url) => {
  const resultData = await fetchData(url)
  return resultData.data
}

// Function to fetch Unique Gtfs Route data
export var getRoutesData = async (url) => {
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
export var getStopsData = async (url) => {
  // const resultData = await fetchData(url, {})
  // return removeDuplicates(resultData.data, "coordsString")
}

// -------------------------------------------------------
// Local function
// Function to fetch Shapes data for a specific shapeID
// -------------------------------------------------------
export var getShapesData = async (url, shapeID) => {
  // Guard clauses
  if (url == null) return
  if (shapeID == null) return

  const resultData = await axios({
    url: url,
    params: {
      shape: shapeID,
    },
    method: "GET",
    timeout: 8000,
    headers: {
      "Content-Type": "application/json",
    },
  })

  // console.log(resultData)

  return resultData.data
}

// Function to remove Gtfs data fields routeVisible === false
export var getDisplayData = (originalArray) => {
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
// var removeDuplicates = (originalArray, prop) => {
//   return [...new Map(originalArray.map((item) => [item[prop], item])).values()]
// }

// Function to fetch Bus Agencies
export var getAgencyNames = (originalArray) => {
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
