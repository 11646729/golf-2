// Function to save nearby golf course data to mongodb
// Longitude first in Javascript
export const saveTransportDataToDatabase = async () => {
  try {
    const json = require("../translink_bus_stop_test_list.json")

    let i = 0
    do {
      const busStopCoords = new CoordsSchema({
        lat: json.features[i].geometry.coordinates[1],
        lng: json.features[i].geometry.coordinates[0],
      })

      // Now create a model instance
      const nearbyGolfCourse = new NearbyGolfCourseSchema({
        databaseVersion: process.env.DATABASE_VERSION,
        type: "Golf Course",
        crsName: "WGS84",
        crsUrn: "urn:ogc:def:crs:OGC:1.3:CRS84",
        name: json.features[i].properties.name,
        phoneNumber: json.features[i].properties.phoneNumber,
        photoTitle: "Istanbul Bridge Photo",
        photoUrl: "static/images/Bosphorus.jpg",
        description:
          "Istanbul is a major city in Turkey that straddles Europe and Asia across the Bosphorus Strait. Its Old City reflects cultural influences of the many empires that once ruled here.",
        coordinates: golfCourseCoords,
      })

      // Now save in mongoDB
      nearbyGolfCourse
        .save()
        // .then(() => console.log(i + " nearbyGolfCourses saved to mongoDB"))
        .catch((err) =>
          console.log("Error saving nearbyGolfCourse to mongoDB " + err)
        )

      i++
    } while (i < json.features.length)
  } catch (error) {
    // handle error
    console.log("Error in saveNearbyGolfCourseDataToDatabase ", error)
  }
}
