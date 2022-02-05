import axios from "axios"
import moment from "moment"

// -------------------------------------------------------
// Function to prepare the temperatures table in the SQL database
// -------------------------------------------------------
export var prepareTemperaturesTable = () => {
  let params = {}
  let config = {
    headers: {
      "Content-Type": "application/json",
    },
  }
  axios
    .post(
      "http://localhost:4000/api/weather/prepareTemperaturesTable",
      params,
      config
    )
    .then((returnedData) => console.log(returnedData))
    .catch((err) => console.log(err))

  return "Empty temperatures table prepared"
}

// -------------------------------------------------------
// Function to fetch all Temperature data
// -------------------------------------------------------
export var getTemperatureData = async (url) => {
  // Guard clause
  if (url == null) {
    console.log("Error: url == null in getTemperatureData in utilities.js")
    return
  }

  let resultData = await axios({
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
// Function to prepare the golfcourses table in the SQL database
// -------------------------------------------------------
export var prepareGolfCoursesTable = (returnResult) => {
  let params = {}
  let config = {
    headers: {
      "Content-Type": "application/json",
    },
  }
  axios
    .post(
      "http://localhost:4000/api/golf/prepareGolfCoursesTable",
      params,
      config
    )
    .then((returnedData) => console.log(returnedData))
    .catch((err) => console.log(err))

  if (returnResult === true) return "Empty golfcourses table prepared"
}

// -------------------------------------------------------
// Function to instruct backend to load Golf Club Data into the database
// -------------------------------------------------------
export var importGolfCoursesData = async (url) => {
  // Guard clause
  if (url == null) {
    console.log("Error: url == null in importGolfCoursesData in utilities.js")
    return
  }

  let resultData = await axios({
    url: url,
    method: "PUT",
    timeout: 8000,
    headers: {
      "Content-Type": "application/json",
    },
  })

  resultData = "Golf Course data loaded into the SQL database"

  return resultData
}

// -------------------------------------------------------
// Function to fetch all Golf Course data
// -------------------------------------------------------
export var getGolfCoursesData = async (url) => {
  // Guard clause
  if (url == null) {
    console.log("Error: url == null in getGolfCoursesData in utilities.js")
    return
  }

  let resultData = await axios({
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
// Function to prepare the portarrivals table in the SQL database
// -------------------------------------------------------
export var preparePortArrivalsTable = (returnResult) => {
  let params = {}
  let config = {
    headers: {
      "Content-Type": "application/json",
    },
  }
  axios
    .post(
      "http://localhost:4000/api/cruise/preparePortArrivalsTable",
      params,
      config
    )
    .then((returnedData) => console.log(returnedData))
    .catch((err) => console.log(err))

  if (returnResult === true) return "Empty portarrivals table prepared"
}

// -------------------------------------------------------
// Function to prepare the vessels table in the SQL database
// -------------------------------------------------------
export var prepareVesselsTable = (returnResult) => {
  let params = {}
  let config = {
    headers: {
      "Content-Type": "application/json",
    },
  }
  axios
    .post(
      "http://localhost:4000/api/cruise/prepareVesselsTable",
      params,
      config
    )
    .then((returnedData) => console.log(returnedData))
    .catch((err) => console.log(err))

  if (returnResult === true) return "Empty vessels table prepared"
}

// -------------------------------------------------------
// Function to fetch all Cruise PortArrivals & Vessel data
// -------------------------------------------------------
export var importPortArrivalsAndVesselsData = async (url, portName) => {
  // Guard clause
  if (url == null) {
    console.log(
      "Error: url == null in importPortArrivalsAndVesselsData in utilities.js"
    )
    return
  }

  if (portName == null) {
    console.log(
      "Error: portName == null in importPortArrivalsAndVesselsData in utilities.js"
    )
    return
  }

  let resultData = await axios({
    url: url,
    params: {
      portName: portName,
    },
    method: "POST",
    timeout: 20000,
    headers: {
      "Content-Type": "application/json",
    },
  })

  resultData = "Hello"
  return resultData
}

// -------------------------------------------------------
// Function to fetch all Cruise Vessel data
// -------------------------------------------------------
export var getPortArrivalsData = async (url) => {
  // Guard clause
  if (url == null) {
    console.log("Error: url == null in getCruiseVesselData in utilities.js")
    return
  }

  let resultData = await axios({
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
// Function to fetch all 3Rings Shift data
// -------------------------------------------------------
export var getThreeRingsShiftsData = async (url) => {
  // Guard clause
  if (url == null) {
    console.log(
      "Error: url == null in getThreeRingsShiftsData in axiosUtilities.js"
    )
    return
  }

  let resultData = await axios({
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
// Function to fetch all 3Rings News data
// -------------------------------------------------------
export var getThreeRingsNewsData = async (url) => {
  // Guard clause
  if (url == null) {
    console.log(
      "Error: url == null in getThreeRingsNewsData in axiosUtilities.js"
    )
    return
  }

  let resultData = await axios({
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
// Function to fetch all 3Rings Events data
// -------------------------------------------------------
export var getThreeRingsEventsData = async (url) => {
  // Guard clause
  if (url == null) {
    console.log(
      "Error: url == null in getThreeRingsEventsData in axiosUtilities.js"
    )
    return
  }

  let resultData = await axios({
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
// Function to fetch Cruise Vessel Position data
// -------------------------------------------------------
export var getCruiseVesselPositionData = async (url, test, portArrivals) => {
  // Guard clauses
  if (url == null) {
    console.log(
      "Error: url == null in getCruiseVesselPositionData in utilities.js"
    )
    return
  }

  if (portArrivals == null) {
    console.log(
      "Error: portArrivals == null in getCruiseVesselPositionData in utilities.js"
    )
    return
  }

  // Extract urls here - THIS WORKS
  var urls = []
  var loop = 0
  do {
    let shipUrl = {
      url: portArrivals[loop].vesselnameurl,
    }

    urls.push(shipUrl)

    loop++
  } while (loop < portArrivals.length)

  // console.log(urls)

  var resultData = []

  if (test === "Test") {
    console.log("Static Test Data")
    resultData = getCruiseVesselPositionTestData()
  } else {
    console.log("Real Data")

    // Fetch the initial data
    resultData = await axios({
      url: url,
      params: {
        portArrivals: portArrivals,
      },
      method: "GET",
      timeout: 8000,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }

  return resultData.data
}

// -------------------------------------------------------
// Function to fetch Cruise Vessel Position data
// -------------------------------------------------------
var getCruiseVesselPositionTestData = () => {
  var longlats = [
    [55.95473, -4.758], // lat, lng
    [55.843985, -4.9333],
    [55.42563, -4.917513],
    [55.001906, -5.34192],
    [54.719465, -5.514335],
    [54.62649822725435, -5.884617360308293],
  ]

  let resultData = {}
  let shipPositions = []
  let loop = 0
  // var i = setInterval(function () {
  do {
    // if (loop < longlats.length) {
    var utcMoment = moment.utc()
    var utcDate = new Date(utcMoment.format())

    let shipPosition = {
      index: loop + 1,
      timestamp: utcDate,
      lat: longlats[loop][0],
      lng: longlats[loop][1],
    }

    shipPositions.push(shipPosition)

    console.log(shipPositions)

    loop++
    // res.send(shipPosition)
    // return shipPosition
    // } else {
    // clearInterval(i)
    // res.send(shipPositions)
    // }
  } while (loop < longlats.length)
  // }, 0)

  resultData = {
    config: "testData",
    data: shipPositions,
  }

  console.log(resultData)

  return resultData
}

// -------------------------------------------------------
// Function to import the GTFS data into the SQL database
// -------------------------------------------------------
export var importGTFSData = async (returnResult) => {
  // let params = {}
  // let config = {
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // }
  // axios
  //   .put("http://localhost:4000/api/transport/importGTFSData", params, config)
  //   .then((returnedData) => console.log(returnedData))
  //   .catch((err) => console.log(err))

  let resultData = await axios({
    url: "http://localhost:4000/api/transport/importGTFSData",
    method: "PUT",
    timeout: 8000,
    headers: {
      "Content-Type": "application/json",
    },
  })

  return resultData
  // if (returnResult === true) return "Import now successful"
}

// -------------------------------------------------------
// Function to fetch Position data for a Specific Route
// -------------------------------------------------------
export var selectedUniqueRoute = async (
  url,
  selectedBusRouteNumber,
  selected
) => {
  // Guard clause
  if (url == null) return

  let resultData = await axios({
    url: url,
    data: {
      routeNumber: selectedBusRouteNumber,
      routeVisible: selected,
    },
    method: "PUT",
    timeout: 8000,
    headers: {
      "Content-Type": "application/json",
    },
  })

  // return resultData.data
}

// -------------------------------------------------------
// Function to fetch Bus Agency
// -------------------------------------------------------
export var getAgencyName = async (url) => {
  // Guard clause
  if (url == null) return

  let resultData = await axios({
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
// Function to fetch all Shapes data
// -------------------------------------------------------
export var getAllShapes = async (url) => {
  // Guard clause
  if (url == null) return

  let resultData = await axios({
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
// Function to fetch Shapes data for a specific shapeID
// -------------------------------------------------------
export var getShape = async (url, shapeID) => {
  // Guard clauses
  if (url == null) return
  if (shapeID == null) return

  let resultData = await axios({
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
// Local Function to fetch all shape_ids
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
// Local Function to reformat coordinates into a new array
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
// Function to fetch Unique Gtfs Routes data
// -------------------------------------------------------
export var getAllRoutes = async (url) => {
  // Guard clauses
  if (url == null) return

  let resultData = await axios({
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
// Function to remove Gtfs data fields routeVisible === false
// -------------------------------------------------------
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

export { getTemperatureData as default }
