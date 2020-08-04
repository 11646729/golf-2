import { GtfsShapesSchema } from "./models/transportModels/v1/gtfsShapesSchema"
import { GtfsReducedShapesSchema } from "./models/transportModels/v1/gtfsReducedShapesSchema"
import { CoordsSchema } from "./models/commonModels/v1/coordsSchema"
import { TripIdSchema } from "../../commonModels/v1/tripIdSchema"

export const createReducedShapeData = async () => {
  console.log("Creating reduced Shape data")

  // Step 1: Fetch all data from shapes collection
  // and store the number of unique shape_id fields
  // in tempShapeId collection
  GtfsShapesSchema.find({}).then((data) => {
    try {
      let i = 0
      let tempShape_id = []
      do {
        tempShape_id.push(data[i].shape_id)
        i++
      } while (i < data.length)

      let uniqueShape_id = [...new Set(tempShape_id)]

      // Step 2: Copy all documents with a specified shape_id
      // to the constTemp array
      let j = 0
      do {
        let unsortedShape_id = []
        let k = 0
        do {
          if (uniqueShape_id[j] == data[k].shape_id) {
            unsortedShape_id.push(data[k])
          }
          k++
        } while (k < data.length)

        // Step 3: Sort all the records by increasing shape_pt_sequence
        function compare(a, b) {
          if (a.shape_pt_sequence < b.shape_pt_sequence) {
            return -1
          }
          if (a.shape_pt_sequence > b.shape_pt_sequence) {
            return 1
          }
          return 0
        }

        unsortedShape_id.sort(compare)

        // Step 4: Store all the sequential sets of coordinates
        // in the pathArray as a CoordsSchema model
        let l = 0
        let pathArray = []
        do {
          const coordsSchema = new CoordsSchema({
            lat: unsortedShape_id[l].shape_pt_lat,
            lng: unsortedShape_id[l].shape_pt_lon,
          })

          pathArray.push(coordsSchema)

          l++
        } while (l < unsortedShape_id.length)

        // Temporary array
        let tripIdArray = []

        // And save it in a gtfsReducedShapesSchema collection
        const gtfsReducedShapesSchema = new GtfsReducedShapesSchema({
          databaseVersion: process.env.DATABASE_VERSION,
          agencyKey: data[j].agency_key,
          shapeId: uniqueShape_id[j],
          shapeCoordinates: pathArray,
          tripId: tripIdArray,
          busStopsId: "To be completed",
          busStopsCoordinates: "To be completed",
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

        j++
      } while (j < uniqueShape_id.length)

      console.log("Read db cycle ended:" + i + " documents retrieved")
      console.log("Converted to: " + uniqueShape_id.length + " separate routes")
    } catch (err) {
      console.log("Error in createReducedShapeData: ", err)
    }
  })
  console.log("Reduced Shape data saved to database")
}
