import axios from "axios"
import { TranslinkModifiedShapeSchema } from "./models/transportModels/v1/translinkModifiedShapeSchema"
import { CoordsSchema } from "./models/commonModels/v1/coordsSchema"

// Function to save bus shapes data to mongodb
// Longitude first in Javascript
export const importConvertSaveTranslinkRoutes = async () => {
  const rawjson = await axios({
    url: "http://localhost:5000/api/translinkTransport/rawRoutes",
    method: "get",
    timeout: 8000,
    headers: {
      "Content-Type": "application/json",
    },
  })

  console.log("Rawjson: ", rawjson.data)

  //   const startloop = 0
  //   const endloop = rawjson.features.length
  //   // console.log(endloop)
  //   // const endloop = 45107

  //   let i = startloop
  //   do {
  //     let oldcoords = rawjson.features[i].geometry.coordinates
  //     let oldcoordslength = oldcoords.length

  //     let convertedcoords = await decodeInnerArray(oldcoords, oldcoordslength)

  //     // Now create a model instance
  //     const busShapes = new TranslinkModifiedShapeSchema({
  //       agency_key: "Translink Buses",
  //       shape_id: i + 1,
  //       shapeCoordinates: convertedcoords,
  //       from_stop_id: rawjson.features[i].properties.FromStopID,
  //       to_stop_id: rawjson.features[i].properties.ToStopID,
  //       shape_pt_lat: rawjson.features[i].geometry.coordinates[j][1],
  //       shape_pt_lon: rawjson.features[i].geometry.coordinates[j][0],
  //       shape_pt_sequence: 10000, // + j
  //       shape_distance_travelled: 0.0,
  //     })

  //     // Now save in mongoDB
  //     busShapes
  //       .save()
  //       .then(() => console.log(i + " busShapes saved to mongoDB"))
  //       .catch((err) => console.log("Error saving busShapes to mongoDB " + err))

  //     i++
  //     console.log("i: " + i)
  //   } while (i < endloop) // 45107 / 9995
  //   console.log(i + " busShapes Imported")
  // }

  // // export const decodeInnerArray = (oldcoords, oldcoordslength) => {
  // export async function decodeInnerArray(oldcoords, oldcoordslength) {
  //   let j = 0
  //   let pathArray = []
  //   do {
  //     const coordsSchema = new CoordsSchema({
  //       lat: oldcoords[j][1],
  //       lng: oldcoords[j][0],
  //     })

  //     pathArray.push(coordsSchema)

  //     j++
  //   } while (j < oldcoordslength)

  //   return pathArray
}
