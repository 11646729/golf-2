import { GtfsReducedShapesSchema } from "./models/transportModels/v1/gtfsReducedShapesSchema"
import { GtfsTripsSchema } from "./models/transportModels/v1/gtfsTripsSchema"
import { TripIdSchema } from "./models/commonModels/v1/tripIdSchema"

export const importTripIdReducedShapeData = async () => {
  console.log("Started Importing Trips to ReducedShape data")

  // Step 1: Fetch all data from reducedshapes collection
  const reducedShapeCollection = await GtfsReducedShapesSchema.find({})

  // Step 2: Setup loop over reducedShapeCollection
  let i = 0
  do {
    // Step 3: Fetch all trip_id data from trips collection
    const trip_idCollection = await GtfsTripsSchema.find({
      shape_id: reducedShapeCollection[i].shapeId,
    })

    // Step 4: Setup loop over trip_idCollection & push onto tripIdArray
    let tripIdArray = []
    let j = 0
    do {
      const tripIdSchema = new TripIdSchema({
        tripId: trip_idCollection[j].trip_id,
      })

      tripIdArray.push(tripIdSchema)
      j++
    } while (j < trip_idCollection.length)

    // Step 5: Sort all trips by trip_id
    tripIdArray.sort()

    // Step 6: Now add the trips to the reducedShapeCollection
    reducedShapeCollection[i].tripId = tripIdArray

    // Step 7: Save the updated reducedShapeCollection
    await reducedShapeCollection[i].save()

    i++
  } while (i < reducedShapeCollection.length)

  console.log("Finished Importing Trips to ReducedShape data")
  console.log("Data saved to disk")
}
