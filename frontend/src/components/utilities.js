// Function to remove duplicates from array
export default function removeDuplicates(originalArray, prop) {
  return [...new Map(originalArray.map((item) => [item[prop], item])).values()]
}
