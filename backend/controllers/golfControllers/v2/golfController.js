import { NearbyGolfCourseSchema } from "../../../models/golfModels/v2/nearbyGolfCourseSchema"
import { CoordsSchema } from "../../../models/commonModels/v1/coordsSchema"

// Path localhost:5000/api/golf/
export function golfIndex(req, res) {
  res.send({ response: "I am alive" }).status(200)
}

// Path localhost:5000/api/golf/nearbyGolfCourses
export function create(req, res) {
  // Validate request
  if (!req.body.location_lat || !req.body.location_lng) {
    res.status(400).send({ message: "Coordinates cannot be empty!" })
    return
  }
  // Create a new nearbyGolfCourse
  const location = new CoordsSchema({
    lat: req.body.location_lat,
    lng: req.body.location_lng,
  })

  const nearbyGolfCourse = new NearbyGolfCourseSchema({
    databaseVersion: req.body.database_version,
    type: req.body.type,
    crsName: req.body.crs_name,
    crsUrn: req.body.crs_urn,
    name: req.body.name,
    phoneNumber: req.body.phone_number,
    photoTitle: req.body.photo_title,
    photoUrl: req.body.photo_url,
    description: req.body.description,
    location: location,
  })

  // Save the nearbyGolfCourse in the database
  nearbyGolfCourse
    .save()
    .then((data) => {
      res.send(data)
    })
    .catch((err) =>
      res.status(500).send({
        message:
          err.message ||
          "Some error ocurred while creating the nearbyGolfCourse.",
      })
    )
}

// Path localhost:5000/api/golf/nearbyGolfCourses
export function findAll(req, res) {
  NearbyGolfCourseSchema.find({})
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error ocurred while retrieving nearbyGolfCourses.",
      })
    })
}

// Path localhost:5000/api/golf/nearbyGolfCourses/id
export function findOne(req, res) {
  const id = req.params.id

  NearbyGolfCourseSchema.findById(id)
    .then((data) => {
      if (!data)
        res
          .status(404)
          .send({ message: "Not found nearbyGolfCourse with id " + id })
      else res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Error retrieving nearbyGolfCourse with id= " + id,
      })
    })
}

// Path localhost:5000/api/golf/nearbyGolfCourses/id
export function updateOne(req, res) {}

// Path localhost:5000/api/golf/nearbyGolfCourses
export function deleteAll(req, res) {
  try {
    NearbyGolfCourseSchema.deleteMany({}, function (error) {
      if (error) {
        console.log("Error in NearbyGolfCourse.deleteMany() : ", error)
      } else {
        console.log("NearbyGolfCourse collection emptied")
      }
    })
  } catch (error) {
    // handle error
    console.log("Error in clearNearbyGolfCourseDataFromDatabase: ", error)
  }
}

// Path localhost:5000/api/golf/nearbyGolfCourses/id
export function deleteOne(req, res) {}
