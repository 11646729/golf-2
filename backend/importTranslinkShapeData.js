import { TranslinkShapeSchema } from "./models/transportModels/v1/translinkShapeSchema"

// Function to save bus shapes data to mongodb
// Longitude first in Javascript
export const importTranslinkShapeData = async () => {
  console.log("In importTranslinkShapeData")
  try {
    const rawjson = require("./rawData/translink_ulsterbus_routes.json")

    let i = 0
    do {
      let j = 0
      do {
        // Now create a model instance
        const busShapes = new TranslinkShapeSchema({
          databaseVersion: process.env.DATABASE_VERSION,
          agency_key: "Translink Buses",
          shape_id: i + 1,
          shape_pt_lat: rawjson.features[i].geometry.coordinates[j][1],
          shape_pt_lon: rawjson.features[i].geometry.coordinates[j][0],
          shape_pt_sequence: j + 10000,
          shape_distance_travelled: 0.0,
        })

        // Now save in mongoDB
        busShapes
          .save()
          // .then(() => console.log(i + " busShapes saved to mongoDB"))
          .catch((err) =>
            console.log("Error saving busShapes to mongoDB " + err)
          )

        j++
      } while (j < rawjson.features[i].geometry.coordinates.length)

      i++
    } while (i < rawjson.features.length)
    console.log("Import ended " + i)
  } catch (error) {
    // handle error
    console.log("Error in importTranslinkShapeData ", error)
  }
}
