import { NearbyGolfCourseSchema } from "../../models/golfModels/v1/nearbyGolfCourseSchema"
import { GolfCourseDetailsSchema } from "../../models/golfModels/v1/golfCourseDetailsSchema"
import { CoordsSchema } from "../../models/commonModels/coordsSchema"

// Path localhost:5000/golf/
export function index_get(req, res) {
  res.send({ response: "I am alive" }).status(200)
}

// Path localhost:5000/golf/nearbyGolfCourses
export function nearby_golf_course_getAll(req, res) {
  NearbyGolfCourseSchema.find({})
    .then((nearbyGolfCourseSchema) => res.json(nearbyGolfCourseSchema))
    .catch((err) => res.status(400).json("Error " + err))
}

// Path localhost:5000/golf/nearbyGolfCourses/add
export function nearby_golf_course_add(req, res) {
  const location = new CoordsSchema({
    lat: req.body.location_lat,
    lng: req.body.location_lng,
  })

  const golfCourseDetails = new GolfCourseDetailsSchema({
    type: req.body.golf_course_detail_type,
    name: req.body.golf_course_detail_name,
    phoneNumber: req.body.golf_course_detail_phone_number,
    location: location,
  })

  const nearbyGolfCourse = new NearbyGolfCourseSchema({
    databaseVersion: req.body.nearby_golf_course.database_version,
    type: req.body.nearby_golf_course.type,
    crsName: req.body.nearby_golf_course.crs_name,
    crsUrn: req.body.nearby_golf_course.crs_urn,
    courses: golfCourseDetails,
  })

  nearbyGolfCourse
    .save()
    .then(() => res.json("Nearby Golf Course Details added!"))
    .catch((err) => res.status(400).json("Error: " + err))
}
