import { TemperatureSchema } from "../../../models/weatherModels/v1/temperatureSchema"
import {
  openSqlDbConnection,
  closeSqlDbConnection,
} from "../../../fileUtilities"

// -------------------------------------------------------
// Catalogue Home page
// Path: localhost:5000/api/weather/
// -------------------------------------------------------
export function index(req, res) {
  res.send({ response: "I am alive" }).status(200)
}

// -------------------------------------------------------
// Get all Temperature Readings
// Path: localhost:5000/api/weather/temperatures
// -------------------------------------------------------
export const getAllTemperatureReadings = async (req, res) => {
  try {
    let db = null

    db = await openSqlDbConnection(process.env.SQL_URI)

    if (db !== null) {
      const sql = "SELECT * FROM Temperatures ORDER BY temperatureId"
      const result = await db.all(sql)

      closeSqlDbConnection(db)

      res.send(result)
    }
  } catch (e) {
    console.error(e.message)
  }
}

// Path localhost:5000/api/weather/temperatures/:id
// export function findOne(req, res) {
//   const id = req.params.id

//   TemperatureSchema.findById(id)
//     .then((data) => {
//       if (!data)
//         res.status(404).send({ message: "Not found temperature with id " + id })
//       else res.send(data)
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: err.message || "Error retrieving temperature with id= " + id,
//       })
//     })
// }

// Direct call to delete all weather data in the database
export const directDeleteAll = async (req, res) => {
  await TemperatureSchema.deleteMany({})
    .then((data) => {
      res.send({
        message:
          "${data.deletedCount} temperature readings were deleted successfully!",
      })
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while removing all temperature readings",
      })
    })
}
