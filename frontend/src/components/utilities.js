import axios from "axios"

var fetchData = async (url) => {
  return await axios(url)
}

export var getData = async (url) => {
  const resultData = await fetchData(url)
  return resultData.data
}

// -------------------------------------------------------
// Function
// Function to fetch Bus Agency
// -------------------------------------------------------
export var getAgencyName = async (url) => {
  // Guard clauses
  if (url == null) return

  const resultData = await axios({
    url: url,
    method: "GET",
    timeout: 8000,
    headers: {
      "Content-Type": "application/json",
    },
  })

  return resultData.data
}

// -------------------------------------------------------
// Function
// Function to fetch all Shapes data
// -------------------------------------------------------
export var getAllShapes = async (url) => {
  // Guard clause
  if (url == null) return

  const resultData = await axios({
    url: url,
    method: "GET",
    timeout: 8000,
    headers: {
      "Content-Type": "application/json",
    },
  })

  // Now extract all unique shape_id and sort into ascending order
  const uniqueShape_ids = getShapeIDs(resultData.data)

  // Now reformat busShapesCollection into a new array
  const reformattedShapes = reformatShapesData(uniqueShape_ids, resultData.data)

  return reformattedShapes
}

// -------------------------------------------------------
// Function
// Function to fetch Shapes data for a specific shapeID
// -------------------------------------------------------
export var getShape = async (url, shapeID) => {
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

  return resultData.data
}

// -------------------------------------------------------
// Local Function
// Function to fetch all shape_ids
// -------------------------------------------------------
var getShapeIDs = (busShapesCollection) => {
  // Now extract all unique shape_ids
  const uniqueShape_ids = [
    ...new Set(busShapesCollection.map((item) => item.shape_id)),
  ]

  // And sort into ascending order
  uniqueShape_ids.sort(
    (a, b) => parseFloat(a.shape_id) - parseFloat(b.shape_id)
  )

  return uniqueShape_ids
}

// -------------------------------------------------------
// Local Function
// Function to reformat coordinates into a new array
// -------------------------------------------------------
var reformatShapesData = (uniqueShapeIDs, busShapesCollection) => {
  var modifiedShapeArray = []

  for (var k = 0; k < uniqueShapeIDs.length; k++) {
    var tempArray = []
    var finalArray = []

    // Select all busShape objects with the same shape_id & store in tempArray
    for (var i = 0; i < busShapesCollection.length; i++) {
      if (busShapesCollection[i].shape_id === uniqueShapeIDs[k]) {
        tempArray.push(busShapesCollection[i])
      }
    }

    // Sort shaped_id by ascending shape_pt_sequence
    if (tempArray.length > 0) {
      tempArray.sort(
        (a, b) =>
          parseFloat(a.shape_pt_sequence) - parseFloat(b.shape_pt_sequence)
      )

      // Iterate over shape_pt_sequence & store all lat & lng values in an object
      var j = 0
      do {
        var coords = {
          lat: tempArray[j].shape_pt_lat,
          lng: tempArray[j].shape_pt_lon,
        }

        finalArray.push(coords)

        j++
      } while (j < tempArray.length)

      // const colors = [
      //   "#C2272D",
      //   "#F8931F",
      //   "#FFFF01",
      //   "#009245",
      //   "#0193D9",
      //   "#0C04ED",
      //   "#612F90",
      // ]
      // for (var i = 0; i < colors.length; i++) {
      //   listItems[i].style.color = colors[i]
      // }

      // Add other relevant values into the object
      var modifiedShape = {
        shapeKey: uniqueShapeIDs[k],
        shapeCoordinates: finalArray,
        display: "yes",
        defaultColor: "#C2272D",
      }

      // Store the object in modifiedShapeArray
      modifiedShapeArray.push(modifiedShape)
    }
  }

  return modifiedShapeArray
}

// -------------------------------------------------------
// Function
// Function to fetch Unique Gtfs Stops data
// -------------------------------------------------------
export var getAllStops = async (url) => {
  // Guard clauses
  if (url == null) return

  const resultData = await axios({
    url: url,
    method: "GET",
    timeout: 8000,
    headers: {
      "Content-Type": "application/json",
    },
  })

  return resultData.data
}

// -------------------------------------------------------
// Function
// Function to fetch Unique Gtfs Routes data
// -------------------------------------------------------
export var getAllRoutes = async (url) => {
  // Guard clauses
  if (url == null) return

  const resultData = await axios({
    url: url,
    method: "GET",
    timeout: 8000,
    headers: {
      "Content-Type": "application/json",
    },
  })

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

// Function to fetch Unique Gtfs Route data
// export var getRoutesData = async (url) => {
// const resultData = await fetchData(url, {})

// Filter out Duplicate Routes here
// let sortedDisplayArray = removeDuplicates(resultData.data, "routeNumber")

// Sort Routes code here
// let res = []
// sortedDisplayArray.sort((a, b) => (a.routeNumber > b.routeNumber ? 1 : -1))
// res[0] = sortedDisplayArray

// return res
// }

export { getData as default }
