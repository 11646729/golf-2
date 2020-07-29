import gtfs from "gtfs"
import gtfsToGeoJSON from "gtfs-to-geojson"
import config from "./custom-config.json"
import { GtfsShapesSchema } from "./models/transportModels/v1/gtfsShapesSchema"
import { GtfsReducedShapesSchema } from "./models/transportModels/v1/gtfsReducedShapesSchema"
import { CoordsSchema } from "./models/commonModels/v1/coordsSchema"

// Function to fetch GTFS data
export const importGtfsData = async () => {
  // try {
  //   gtfs
  //     .import(config)
  //     .then(() => {
  //       console.log("Import Successful")
  //       return mongoose.connection.close()
  //     })
  //     .catch((err) => {
  //       console.error(err)
  //     })
  // } catch (err) {
  //   console.log("Error in importGtfsData: ", err)
  // }
  //
  // Convert data to a better format for display
  createReducedShapeData()
}

// Function to convert GTFS data to geoJSON
export const convertGtfsDataToGeojson = async () => {
  try {
    gtfsToGeoJSON(config)
      .then(() => {
        console.log("GeoJSON Generation Successful")
      })
      .catch((err) => {
        console.error(err)
      })
  } catch (err) {
    console.log("Error in importGtfsData: ", err)
  }
}

const createReducedShapeData = async () => {
  console.log("Creating reduced Shape data")

  GtfsShapesSchema.find({}).then((data) => {
    // Step 1: Fetch all data from shapes collection
    // and store the number of unique shape_id fields
    // in tempShapeId collection
    let i = 0
    let tempShapeId = []
    do {
      tempShapeId.push(data[i].shape_id)
      i++
    } while (i < data.length)

    let uniqueShapeId = [...new Set(tempShapeId)]

    let totalCount = 0

    // Step 2: Copy all documents with a specified shape_id
    // to the constTemp array
    let j = 0
    do {
      let constTemp = []
      let m = 0
      do {
        if (data[m].shape_id == uniqueShapeId[j]) {
          constTemp.push(data[m])
        }
        m++
      } while (m < data.length)

      // This routine lists the shape_pt_sequence
      // to show that they are not in sequential order
      let k = 0
      do {
        constTemp[k].shape_pt_sequence
        k++
      } while (k < constTemp.length)

      function compare(a, b) {
        if (a.shape_pt_sequence < b.shape_pt_sequence) {
          return -1
        }
        if (a.shape_pt_sequence > b.shape_pt_sequence) {
          return 1
        }
        return 0
      }

      // Now sort all the records by increasing shape_pt_sequence
      constTemp.sort(compare)

      // Now build all the paths into a long string
      let l = 0
      let pathArray = []
      do {
        const coordsSchema = new CoordsSchema({
          lat: constTemp[l].shape_pt_lat,
          lng: constTemp[l].shape_pt_lon,
        })

        pathArray.push(coordsSchema)

        l++
      } while (l < constTemp.length)

      // And save it in a gtfsReducedShapesSchema collection
      const gtfsReducedShapesSchema = new GtfsReducedShapesSchema({
        databaseVersion: process.env.DATABASE_VERSION,
        agencyKey: data[j].agency_key,
        shapeId: uniqueShapeId[j],
        coordinates: pathArray,
      })

      // Save the reducedShapes in the database
      gtfsReducedShapesSchema
        .save()
        .then(() => {
          console.log("gtfsReducedShapesSchema collection saved successful")
        })
        .catch((err) => {
          console.error(err)
        })

      console.log("Loop Ended: " + m + " " + constTemp.length)

      totalCount += constTemp.length
      console.log("Total Count: " + totalCount)

      j++
    } while (j < uniqueShapeId.length)
  })
}
