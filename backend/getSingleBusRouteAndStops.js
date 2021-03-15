const fs = require("fs")
import { CoordsSchema } from "./models/commonModels/v1/coordsSchema"
import { GtfsRouteSchema } from "./models/transportModels/v1/gtfsRouteSchema"
import { GtfsStopSchema } from "./models/transportModels/v1/gtfsStopSchema"

// This routine is called from the individual route button
// -------------------------------------------------------

// getSingleBusRouteAndStops(routeFilePath, singleRouteFileName, outerLoop)

// Function to fetch data from a single GeoJson route file
export const getSingleBusRouteAndStops = async (
  routeFilePath,
  routeFileName,
  outerLoop
) => {
  const fileUrl = routeFilePath + routeFileName

  fs.readFile(fileUrl, "utf8", (err, data) => {
    if (err) {
      //   console.log("Error fetching data from a single geojson file")
      throw err
    }

    let busRoute = JSON.parse(data)

    // Now pass data from a single GeoJson route filename to reduceSaveBusRouteAndStops function
    reduceSaveBusRouteAndStops(
      busRoute,
      // JSON.parse(data),
      fileUrl,
      outerLoop
    )
  })
}

// Function to extract data for reduced dataset then save it in the mongodb database
const reduceSaveBusRouteAndStops = async (busRoute, fileUrl, outerLoop) => {
  // let reducedRoute = routeFileName.substr(0, routeFileName.indexOf("."))
  let reducedRoute = outerLoop * 1000
  // console.log("OuterLoop: ", outerLoop)
  // console.log(reducedRoute)

  let innerLoop = 0
  do {
    if (busRoute.features[innerLoop].geometry.type === "LineString") {
      // Change order of coordinates
      let i = 0
      let googleMapsCoords = []
      do {
        const coordsSchema = new CoordsSchema({
          lat: busRoute.features[innerLoop].geometry.coordinates[i][1],
          lng: busRoute.features[innerLoop].geometry.coordinates[i][0],
        })

        googleMapsCoords.push(coordsSchema)

        i++
      } while (i < busRoute.features[innerLoop].geometry.coordinates.length)

      // And save it in a gtfsRouteSchema collection
      const gtfsRouteSchema = new GtfsRouteSchema({
        databaseVersion: process.env.DATABASE_VERSION,
        routeFileUrl: fileUrl,
        routeVisible: false,
        agencyName: busRoute.features[innerLoop].properties.agency_name,
        agencyId: busRoute.features[innerLoop].properties.agency_id,
        markerType: busRoute.features[innerLoop].geometry.type,
        // routeKey: reducedRoute + "+" + innerLoop,
        stopKey: reducedRoute + innerLoop,
        routeColor: busRoute.features[innerLoop].properties.route_color,
        routeLongName: busRoute.features[innerLoop].properties.route_long_name,
        routeNumber: busRoute.features[innerLoop].properties.route_short_name,
        routeCoordinates: googleMapsCoords,
      })

      // Save the gtfsRouteSchema in the database
      gtfsRouteSchema
        .save()
        .then(() => {
          // console.log("gtfsRouteSchema collection saved successfully")
        })
        .catch((err) => {
          console.error(err)
        })
    }

    if (busRoute.features[innerLoop].geometry.type === "Point") {
      const coordsSchema = new CoordsSchema({
        lat: busRoute.features[innerLoop].geometry.coordinates[1],
        lng: busRoute.features[innerLoop].geometry.coordinates[0],
      })

      // And save it in a gtfsStopsSchema collection
      const gtfsStopSchema = new GtfsStopSchema({
        databaseVersion: process.env.DATABASE_VERSION,
        routeFileUrl: fileUrl,
        agencyName: busRoute.features[innerLoop].properties.agency_name,
        agencyId: busRoute.features[innerLoop].properties.routes[0].agency_id,
        markerType: busRoute.features[innerLoop].geometry.type,
        // stopKey: reducedRoute + "+" + innerLoop,
        stopKey: reducedRoute + innerLoop,
        stopCode: busRoute.features[innerLoop].properties.stop_code,
        stopId: busRoute.features[innerLoop].properties.stop_id,
        stopColor:
          busRoute.features[innerLoop].properties.routes[0].route_color,
        stopName: "No Data",
        stopCoordinates: coordsSchema,
        coordsString:
          coordsSchema.lat.toFixed(8) + ":" + coordsSchema.lng.toFixed(8), // For removing duplicates
        zone_id: "No Data",
        location_type: 0,
        wheelchair_boarding: 0,
      })

      // Save the gtfsStopsSchema in the database
      gtfsStopSchema
        .save()
        .then(() => {
          // console.log("gtfsStopSchema collection saved successfully")
        })
        .catch((err) => {
          console.error(err)
        })
    }

    innerLoop++
  } while (innerLoop < busRoute.features.length)
  // console.log(busRoute.features.length)
}
