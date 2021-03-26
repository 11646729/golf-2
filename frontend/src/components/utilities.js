// Function to remove duplicates from array
export default function removeDuplicates(originalArray, prop) {
  let newArray = []
  newArray = [
    ...new Map(originalArray.map((item) => [item[prop], item])).values(),
  ]
  // return [...new Map(originalArray.map((item) => [item[prop], item])).values()]
  return newArray
}
