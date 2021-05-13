import { VesselSchema } from "../../../models/cruiseModels/v1/vesselSchema"
import {
  openSqlDbConnection,
  closeSqlDbConnection,
} from "../../../fileUtilities"

// -------------------------------------------------------
// Vessels
// Path localhost:5000/api/cruise/vessel
// -------------------------------------------------------
export function getVessels(req, res) {
  VesselSchema.find({})
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error ocurred while retrieving vessel",
      })
    })
}

// -------------------------------------------------------
// Create Vessels Table in the SQLite Database
// Path: Function called in switchBoard
// -------------------------------------------------------
export const SQLcreateEmptyVesselsTable = async () => {
  // Open a Database Connection
  let db = null
  db = openSqlDbConnection(process.env.SQL_URI)

  if (db !== null) {
    try {
      const sql =
        // "CREATE TABLE IF NOT EXISTS vessels (vesselid INTEGER PRIMARY KEY AUTOINCREMENT, databaseversion INTEGER, vesselnameurl VARCHAR(100) NOT NULL, title VARCHAR(100) NOT NULL, vesseltype VARCHAR(100) NOT NULL, vesselname VARCHAR(100) NOT NULL, vesselflag VARCHAR(100) NOT NULL, vesselshortoperator VARCHAR(100) NOT NULL, vessellongoperator VARCHAR(100) NOT NULL, vesselyearbuilt VARCHAR(100) NOT NULL, vessellengthmetres INTEGER, vesselwidthmetres INTEGER, vesselgrosstonnage INTEGER, vesselaveragespeedknots VARCHAR(100), vesselmaxspeedknots INTEGER, vesselaveragedraughtmetres INTEGER, vesselimonumber INTEGER, vesselmmsnumber INTEGER, vesselcallsign VARCHAR(100), vesseltypicalpassengers VARCHAR(100), vesseltypicalcrew INTEGER)"
        "CREATE TABLE IF NOT EXISTS vessels (vesselid INTEGER PRIMARY KEY AUTOINCREMENT, databaseversion INTEGER, vesselnameurl TEXT NOT NULL, title TEXT NOT NULL, vesseltype TEXT NOT NULL, vesselname TEXT NOT NULL, vesselflag TEXT NOT NULL, vesselshortoperator TEXT NOT NULL, vessellongoperator TEXT NOT NULL, vesselyearbuilt TEXT NOT NULL, vessellengthmetres INTEGER, vesselwidthmetres INTEGER, vesselgrosstonnage INTEGER, vesselaveragespeedknots REAL, vesselmaxspeedknots REAL, vesselaveragedraughtmetres REAL, vesselimonumber INTEGER, vesselmmsnumber INTEGER, vesselcallsign TEXT NOT NULL, vesseltypicalpassengers TEXT, vesseltypicalcrew INTEGER)"

      db.all(sql, [], (err) => {
        if (err) {
          return console.error(err.message)
        }
        console.log("vessels Table successfully created")
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
// Vessels
// Path localhost:5000/api/cruise/vessel/:id
// -------------------------------------------------------
export function getVessel(req, res) {
  const id = req.params.id

  VesselSchema.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found vessel with id " + id })
      else res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving vessel with id= " + id,
      })
    })
}

// -------------------------------------------------------
// Vessels
// Path localhost:5000/api/cruise/vessel
// -------------------------------------------------------
export function postVessel(req, res) {
  // Validate request
  if (!req.body.location_lat || !req.body.location_lng) {
    res.status(400).send({ message: "Coordinates cannot be empty!" })
    return
  }

  const vessel = new VesselSchema({
    databaseVersion: req.body.databaseVersion,
    vesselNameUrl: req.body.vessel_name_url,
    title: req.body.title,
    vesselType: req.body.vessel_type,
    vesselName: req.body.vessel_name,
    vesselFlag: req.body.vessel_flag,
    vesselShortOperator: req.body.vessel_short_operator,
    vesselLongOperator: req.body.vessel_long_operator,
    vesselYearBuilt: req.body.vessel_year_built,
    vesselLengthMetres: req.body.vessel_length_metres,
    vesselWidthMetres: req.body.vessel_width_metres,
    vesselGrossTonnage: req.body.vessel_gross_tonnage,
    vesselAverageSpeedKnots: req.body.vessel_average_speed_knots,
    vesselMaxSpeedKnots: req.body.vessel_max_speed_knots,
    vesselAverageDraughtMetres: req.body.vessel_average_draught_metres,
    vesselImoNumber: req.body.vessel_imo_number,
    vesselMmsiNumber: req.body.vessel_mmsi_number,
    vesselCallsign: req.body.vessel_callsign,
    vesselTypicalPassengers: req.body.vessel_typical_passengers,
    vesselTypicalCrew: req.body.vessel_typical_crew,
  })

  // Save the vessel in the database
  vessel
    .save()
    .then((data) => {
      res.send(data)
    })
    .catch((err) =>
      res.status(500).send({
        message:
          err.message || "Some error ocurred while creating the new vessel",
      })
    )
}

// -------------------------------------------------------
// Vessels
// Path localhost:5000/api/cruise/vessel/:id
// -------------------------------------------------------
export function putVessel(req, res) {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update cannot be empty!",
    })
  }

  const id = req.params.id

  VesselSchema.findByIdAndUpdate(id, req.body, {
    useFindAndModify: false,
  })
    .then((data) => {
      if (!data)
        res.status(404).send({
          message:
            "Cannnot update vessel with id=${id}. Maybe vessel was not found!",
        })
      else res.send({ message: "Vessel was updated successfully." })
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating vessel with id= " + id,
      })
    })
}

// -------------------------------------------------------
// Delete all Vessels from SQLite database
// Path:
// -------------------------------------------------------
export const deleteAllVessels = () => {
  // Firstly delete all existing Vessels from the database
  VesselSchema.deleteMany({})
    .then((res) => {
      console.log("No of old Vessels deleted: ", res.deletedCount)
    })
    .catch((err) => {
      console.log(err.message)
    })
}

// -------------------------------------------------------
// Delete all Vessels from SQLite database
// Path:
// -------------------------------------------------------
export const SQLdeleteAllVessels = () => {
  // Open a Database Connection
  let db = null
  db = openSqlDbConnection(process.env.SQL_URI)

  if (db !== null) {
    try {
      const sql_insert = "DELETE FROM vessels"
      db.all(sql_insert, [], (err, results) => {
        if (err) {
          return console.error(err.message)
        }
        console.warn("All Vessels deleted")
      })

      // Close the Database Connection
      closeSqlDbConnection(db)
    } catch (err) {
      console.error("Error in deleteAllVessels: ", err)
    }
  } else {
    console.error("Cannot connect to database")
  }
}
