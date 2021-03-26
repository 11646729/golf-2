// Function to remove objects with false "routeVisible" from array
export default function removeFalse(originalArray, value) {
  let newArray = []
  originalArray
    .filter((item) => item.routeVisible === value)
    .forEach((item) => newArray.push(item))

  return newArray
}
