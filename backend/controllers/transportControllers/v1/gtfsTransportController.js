import { GtfsStopSchema } from "../../../models/transportModels/v1/gtfsStopSchema"
import { GtfsReducedShapesSchema } from "../../../models/transportModels/v1/gtfsReducedShapesSchema"
import { GtfsReducedRouteSchema } from "../../../models/transportModels/v1/gtfsReducedRouteSchema"
import { GtfsReducedStopSchema } from "../../../models/transportModels/v1/gtfsReducedStopSchema"
import { GtfsUniqueReducedRouteSchema } from "../../../models/transportModels/v1/gtfsUniqueReducedRouteSchema"

const fs = require("fs")
var path = require("path")

// Path localhost:5000/api/gtfsTransport/
export const gtfsTransportIndex = async (req, res) => {
  res.send({ response: "I am alive" }).status(200)
}

// Path localhost:5000/api/gtfsTransport/stops
export const gtfsGetAllStops = async (req, res) => {
  GtfsStopSchema.find({})
    .then((gtfsStopSchema) => res.json(gtfsStopSchema))
    .catch((err) => res.status(400).json("Error " + err))
}

// Path localhost:5000/api/gtfsTransport/stops/:id
export const gtfsGetOneStop = async (req, res) => {
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

// Path localhost:5000/api/gtfsTransport/shapes
export const gtfsGetAllReducedShapes = async (req, res) => {
  GtfsReducedShapesSchema.find({ shapeId: "25774" })
    // GtfsReducedShapesSchema.find({})
    .then((gtfsReducedShapesSchema) => res.json(gtfsReducedShapesSchema))
    .catch((err) => res.status(400).json("Error " + err))
}

// Path localhost:5000/api/gtfsTransport/shapes/:id
export const gtfsGetOneReducedShape = async (req, res) => {
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

// Path localhost:5000/api/gtfsTransport/routes/:id
export const gtfsGetOneRoute = async (req, res) => {
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

// Path localhost:5000/api/gtfsTransport/filenames
export const gtfsGetGeojsonFilenames = async (req, res) => {
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

// Path localhost:5000/api/gtfsTransport/reducedRoutes
export const gtfsGetAllReducedRoutes = async (req, res) => {
  GtfsReducedRouteSchema.find({})
    .then((gtfsReducedRouteSchema) => res.json(gtfsReducedRouteSchema))
    .catch((err) => res.status(400).json("Error " + err))
}

// Path localhost:5000/api/gtfsTransport/reducedRoutes
export const gtfsPutOneReducedRoutes = async (req, res) => {
  console.log("In gtfsTransportController", req.body)

  const filter = { busReducedRoutes: req.body.busRouteNumber }
  const update = { routeVisible: req.body.routeVisible }

  GtfsReducedRouteSchema.findOneAndUpdate(filter, update)
    .then((gtfsReducedRouteSchema) => res.json(gtfsReducedRouteSchema))
    .catch((err) => res.status(400).json("Error " + err))
}

// Path localhost:5000/api/gtfsTransport/reducedRoutes
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

// Path localhost:5000/api/gtfsTransport/uniqueReducedRoutes
export const gtfsGetAllUniqueReducedRoutes = async (req, res) => {
  GtfsUniqueReducedRouteSchema.find({})
    .then((gtfsUniqueReducedRouteSchema) =>
      res.json(gtfsUniqueReducedRouteSchema)
    )
    .catch((err) => res.status(400).json("Error " + err))
}

// Path localhost:5000/api/gtfsTransport/reducedStops
export const gtfsGetAllReducedStops = async (req, res) => {
  GtfsReducedStopSchema.find({})
    .then((gtfsReducedStopSchema) => res.json(gtfsReducedStopSchema))
    .catch((err) => res.status(400).json("Error " + err))
}

// Path localhost:5000/api/gtfsTransport/reducedStops
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

// Direct call to delete all bus stops in the database
export const directDeleteAllStops = async () => {
  GtfsStopSchema.deleteMany({}, (err) => {
    if (err) {
      console.log("Some error occurred while removing all bus stops")
    } else {
      console.log("All bus stops were deleted successfully!")
    }
  })
}

// Direct call to delete all route shapes in the database
export const directDeleteAllShapes = async () => {
  GtfsReducedShapesSchema.deleteMany({}, (err) => {
    if (err) {
      console.log("Some error occurred while removing all route shapes")
    } else {
      console.log("All route shapes were deleted successfully!")
    }
  })
}
