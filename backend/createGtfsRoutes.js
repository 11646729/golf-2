const fs = require("fs")
import { CoordsSchema } from "./models/commonModels/v1/coordsSchema"
import { RouteSchema } from "./models/transportModels/v1/routeSchema"

// -------------------------------------------------------
// Function to fetch data from a single GeoJson route file
// This routine is called from the individual route button
// -------------------------------------------------------
export const createGtfsRoutes = (filePath, fileName, fileIndex) => {
  const fileUrl = filePath + fileName
  const busRoute = readBusRouteFile(fileUrl)

  let numberOfRoutes = 0

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

      // And save it in a routeSchema collection
      const routeSchema = new RouteSchema({
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

      // Save the routeSchema in the database
      routeSchema.save().catch((err) => {
        console.log("Error saving Routes to database ", err)
      })

      // Increment Number of Routes created
      numberOfRoutes++
    }

    loop++
  } while (loop < busRoute.features.length)

  // return numbersReturned
  return numberOfRoutes
}

// -------------------------------------------------------
// Local function
// -------------------------------------------------------
function readBusRouteFile(fileUrl) {
  console.log(fileUrl)
  return JSON.parse(fs.readFileSync(fileUrl))
}
