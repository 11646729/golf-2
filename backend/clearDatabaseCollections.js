"use strict"

import { PortArrivalSchema } from "./models/cruiseShippingModels/v1/portArrivalSchema"
import { VesselDetailsSchema } from "./models/cruiseShippingModels/v1/vesselDetailsSchema"
import { HomeTemperatureSchema } from "./models/weatherModels/v1/rtTemperatureSchema"
import { NearbyGolfCourseSchema } from "./models/golfModels/v1/nearbyGolfCourseSchema"

export async function clearDatabaseCollections() {
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

  NearbyGolfCourseSchema.deleteMany({}, function (error) {
    if (error) {
      console.log("Error in NearbyGolfCourse.deleteMany() : ", error)
    } else {
      console.log("NearbyGolfCourse collection emptied")
    }
  })
}
