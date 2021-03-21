const fs = require("fs")
import { CoordsSchema } from "./models/commonModels/v1/coordsSchema"
import { GtfsRouteSchema } from "./models/transportModels/v1/gtfsRouteSchema"
import { GtfsStopSchema } from "./models/transportModels/v1/gtfsStopSchema"

// -------------------------------------------------------
// Function to fetch data from a single GeoJson route file
// This routine is called from the individual route button
// -------------------------------------------------------
export const getAndParseSingleBusRouteAndStops = (
  filePath,
  fileName,
  fileIndex
) => {
  const fileUrl = filePath + fileName
  const busRoute = readBusRouteFile(fileUrl)

  let numbersReturned = []
  let numberOfRoutes = 0
  let numberOfStops = 0
  let loop = 0
  do {
    if (busRoute.features[loop].geometry.type === "LineString") {
      // Change order of coordinates
      let i = 0
      let googleMapsCoords = []
      do {
        const coordsSchema = new CoordsSchema({
          lat: busRoute.features[loop].geometry.coordinates[i][1],
          lng: busRoute.features[loop].geometry.coordinates[i][0],
        })

        googleMapsCoords.push(coordsSchema)

        i++
      } while (i < busRoute.features[loop].geometry.coordinates.length)

      // And save it in a gtfsRouteSchema collection
      const gtfsRouteSchema = new GtfsRouteSchema({
        databaseVersion: process.env.DATABASE_VERSION,
        routeFilePath: filePath,
        routeFileUrl: fileUrl,
        routeVisible: false,
        agencyName: busRoute.features[loop].properties.agency_name,
        agencyId: busRoute.features[loop].properties.agency_id,
        markerType: busRoute.features[loop].geometry.type,
        routeKey: fileIndex * 1000 + loop,
        routeColor: busRoute.features[loop].properties.route_color,
        routeLongName: busRoute.features[loop].properties.route_long_name,
        routeNumber: busRoute.features[loop].properties.route_short_name,
        routeCoordinates: googleMapsCoords,
      })

      // Save the gtfsRouteSchema in the database
      gtfsRouteSchema.save().catch((err) => {
        console.log("Error saving Routes to database ", err)
      })

      // Increment Number of Routes created
      numberOfRoutes++
    }

    if (busRoute.features[loop].geometry.type === "Point") {
      const coordsSchema = new CoordsSchema({
        lat: busRoute.features[loop].geometry.coordinates[1],
        lng: busRoute.features[loop].geometry.coordinates[0],
      })

      // And save it in a gtfsStopsSchema collection
      const gtfsStopSchema = new GtfsStopSchema({
        databaseVersion: process.env.DATABASE_VERSION,
        stopFilePath: filePath,
        stopFileUrl: fileUrl,
        agencyName: busRoute.features[loop].properties.agency_name,
        agencyId: busRoute.features[loop].properties.routes[0].agency_id,
        markerType: busRoute.features[loop].geometry.type,
        stopKey: fileIndex * 1000 + loop,
        stopCode: busRoute.features[loop].properties.stop_code,
        stopId: busRoute.features[loop].properties.stop_id,
        stopColor: busRoute.features[loop].properties.routes[0].route_color,
        stopName: "No Data",
        stopCoordinates: coordsSchema,
        coordsString:
          coordsSchema.lat.toFixed(8) + ":" + coordsSchema.lng.toFixed(8), // For removing duplicates
        zone_id: "No Data",
        location_type: 0,
        wheelchair_boarding: 0,
      })

      // Save the gtfsStopsSchema in the database
      gtfsStopSchema.save().catch((err) => {
        console.log("Error saving Stops to database ", err)
      })

      // Increment Number of Stops created
      numberOfStops++
    }

    loop++
  } while (loop < busRoute.features.length)

  numbersReturned[0] = numberOfRoutes
  numbersReturned[1] = numberOfStops

  return numbersReturned
}

// -------------------------------------------------------
// Local function
// -------------------------------------------------------
function readBusRouteFile(fileUrl) {
  return JSON.parse(fs.readFileSync(fileUrl))
}
