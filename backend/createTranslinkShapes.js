const fs = require("fs")
import { TranslinkShapeSchema } from "./models/transportModels/v1/translinkShapeSchema"
import { CoordsSchema } from "./models/commonModels/v1/coordsSchema"

// -------------------------------------------------------
// Create Bus Shapes in the Database
// Path: local function called in switchBoard
// -------------------------------------------------------
export const createTranslinkShapes = () => {
  // Firstly delete all existing Route Shapes in the database
  TranslinkShapeSchema.deleteMany({})
    .then((res) => {
      console.log("No of Shapes successfully deleted: ", res.deletedCount)

      // Secondly read all Route Shapes from the database
      fs.readFile(
        process.env.TRANSLINK_ROUTES_FILEPATH,
        "utf8",
        (err, data) => {
          if (err) {
            throw err
          }

          // Thirdly format data then save it in the mongodb database
          reduceTranslinkRoutes(JSON.parse(data))
        }
      )
    })
    .catch((err) => {
      console.log(err.message)
    })
}

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

// -------------------------------------------------------
// Local function
// -------------------------------------------------------
const reduceTranslinkRoutes = (busRoute) => {
  // Test function
  // const endloop = busRoute.data.features.length
  const endloop = 10000

  let loop = 0
  do {
    let oldcoords = busRoute.features[loop].geometry.coordinates
    let convertedcoords = decodeInnerArray(oldcoords, oldcoords.length)

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
      .catch((err) =>
        console.log("Error saving Route Shapes to database " + err)
      )

    loop++
  } while (loop < endloop)

  console.log("No of new Route Shapes created & saved: ", loop)
}
