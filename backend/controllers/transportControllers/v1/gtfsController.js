const fs = require("fs")
const path = require("path")
import { GtfsReducedRouteSchema } from "../../../models/transportModels/v1/gtfsReducedRouteSchema"
import { GtfsPanelListRouteSchema } from "../../../models/transportModels/v1/gtfsPanelListRouteSchema"
import { GtfsReducedStopSchema } from "../../../models/transportModels/v1/gtfsReducedStopSchema"

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
// Reduced Bus Routes
// Path: localhost:5000/api/gtfsTransport/gtfsReducedRoutes/:id
// -------------------------------------------------------
export const getOneReducedRoute = async (req, res) => {
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
// Reduced Bus Routes
// Path: localhost:5000/api/gtfsTransport/gtfsReducedRoutes
// -------------------------------------------------------
export const getAllReducedRoutes = async (req, res) => {
  GtfsReducedRouteSchema.find({})
    .then((gtfsReducedRouteSchema) => res.json(gtfsReducedRouteSchema))
    .catch((err) => res.status(400).json("Error " + err))
}

// -------------------------------------------------------
// Reduced Bus Routes
// Path: localhost:5000/api/gtfsTransport/gtfsReducedRoutes
// -------------------------------------------------------
export const deleteAllReducedRoutes = async (req, res) => {
  GtfsReducedRouteSchema.deleteMany({}, (err) => {
    if (err) {
      res
        .status(500)
        .send(
          "An unspecified error occurred while removing all Reduced Routes!"
        )
    } else {
      res
        .status(200)
        .send("All Reduced Route data was deleted in the mongodb database")
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
        .send("All Panel List Route data was deleted in the mongodb database")
    }
  })
}

// -------------------------------------------------------
// Reduced Bus Stops
// Path: localhost:5000/api/gtfsTransport/gtfsReducedStops
// -------------------------------------------------------
export const getAllReducedStops = async (req, res) => {
  GtfsReducedStopSchema.find({})
    .then((gtfsReducedStopSchema) => res.json(gtfsReducedStopSchema))
    .catch((err) => res.status(400).json("Error " + err))
}

// -------------------------------------------------------
// Reduced Bus Stops
// Path: localhost:5000/api/gtfsTransport/gtfsReducedStops
// -------------------------------------------------------
export const deleteAllReducedStops = async (req, res) => {
  GtfsReducedStopSchema.deleteMany({}, (err) => {
    if (err) {
      res
        .status(500)
        .send("An unspecified error occurred while removing all Reduced Stops!")
    } else {
      res
        .status(200)
        .send("All Reduced Stops data was deleted in the mongodb database")
    }
  })
}
