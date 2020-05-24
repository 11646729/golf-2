"use strict"

import { PortArrivalSchema } from "./models/cruiseModels/v1/portArrivalSchema"
import { VesselDetailsSchema } from "./models/cruiseModels/v1/vesselDetailsSchema"
import { HomeTemperatureSchema } from "./models/weatherModels/v1/rtTemperatureSchema"

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

  HomeTemperatureSchema.deleteMany({}, function (error) {
    if (error) {
      console.log("Error in HomeTemperature.deleteMany() : ", error)
    } else {
      console.log("HomeTemperature collection emptied")
    }
  })
}
