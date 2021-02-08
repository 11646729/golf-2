const fs = require("fs")
const path = require("path")
import { GtfsStopSchema } from "../../../models/transportModels/v1/gtfsStopSchema"
import { GtfsReducedShapesSchema } from "../../../models/transportModels/v1/gtfsReducedShapesSchema"
import { GtfsReducedRouteSchema } from "../../../models/transportModels/v1/gtfsReducedRouteSchema"
import { GtfsReducedStopSchema } from "../../../models/transportModels/v1/gtfsReducedStopSchema"
import { GtfsPanelListRouteSchema } from "../../../models/transportModels/v1/gtfsPanelListRouteSchema"

// -------------------------------------------------------
// Catalogue home page
// Path: localhost:5000/api/gtfsTransport/
// -------------------------------------------------------
export const transportIndex = async (req, res) => {
  res.send({ response: "I am alive" }).status(200)
}

// -------------------------------------------------------
// Stops
// Path: localhost:5000/api/gtfsTransport/stops
// -------------------------------------------------------
export const getAllStops = async (req, res) => {
  GtfsStopSchema.find({})
    .then((gtfsStopSchema) => res.json(gtfsStopSchema))
    .catch((err) => res.status(400).json("Error " + err))
}

// -------------------------------------------------------
// Stops
// Path: localhost:5000/api/gtfsTransport/stops/:id
// -------------------------------------------------------
export const getOneStop = async (req, res) => {
  const id = req.params.id

  GtfsStopSchema.findById(id)
    .then((data) => {
      if (!data)
        res
          .status(404)
          .send({ message: "Not found gtfsTransport stop with id " + id })
      else res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Error retrieving gtfsTransport stop with id= " + id,
      })
    })
}

// -------------------------------------------------------
// Reduced Shapes
// Path: localhost:5000/api/gtfsTransport/shapes
// -------------------------------------------------------
export const getAllReducedShapes = async (req, res) => {
  GtfsReducedShapesSchema.find({ shapeId: "25774" })
    // GtfsReducedShapesSchema.find({})
    .then((gtfsReducedShapesSchema) => res.json(gtfsReducedShapesSchema))
    .catch((err) => res.status(400).json("Error " + err))
}

// -------------------------------------------------------
// Reduced Shapes
// Path: localhost:5000/api/gtfsTransport/shapes/:id
// -------------------------------------------------------
export const getOneReducedShape = async (req, res) => {
  const id = req.params.id

  GtfsReducedShapesSchema.findById(id)
    .then((data) => {
      if (!data)
        res
          .status(404)
          .send({ message: "Not found gtfsTransport shape with id " + id })
      else res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Error retrieving gtfsTransport shape with id= " + id,
      })
    })
}

// -------------------------------------------------------
// Routes
// Path: localhost:5000/api/gtfsTransport/routes/:id
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
// Reduced Routes
// Path: localhost:5000/api/gtfsTransport/gtfsReducedRoutes
// -------------------------------------------------------
export const getAllReducedRoutes = async (req, res) => {
  GtfsReducedRouteSchema.find({})
    .then((gtfsReducedRouteSchema) => res.json(gtfsReducedRouteSchema))
    .catch((err) => res.status(400).json("Error " + err))
}

// -------------------------------------------------------
// Reduced Routes
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
// Panel List Routes
// Path: localhost:5000/api/gtfsTransport/gtfsPanelListRoutes
// -------------------------------------------------------
export const getAllPanelListRoutes = async (req, res) => {
  GtfsPanelListRouteSchema.find({})
    .then((gtfsPanelListRouteSchema) => res.json(gtfsPanelListRouteSchema))
    .catch((err) => res.status(400).json("Error " + err))
}

// -------------------------------------------------------
// Panel List Routes
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
// Panel List Routes
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
// Reduced Stops
// Path: localhost:5000/api/gtfsTransport/gtfsReducedStops
// -------------------------------------------------------
export const getAllReducedStops = async (req, res) => {
  GtfsReducedStopSchema.find({})
    .then((gtfsReducedStopSchema) => res.json(gtfsReducedStopSchema))
    .catch((err) => res.status(400).json("Error " + err))
}

// -------------------------------------------------------
// Reduced Stops
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

// -------------------------------------------------------
// Stops
// Path: localhost:5000/api/gtfsTransport/stops/
// -------------------------------------------------------
// export const directDeleteAllStops = async () => {
//   GtfsStopSchema.deleteMany({}, (err) => {
//     if (err) {
//       console.log("Some error occurred while removing all bus stops")
//     } else {
//       console.log("All bus stops were deleted successfully!")
//     }
//   })
// }

// -------------------------------------------------------
// Reduced Shapes
// Path: localhost:5000/api/gtfsTransport/shapes/
// -------------------------------------------------------
// export const directDeleteAllShapes = async () => {
//   GtfsReducedShapesSchema.deleteMany({}, (err) => {
//     if (err) {
//       console.log("Some error occurred while removing all route shapes")
//     } else {
//       console.log("All route shapes were deleted successfully!")
//     }
//   })
// }
