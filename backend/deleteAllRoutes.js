import { RouteSchema } from "./models/routeSchema"

export const deleteAllRoutes = async (req, res) => {
  // Firstly delete all existing Routes in the database
  await RouteSchema.deleteMany({})
    .then((res) => {
      console.log("No of Routes successfully deleted: ", res.deletedCount)
    })
    .catch((err) => {
      console.log(err.message || "An error occurred while removing all Routes")
    })
}
