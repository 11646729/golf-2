import axios from "axios"

// Function to remove duplicates from array
export const removeDuplicates = (originalArray, prop) => {
  let newArray = []
  newArray = [
    ...new Map(originalArray.map((item) => [item[prop], item])).values(),
  ]
  return newArray
}

// Function to remove objects with false "routeVisible" from array
export const removeFalse = (originalArray, value) => {
  let newArray = []
  originalArray
    .filter((item) => item.routeVisible === value)
    .forEach((item) => newArray.push(item))

  return newArray
}

// Function to fetch Gtfs data
export async function getGtfsData(url) {
  const result = await axios(url)

  return result.data
}

export { removeDuplicates as default }
