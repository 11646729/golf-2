import { NearbyGolfCourseSchema } from "../../../models/golfModels/v2/nearbyGolfCourseSchema"
import { CoordsSchema } from "../../../models/commonModels/v1/coordsSchema"

// Path localhost:5000/api/golf/
export function golfIndex(req, res) {
  res.send({ response: "I am alive" }).status(200)
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

// Path localhost:5000/api/golf/nearbyGolfCourses
// export const saveDarkSkiesDataToDatabase = async (darkSkiesData) => {
export function directFindAll() {
  //   function getJedisQuery(name){
  //     var query = Jedi.find({name:name});
  //     return query;
  //  }

  NearbyGolfCourseSchema.find()
    .then((data) => {
      // console.log("Data received from database is: " + data)
      return data
    })
    .catch((err) => {
      console.log("Some error ocurred while retrieving nearbyGolfCourses.")
    })
}

// Path localhost:5000/api/golf/nearbyGolfCourses/:id
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

// Path localhost:5000/api/golf/nearbyGolfCourses
export function create(req, res) {
  // Validate request
  if (!req.body.location_lat || !req.body.location_lng) {
    res.status(400).send({ message: "Coordinates cannot be empty!" })
    return
  }
  // Create a new location object
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
          "Some error ocurred while creating the new nearbyGolfCourse.",
      })
    )
}

// Path localhost:5000/api/golf/nearbyGolfCourses/:id
export function updateOne(req, res) {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update cannot be empty!",
    })
  }

  const id = req.params.id

  NearbyGolfCourseSchema.findByIdAndUpdate(id, req.body, {
    useFindAndModify: false,
  })
    .then((data) => {
      if (!data)
        res.status(404).send({
          message:
            "Cannnot update nearbyGolfCourse with id=${id}. Maybe nearbyGolfCourse was not found!",
        })
      else res.send({ message: "NearbyGolfCourse was updated successfully." })
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Error updating nearbyGolfCourse with id= " + id,
      })
    })
}

// Path localhost:5000/api/golf/nearbyGolfCourses
export function deleteAll(req, res) {
  NearbyGolfCourseSchema.deleteMany({})
    .then((data) => {
      res.send({
        message:
          "${data.deletedCount} Nearby Golf Courses were deleted successfully!",
      })
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while removing all nearby Golf Courses",
      })
    })
}

// Direct call to delete all nearby Golf Course data in the database
export function directDeleteAll() {
  NearbyGolfCourseSchema.deleteMany({}, (err) => {
    if (err) {
      console.log("Some error occurred while removing all nearby Golf Courses")
    } else {
      console.log("All nearby Golf Courses were deleted successfully!")
    }
  })
}

// Path localhost:5000/api/golf/nearbyGolfCourses/:id
export function deleteOne(req, res) {
  const id = req.params.id

  NearbyGolfCourseSchema.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message:
            "Cannot delete nearbyGolfCourse with id=${id}. Maybe nearbyGolfCourse was not found!",
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete nearbyGolfCourse with id=" + id,
      })
    })
}
