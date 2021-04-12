const fs = require("fs")
import { CoordsSchema } from "./models/commonModels/v1/coordsSchema"
import { RouteSchema } from "./models/transportModels/v1/routeSchema"
import { StopSchema } from "./models/transportModels/v1/stopSchema"

// -------------------------------------------------------
// Function to fetch data from a single GeoJson route file
// This routine is called from the individual route button
// -------------------------------------------------------
export const createGtfsStops = (filePath, fileName, fileIndex) => {
  const fileUrl = filePath + fileName
  const busRoute = readBusRouteFile(fileUrl)

  let numberOfStops = 0

  let loop = 0
  do {
    if (busRoute.features[loop].geometry.type === "Point") {
      const coordsSchema = new CoordsSchema({
        lat: busRoute.features[loop].geometry.coordinates[1],
        lng: busRoute.features[loop].geometry.coordinates[0],
      })

      // And save it in a gtfsStopsSchema collection
      const stopSchema = new StopSchema({
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

      // Save the stopsSchema in the database
      stopSchema.save().catch((err) => {
        console.log("Error saving Stops to database ", err)
      })

      // Increment Number of Stops created
      numberOfStops++
    }

    loop++
  } while (loop < busRoute.features.length)

  return numberOfStops
}

// -------------------------------------------------------
// Local function
// -------------------------------------------------------
function readBusRouteFile(fileUrl) {
  console.log(fileUrl)
  return JSON.parse(fs.readFileSync(fileUrl))
}
