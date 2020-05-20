import { NearbyGolfCourseSchema } from "../../models/golfModels/v1/nearbyGolfCourseSchema"

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
// TODO this uses the incorrect Schema

export function nearby_golf_course_add(req, res) {
  const database_version = req.body.database_version
  const location_name = req.body.database_version
  const location_coords = req.body.location_coords
  const location_phone_number = req.body.location_phone_number

  const nearbyGolfCourse = new NearbyGolfCourseSchema({
    database_version,
    location_name,
    location_coords,
    location_phone_number,
  })

  nearbyGolfCourse
    .save()
    .then(() => res.json("Nearby Golf Course Details added!"))
    .catch((err) => res.status(400).json("Error: " + err))
}
