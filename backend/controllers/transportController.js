import { RouteSchema } from "../models/routeSchema"
import { openSqlDbConnection, closeSqlDbConnection } from "../fileUtilities"

// -------------------------------------------------------
// Catalogue Home page
// Path: localhost:5000/api/transport/
// -------------------------------------------------------
export const index = async (req, res) => {
  res.send({ response: "I am alive" }).status(200)
}

// -------------------------------------------------------
// Bus Route Shapes
// Path: localhost:5000/api/transport/shapes/
// -------------------------------------------------------
export const getAllShapes = (req, res) => {
  // Open a Database Connection
  let db = null
  db = openSqlDbConnection(process.env.HAMILTON_SQL_URI)

  let newResults = null
  let shapeID = req.query.shape

  if (db !== null) {
    try {
      let sql = `SELECT shape_id, shape_pt_lat, shape_pt_lon, shape_pt_sequence FROM shapes WHERE shape_id = ${shapeID} ORDER BY shape_id, shape_pt_sequence`
      db.all(sql, [], (err, results) => {
        if (err) {
          return console.error(err.message)
        }

        newResults = consolidateShapeCoordinates(results, shapeID)

        res.send(newResults)
      })

      // Close the Database Connection
      closeSqlDbConnection(db)
    } catch (e) {
      console.error(e.message)
    }
  } else {
    console.error("Cannot connect to database")
  }
}

// -------------------------------------------------------
// Bus Stops
// Path: localhost:5000/api/transport/stops/
// -------------------------------------------------------
export const getAllStops = (req, res) => {
  // Open a Database Connection
  let db = null
  db = openSqlDbConnection(process.env.HAMILTON_SQL_URI)

  if (db !== null) {
    try {
      let sql = `SELECT stop_id, stop_lat, stop_lon FROM stops ORDER BY stop_id`
      db.all(sql, [], (err, results) => {
        if (err) {
          return console.error(err.message)
        }

        res.send(results)
      })

      // Close the Database Connection
      closeSqlDbConnection(db)
    } catch (e) {
      console.error(e.message)
    }
  } else {
    console.error("Cannot connect to database")
  }
}

// -------------------------------------------------------
// Bus Routes
// Path: localhost:5000/api/transport/groutes/
// -------------------------------------------------------
export const getAllRoutes = async (req, res) => {
  RouteSchema.find(req.query)
    .then((routeSchema) => res.json(routeSchema))
    .catch((err) => res.status(400).json("Error " + err))
}

// Get Panel Selected Routes
export const getSelectedRoutes = async (req, res) => {
  const filter = { routeVisible: "true" }

  RouteSchema.find(filter)
    .then((routeSchema) => res.json(routeSchema))
    .catch((err) => res.status(400).json("Error " + err))
}

// Update Selected Routes
export const putSelectedRoutes = async (req, res) => {
  const filter = { routeNumber: req.body.routeNumber }
  const update = { routeVisible: req.body.routeVisible }

  RouteSchema.updateMany(filter, update)
    .then((routeSchema) => res.json(routeSchema))
    .catch((err) => res.status(400).json("Error " + err))
}

// -------------------------------------------------------
// Local function
// Function to put all Shapes coordinates into an array
// -------------------------------------------------------
const consolidateShapeCoordinates = (results, shapeID) => {
  // Guard clauses
  if (results == null) return

  let j = 0
  let pathArray = []
  let loopend = results.length
  let newResults = {}

  do {
    var coords = {
      lat: results[j].shape_pt_lat,
      lng: results[j].shape_pt_lon,
    }

    pathArray.push(coords)

    j++
  } while (j < loopend)

  newResults.shapeKey = shapeID
  newResults.shapeCoordinates = pathArray

  return newResults
}
