import axios from "axios"
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

  // Now fetch the raw json file & decode it
  const rawjson = await axios({
    url: "http://localhost:5000/api/translinkTransport/createTranslinkShapes",
    method: "get",
    timeout: 8000,
    headers: {
      "Content-Type": "application/json",
    },
  })

  // Test function
  // const endloop = rawjson.data.features.length
  const endloop = 10000

  let loop = 0
  do {
    let oldcoords = rawjson.data.features[loop].geometry.coordinates
    let convertedcoords = decodeInnerArray(oldcoords, oldcoords.length)

    console.log("Loop: ", loop)

    // Now create a model instance
    const busShapes = new TranslinkShapeSchema({
      databaseVersion: process.env.DATABASE_VERSION,
      agencyName: "Translink Buses",
      markerType: rawjson.data.features[loop].geometry.type,
      shapeKey: loop + 1,
      shapeCoordinates: convertedcoords,
      from_stop_id: rawjson.data.features[loop].properties.FromStopID,
      to_stop_id: rawjson.data.features[loop].properties.ToStopID,
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
