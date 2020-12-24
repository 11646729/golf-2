import { getSingleBusRoute } from "./getSingleBusRoute"

// Function to select only GeoJson file types
export const selectOnlyGeojsonFiles = async (busRoutesResult) => {
  console.log("Selecting only GeoJson file types")

  let i = 0
  // do {
  //   if (
  //     busRoutesResult[i].substring(
  //       busRoutesResult[i].length - 7,
  //       busRoutesResult[i].length
  //     ) == "geojson"
  //   ) {
  let singleRoute = busRoutesResult[i]
  getSingleBusRoute(singleRoute)
  //     }
  //     i++
  //   } while (i < busRoutesResult.length)
}
