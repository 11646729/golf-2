const fs = require("fs")
import { TranslinkShapeSchema } from "./models/transportModels/v1/translinkShapeSchema"
import { CoordsSchema } from "./models/commonModels/v1/coordsSchema"

// Function to save bus shapes data to mongodb
// Longitude first in Javascript
export const createTranslinkShapes = async (req, res) => {
  // Firstly delete all existing Shapes in the database
  TranslinkShapeSchema.deleteMany({})
    .then((res) => {
      console.log("No of Shapes successfully deleted: ", res.deletedCount)
    })
    .catch((err) => {
      console.log(err.message || "An error occurred while removing all Shapes")
    })

  const rawGeojson = process.env.TRANSLINK_ROUTES_FILEPATH

  fs.readFile(rawGeojson, "utf8", (err, data) => {
    if (err) {
      throw err
    }

    reduceTranslinkRoutes(JSON.parse(data))
  })
}

// Function to extract data for reduced dataset then save it in the mongodb database
const reduceTranslinkRoutes = async (busRoute) => {
  // Test function
  // const endloop = busRoute.data.features.length
  const endloop = 10000

  let loop = 0
  do {
    let oldcoords = busRoute.features[loop].geometry.coordinates
    let convertedcoords = decodeInnerArray(oldcoords, oldcoords.length)

    console.log("Loop: ", loop)

    // Now create a model instance
    const busShapes = new TranslinkShapeSchema({
      databaseVersion: process.env.DATABASE_VERSION,
      agencyName: "Translink Buses",
      agencyId: "MET",
      markerType: busRoute.features[loop].geometry.type,
      shapeKey: loop + 1,
      shapeCoordinates: convertedcoords,
      from_stop_id: busRoute.features[loop].properties.FromStopID,
      to_stop_id: busRoute.features[loop].properties.ToStopID,
      // shape_pt_sequence: 10000, // + j
      // shape_distance_travelled: 0.0,
    })

    // Now save in mongoDB
    busShapes
      .save()
      .then(() => console.log(loop + " busShapes saved to mongoDB"))
      .catch((err) => console.log("Error saving busShapes to mongoDB " + err))

    loop++
  } while (loop < endloop)

  function decodeInnerArray(oldcoords, oldcoordslength) {
    let j = 0
    let pathArray = []

    do {
      const coordsSchema = new CoordsSchema({
        lat: oldcoords[j][1],
        lng: oldcoords[j][0],
      })

      pathArray.push(coordsSchema)

      j++
    } while (j < oldcoordslength)

    return pathArray
  }
}
