import axios from "axios"

export async function get20WeatherDataPoints(url) {
  const result = await axios(url)

  // Only display data for the last 20 values
  result.data.splice(0, result.data.length - 20)

  return result.data
}

// Function to remove duplicates from array
export const removeDuplicates = (originalArray, prop) => {
  let newArray = []

  newArray = [
    ...new Map(originalArray.map((item) => [item[prop], item])).values(),
  ]
  return newArray
}

// const myArray = ["checkbox1Value", "checkbox4Value"];

// let obj = {};

// myArray.forEach(val => {
//     obj[val] = true;
// })

// console.log(obj);

// Function to remove objects with false "routeVisible" from array
export const removeFalse = (originalArray, prop, value) => {
  let newArray = []

  const myArray = [prop]
  let obj = {}
  myArray.forEach((val) => {
    // console.log(originalArray.obj[val])

    obj[val] = value
  })
  // console.log(obj)

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
