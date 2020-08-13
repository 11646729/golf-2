import { TranslinkModifiedShapeSchema } from "./models/transportModels/v1/translinkModifiedShapeSchema"
import { CoordsSchema } from "./models/commonModels/v1/coordsSchema"

// Function to save bus shapes data to mongodb
// Longitude first in Javascript
export const importTranslinkShapeData = async () => {
  console.log("In importTranslinkShapeData")

  const rawjson = require("./rawData/translink_ulsterbus_routes.json")
  // const endloop = rawjson.features.length
  // console.log(endloop)

  const startloop = 1000
  const endloop = 2000

  let i = startloop
  do {
    let oldcoords = rawjson.features[i].geometry.coordinates
    let oldcoordslength = oldcoords.length

    let convertedcoords = decodeInnerArray(oldcoords, oldcoordslength)
    // console.log(convertedcoords)

    // Now create a model instance
    const busShapes = new TranslinkModifiedShapeSchema({
      agency_key: "Translink Buses",
      shape_id: i + 1,
      shapeCoordinates: convertedcoords,
      from_stop_id: rawjson.features[i].properties.FromStopID,
      to_stop_id: rawjson.features[i].properties.ToStopID,
      // shape_pt_lat: rawjson.features[i].geometry.coordinates[j][1],
      // shape_pt_lon: rawjson.features[i].geometry.coordinates[j][0],
      // shape_pt_sequence: 10000, // + j
      shape_distance_travelled: 0.0,
    })

    // console.log(busShapes)

    // Now save in mongoDB
    busShapes
      .save()
      // .then(() => console.log(i + " busShapes saved to mongoDB"))
      .catch((err) => console.log("Error saving busShapes to mongoDB " + err))
    // } catch (error) {
    // handle error
    // console.log("Error in importTranslinkShapeData ", error)
    // }

    i++
    console.log("i: " + i)
  } while (i < endloop) // 45107 / 9995
  console.log(i + " busShapes Imported")
}

const decodeInnerArray = (oldcoords, oldcoordslength) => {
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
