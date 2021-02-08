import axios from "axios"
import { GtfsPanelListRouteSchema } from "./models/transportModels/v1/gtfsPanelListRouteSchema"

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

export const createPanelListRoutes = async (req, res) => {
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

  // And save it in a gtfsPanelListRouteSchema collection
  let j = 0
  do {
    const gtfsPanelListRouteSchema = new GtfsPanelListRouteSchema({
      databaseVersion: uniqueBusRoutesCollection[j].databaseVersion,
      routeVisible: uniqueBusRoutesCollection[j].routeVisible,
      agencyName: uniqueBusRoutesCollection[j].agencyName,
      markerType: uniqueBusRoutesCollection[j].markerType,
      routeKey: uniqueBusRoutesCollection[j].routeKey,
      routeColor: uniqueBusRoutesCollection[j].routeColor,
      routeLongName: uniqueBusRoutesCollection[j].routeLongName,
      routeNumber: uniqueBusRoutesCollection[j].routeNumber,
    })

    // Save the gtfsPanelListRoutes in the database
    gtfsPanelListRouteSchema
      .save()
      .then(() => {
        console.log("gtfsPanelListRouteSchema collection saved successful")
      })
      .catch((err) => {
        console.error(err)
      })

    j++
  } while (j < uniqueBusRoutesCollection.length)
}
