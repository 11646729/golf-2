import axios from "axios"
import { GtfsUniqueReducedRouteSchema } from "./models/transportModels/v1/gtfsUniqueReducedRouteSchema"

// Function to remove duplicates from array
function removeDuplicates(originalArray, prop) {
  var newArray = []
  var lookupObject = {}

  for (var i in originalArray) {
    lookupObject[originalArray[i][prop]] = originalArray[i]
  }

  for (i in lookupObject) {
    newArray.push(lookupObject[i])
  }

  return newArray
}

export const createUniqueReducedRoutes = async (req, res) => {
  res = await axios({
    url: "http://localhost:5000/api/gtfsTransport/gtfsReducedRoutes",
    method: "get",
    timeout: 8000,
    headers: {
      "Content-Type": "application/json",
    },
  })

  // Remove Duplicates from the array
  let uniqueBusRoutesCollection = removeDuplicates(res.data, "routeNumber")

  // And save it in a gtfsReducedShapesSchema collection
  let j = 0
  do {
    const gtfsUniqueReducedRouteSchema = new GtfsUniqueReducedRouteSchema({
      databaseVersion: uniqueBusRoutesCollection[j].databaseVersion,
      routeVisible: uniqueBusRoutesCollection[j].routeVisible,
      markerType: uniqueBusRoutesCollection[j].markerType,
      shapeKey: uniqueBusRoutesCollection[j].shapeKey,
      routeColor: uniqueBusRoutesCollection[j].routeColor,
      routeLongName: uniqueBusRoutesCollection[j].routeLongName,
      routeNumber: uniqueBusRoutesCollection[j].routeNumber,
    })

    // Save the gtfsUniqueReducedRoutes in the database
    gtfsUniqueReducedRouteSchema
      .save()
      .then(() => {
        console.log("gtfsUniqueReducedRouteSchema collection saved successful")
      })
      .catch((err) => {
        console.error(err)
      })

    j++
  } while (j < uniqueBusRoutesCollection.length)
}
