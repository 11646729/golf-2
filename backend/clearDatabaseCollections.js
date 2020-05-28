"use strict"

import { PortArrivalSchema } from "./models/cruiseModels/v1/portArrivalSchema"
import { VesselDetailsSchema } from "./models/cruiseModels/v1/vesselDetailsSchema"
import { TemperatureSchema } from "./models/weatherModels/v1/temperatureSchema"

export const clearDatabaseCollections = async () => {
  // First delete all previous data
  PortArrivalSchema.deleteMany({}, function (error) {
    if (error) {
      console.log("Error in PortArrival.deleteMany() : ", error)
    } else {
      console.log("PortArrival collection emptied")
    }
  })

  VesselDetailsSchema.deleteMany({}, function (error) {
    if (error) {
      console.log("Error in VesselDetails.deleteMany() : ", error)
    } else {
      console.log("VesselDetails collection emptied")
    }
  })

  TemperatureSchema.deleteMany({}, function (error) {
    if (error) {
      console.log("Error in Temperature.deleteMany() : ", error)
    } else {
      console.log("Temperature collection emptied")
    }
  })
}
