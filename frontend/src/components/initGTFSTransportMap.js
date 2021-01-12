import getAllReducedRoutes from "./getAllReducedRoutes"
import getAllReducedStops from "./getAllReducedStops"

export default function initGTFSTransportMap() {
  getAllReducedRoutes()

  getAllReducedStops()

  fetchBusRoutes()

  // return busRoutesCollection
}

function fetchBusRoutes() {}
