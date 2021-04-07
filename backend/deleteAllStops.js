import { StopSchema } from "./models/transportModels/v1/stopSchema"

export const deleteAllStops = async (req, res) => {
  // Firstly delete all existing Stops in the database
  await StopSchema.deleteMany({})
    .then((res) => {
      console.log("No of Stops successfully deleted: ", res.deletedCount)
    })
    .catch((err) => {
      console.log(err.message || "An error occurred while removing all Stops")
    })
}
