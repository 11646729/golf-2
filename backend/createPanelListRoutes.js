import { GtfsRouteSchema } from "./models/transportModels/v1/gtfsRouteSchema"
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
  // Firstly delete existing gtfsPanelListRouteSchema collection
  GtfsPanelListRouteSchema.deleteMany({})
    .then((res) => {
      console.log("No of Panel Routes successfully deleted: ", res.deletedCount)
    })
    .catch((err) => {
      console.log(
        err.message || "An error occurred while removing all Panel Routes"
      )
    })

  // Secondly fetch all the Routes in the database
  const results = await GtfsRouteSchema.find({}).catch((err) =>
    res.status(400).json("Error " + err)
  )

  // Remove Duplicates from the results array
  let uniqueBusRoutesCollection = removeDuplicates(results, "routeNumber")

  // And save to a gtfsPanelListRouteSchema collection
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

    // Save the gtfsPanelListRouteSchema collection in the database
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
