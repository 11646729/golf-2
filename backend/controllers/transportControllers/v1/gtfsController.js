const fs = require("fs")
const path = require("path")
import { GtfsRouteSchema } from "../../../models/transportModels/v1/gtfsRouteSchema"
import { GtfsPanelListRouteSchema } from "../../../models/transportModels/v1/gtfsPanelListRouteSchema"
import { GtfsStopSchema } from "../../../models/transportModels/v1/gtfsStopSchema"

// -------------------------------------------------------
// Catalogue Home page
// Path: localhost:5000/api/gtfsTransport/
// -------------------------------------------------------
export const transportIndex = async (req, res) => {
  res.send({ response: "I am alive" }).status(200)
}

// -------------------------------------------------------
// Filenames
// Path: localhost:5000/api/gtfsTransport/filenames
// -------------------------------------------------------
export const getGeojsonFilenames = async (req, res) => {
  var geojsonDirectory = path.resolve(
    "./geojson/Hamilton Ontario Street Railway"
  )

  fs.readdir(geojsonDirectory, function (err, files) {
    var filesList = files.filter(function (e) {
      return path.extname(e).toLowerCase() === ".geojson"
    })
    if (err) {
      throw err
    }

    res.send(filesList)
  })
}
// -------------------------------------------------------
// Bus Routes
// Path: localhost:5000/api/gtfsTransport/gtfsRoutes/:id
// -------------------------------------------------------
export const getOneRoute = async (req, res) => {
  const rawGeojson =
    "/Users/briansmith/Documents/GTD/golf-2/backend/geojson/Hamilton Ontario Street Railway/" +
    req.query.id

  fs.readFile(rawGeojson, "utf8", (err, data) => {
    if (err) {
      throw err
    }

    res.send(JSON.parse(data))
  })
}

// -------------------------------------------------------
// Bus Routes
// Path: localhost:5000/api/gtfsTransport/gtfsRoutes
// -------------------------------------------------------
export const getAllRoutes = async (req, res) => {
  GtfsRouteSchema.find({})
    .then((gtfsRouteSchema) => res.json(gtfsRouteSchema))
    .catch((err) => res.status(400).json("Error " + err))
}

// -------------------------------------------------------
// Bus Routes
// Path: localhost:5000/api/gtfsTransport/gtfsRoutes
// -------------------------------------------------------
export const deleteAllRoutes = async (req, res) => {
  GtfsRouteSchema.deleteMany({}, (err) => {
    if (err) {
      res
        .status(500)
        .send("An unspecified error occurred while removing all Routes!")
    } else {
      res.status(200).send("All Routes were deleted in the mongodb database")
    }
  })
}

// -------------------------------------------------------
// Panel List Bus Routes
// Path: localhost:5000/api/gtfsTransport/gtfsPanelListRoutes
// -------------------------------------------------------
export const getAllPanelListRoutes = async (req, res) => {
  GtfsPanelListRouteSchema.find({})
    .then((gtfsPanelListRouteSchema) => res.json(gtfsPanelListRouteSchema))
    .catch((err) => res.status(400).json("Error " + err))
}

// -------------------------------------------------------
// Panel List Bus Routes
// Path: localhost:5000/api/gtfsTransport/gtfsPanelListRoutes
// -------------------------------------------------------
export const putOnePanelListRoutes = async (req, res) => {
  const filter = { routeNumber: req.body.routeNumber }
  const update = { routeVisible: req.body.routeVisible }

  GtfsPanelListRouteSchema.findOneAndUpdate(filter, update)
    .then((gtfsPanelListRouteSchema) => res.json(gtfsPanelListRouteSchema))
    .catch((err) => res.status(400).json("Error " + err))
}

// -------------------------------------------------------
// Panel List Bus Routes
// Path: localhost:5000/api/gtfsTransport/gtfsPanelListRoutes
// -------------------------------------------------------
export const deleteAllPanelListRoutes = async (req, res) => {
  GtfsPanelListRouteSchema.deleteMany({}, (err) => {
    if (err) {
      res
        .status(500)
        .send(
          "An unspecified error occurred while removing all Panel List Routes!"
        )
    } else {
      res
        .status(200)
        .send("All Panel List Routes were deleted in the mongodb database")
    }
  })
}

// -------------------------------------------------------
// Bus Stops
// Path: localhost:5000/api/gtfsTransport/gtfsStops
// -------------------------------------------------------
export const getAllStops = async (req, res) => {
  GtfsStopSchema.find({})
    .then((gtfsStopSchema) => res.json(gtfsStopSchema))
    .catch((err) => res.status(400).json("Error " + err))
}

// -------------------------------------------------------
// Bus Stops
// Path: localhost:5000/api/gtfsTransport/gtfsStops
// -------------------------------------------------------
export const deleteAllStops = async (req, res) => {
  GtfsStopSchema.deleteMany({}, (err) => {
    if (err) {
      res
        .status(500)
        .send("An unspecified error occurred while removing all Stops!")
    } else {
      res.status(200).send("All Stops were deleted in the mongodb database")
    }
  })
}
