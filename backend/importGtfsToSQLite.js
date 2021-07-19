import gtfs from "gtfs"
import config from "./configHamilton.json"
// import config from "./configMetro.json"
// import config from "./configDublin.json"
// import { openSqlDbConnection, closeSqlDbConnection } from "./fileUtilities"

// Function to import GTFS data to SQLite database
export var importGtfsToSQLite = async () => {
  try {
    gtfs
      .import(config)
      .then(() => {
        console.log("Import Successful")
      })
      .then(() => {
        // reduceShapes()
      })
      .catch((err) => {
        console.error(err)
      })
  } catch (error) {
    console.log("\n\nError in importGtfsToSQLite: ", error)
  }
}

// -------------------------------------------------------
// Reduce Bus Route Shapes
// Local Function
// -------------------------------------------------------
// export var reduceShapes = () => {
//   // Open a Database Connection
//   let db = null
//   db = openSqlDbConnection(process.env.HAMILTON_SQL_URI)

//   if (db !== null) {
//     try {
//       // Create the new consolidatedshapes table
//       createConsolidatedShapesTable(db)

//       // Fetch a list of unique shape_id & store in an array
//       getShapeIds(db)

//       // Close the Database Connection
//       closeSqlDbConnection(db)
//     } catch (e) {
//       console.error(e.message)
//     }
//   } else {
//     console.error("Cannot connect to database")
//   }
// }

// -------------------------------------------------------
// Create consolidatedshapes Table from SQLite database
// Path:
// -------------------------------------------------------
// export var createConsolidatedShapesTable = (db) => {
//   const consolidatedShapes_create =
//     "CREATE TABLE IF NOT EXISTS consolidatedshapes (shapeId varchar(255) NOT NULL, shapeCoordinates blob NOT NULL, defaultRouteColor varchar(255) NOT NULL, actualRouteColor varchar(255))"
//   db.get(consolidatedShapes_create, [], (err) => {
//     if (err) {
//       return console.error(err.message)
//     }
//     console.log("consolidatedshapes Table successfully created")
//   })
// }

// -------------------------------------------------------
// Function to fetch all ShapeIDs from Shapes Table
// Path:
// -------------------------------------------------------
// export var getShapeIds = (db) => {
//   let j = 0

//   let sql = `SELECT DISTINCT shape_id FROM shapes ORDER BY shape_id`
//   db.all(sql, [], (err, results) => {
//     if (err) {
//       return console.error(err.message)
//     }

//     do {
//       getShape(db, results[j].shape_id)

//       j++
//     } while (j < results.length)
//   })
// }

// -------------------------------------------------------
// Bus Route Shape
// Path: localhost:5000/api/transport/shape/
// -------------------------------------------------------
// export const getShape = (db, shapeID) => {
//   if (db !== null) {
//     try {
//       let sql = `SELECT shape_id, shape_pt_lat, shape_pt_lon, shape_pt_sequence FROM shapes WHERE shape_id = ${shapeID} ORDER BY shape_id, shape_pt_sequence`
//       db.all(sql, [], (err, results) => {
//         if (err) {
//           return console.error(err.message)
//         }

//         consolidateShapeCoordinates(db, results, shapeID)
//       })
//     } catch (e) {
//       console.error(e.message)
//     }
//   } else {
//     console.error("Cannot connect to database")
//   }
// }

// -------------------------------------------------------
// Local function
// Function to put all Shapes coordinates into an array
// -------------------------------------------------------
// const consolidateShapeCoordinates = (db, results, shapeID) => {
//   // Guard clauses
//   if (results == null) return

//   let j = 0
//   let pathArray = []
//   let loopend = results.length

//   do {
//     var coords = {
//       lat: results[j].shape_pt_lat,
//       lng: results[j].shape_pt_lon,
//     }

//     pathArray.push(coords)

//     j++
//   } while (j < loopend)

//   console.log(pathArray)

//   const defaultRouteColor = "#FF5733"
//   const actualRouteColor = "#FF5733"

//   const newResults = [shapeID, pathArray, defaultRouteColor, actualRouteColor]

//   // Don't change the routine below
//   const sql =
//     "INSERT INTO consolidatedshapes (shapeId, shapeCoordinates, defaultRouteColor, actualRouteColor) VALUES ($1, $2, $3, $4)"

//   db.run(sql, newResults, function (err) {
//     if (err) {
//       return console.error(err.message)
//     }
//     console.log("newResults saved")
//   })
// }
