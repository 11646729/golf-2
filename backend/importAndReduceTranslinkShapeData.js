import { TranslinkModifiedShapeSchema } from "./models/transportModels/v1/translinkModifiedShapeSchema"
// import { CoordsSchema } from "./models/commonModels/v1/coordsSchema"

// Function to save bus shapes data to mongodb
// Longitude first in Javascript
export const importAndReduceTranslinkShapeData = async () => {
  console.log("In importAndReduceTranslinkShapeData")

  const rawjson = require("./rawData/translink_ulsterbus_routes.json")

  const startloop = 0
  const endloop = rawjson.features.length
  // const endloop = 100 // 45107

  let i = startloop
  do {
    // let convertedcoords = decodeInnerArray(oldcoords, oldcoordslength)

    const busShapes = new TranslinkModifiedShapeSchema({
      agency_key: "Translink Buses",
      shape_id: i + 1,
      from_stop_id: rawjson.features[i].properties.FromStopID,
      to_stop_id: rawjson.features[i].properties.ToStopID,
      shape_duplicate: "",
      to_from_shape:
        "" +
        rawjson.features[i].properties.ToStopID +
        rawjson.features[i].properties.FromStopID,
      from_to_shape:
        "" +
        rawjson.features[i].properties.FromStopID +
        rawjson.features[i].properties.ToStopID,
    })

    // Now save in mongoDB
    busShapes
      .save()
      // .then(() => console.log(i + " busShapes saved to mongoDB"))
      .catch((err) => console.log("Error saving busShapes to mongoDB " + err))

    i++
    console.log("i: " + i)
  } while (i < endloop)
  console.log(i + " busShapes Imported")
}

// const decodeInnerArray = (oldcoords, oldcoordslength) => {
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
// }
