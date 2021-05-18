import { PortArrivalSchema } from "../../../models/cruiseModels/v1/portArrivalSchema"
import { CoordsSchema } from "../../../models/commonModels/v1/coordsSchema"
import {
  openSqlDbConnection,
  closeSqlDbConnection,
} from "../../../fileUtilities"

// -------------------------------------------------------
// Catalogue Home page
// Path: localhost:5000/api/cruise/
// -------------------------------------------------------
export const index = async (req, res) => {
  res.send({ response: "I am alive" }).status(200)
}

// -------------------------------------------------------
// Create Port Arrivals Table in the SQLite Database
// Path: Function called in switchBoard
// -------------------------------------------------------
export const createEmptyPortArrivalsTable = async () => {
  // Open a Database Connection
  let db = null
  db = openSqlDbConnection(process.env.SQL_URI)

  if (db !== null) {
    try {
      const sql =
        "CREATE TABLE IF NOT EXISTS portarrivals (portarrivalid INTEGER PRIMARY KEY AUTOINCREMENT, databaseversion INTEGER, portname TEXT NOT NULL, portunlocode TEXT NOT NULL, portcoordinatelng REAL CHECK( portcoordinatelng >= -180 AND portcoordinatelng <= 180 ), portcoordinatelat REAL CHECK( portcoordinatelat >= -90 AND portcoordinatelat <= 90 ), vesselshortcruisename TEXT, vesseleta TEXT, vesseletd TEXT, vesselnameurl TEXT)"

      db.all(sql, [], (err) => {
        if (err) {
          return console.error(err.message)
        }
        console.log("portarrivals Table successfully created")
      })

      // Disconnect from the SQLite database
      closeSqlDbConnection(db)
    } catch (e) {
      console.error(e.message)
    }
  } else {
    console.error("Cannot connect to database")
  }
}

// -------------------------------------------------------
// Save Port Arrivals details to SQLite database
// Path:
// -------------------------------------------------------
export const savePortArrival = (db, newPortArrival) => {
  // Guard clause for null Port Arrival details
  if (newPortArrival == null) return
  if (db === null) return

  try {
    // Count the records in the database
    let sql = "SELECT COUNT(portarrivalid) AS count FROM portarrivals"

    // Must be get to work - db.all doesn't work
    db.get(sql, [], (err, results) => {
      if (err) {
        return console.error(err.message)
      }
      // console.log("Record Count Before Insertion: ", results.count)
    })

    // Don't change the routine below
    const sql1 =
      "INSERT INTO portarrivals (databaseversion, portname, portunlocode, portcoordinatelng, portcoordinatelat, vesselshortcruisename, vesseleta, vesseletd, vesselnameurl) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)"

    db.run(sql1, newPortArrival, function (err) {
      if (err) {
        // console.log("Here")
        return console.error(err.message)
      }
      // console.warn("New id of inserted portarrival:", this.lastID)
    })
  } catch (err) {
    console.error("Error in SQLsavePortArrival: ", err)
  }
}

// -------------------------------------------------------
// Port Arrivals
// Path localhost:5000/api/cruise/portArrivals
// -------------------------------------------------------
// export function getPortArrivals(req, res) {
//   PortArrivalSchema.find({})
//     .then((data) => {
//       res.send(data)
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message || "Some error ocurred while retrieving portArrivals.",
//       })
//     })
// }

// -------------------------------------------------------
// Port Arrivals
// Path localhost:5000/api/cruise/portArrivals/:id
// -------------------------------------------------------
// export function getPortArrival(req, res) {
//   const id = req.params.id

//   PortArrivalSchema.findById(id)
//     .then((data) => {
//       if (!data)
//         res.status(404).send({ message: "Not found portArrival with id " + id })
//       else res.send(data)
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: err.message || "Error retrieving portArrival with id= " + id,
//       })
//     })
// }

// -------------------------------------------------------
// Port Arrivals
// Path localhost:5000/api/cruise/portArrivals/:id
// -------------------------------------------------------
// export function putPortArrival(req, res) {
//   if (!req.body) {
//     return res.status(400).send({
//       message: "Data to update cannot be empty!",
//     })
//   }

//   const id = req.params.id

//   PortArrivalSchema.findByIdAndUpdate(id, req.body, {
//     useFindAndModify: false,
//   })
//     .then((data) => {
//       if (!data)
//         res.status(404).send({
//           message:
//             "Cannnot update portArrivals with id=${id}. Maybe portArrivals was not found!",
//         })
//       else res.send({ message: "PortArrivals was updated successfully." })
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: err.message || "Error updating portArrivals with id= " + id,
//       })
//     })
// }

// -------------------------------------------------------
// Delete all Port Arrivals from SQLite database
// Path:
// -------------------------------------------------------
export const deleteAllPortArrivals = (db) => {
  // Guard clause for null Database Connection
  if (db === null) return

  try {
    const sql_insert = "DELETE FROM portarrivals"
    db.all(sql_insert, [], (err, results) => {
      if (err) {
        return console.error(err.message)
      }
      console.warn("All portarrivals deleted")
    })

    // Reset the id number
    const sql_reset =
      "UPDATE sqlite_sequence SET seq = 0 WHERE name = 'portarrivals'"
    db.all(sql_reset, [], (err, results) => {
      if (err) {
        return console.error(err.message)
      }
      console.warn("Reset portarrivals id number")
    })
  } catch (err) {
    console.error("Error in deleteAllPortArrivals: ", err)
  }
}
