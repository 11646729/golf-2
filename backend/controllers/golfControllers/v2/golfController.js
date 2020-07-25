import { NearbyGolfCourseSchema } from "../../../models/golfModels/v2/nearbyGolfCourseSchema"
import { CoordsSchema } from "../../../models/commonModels/v1/coordsSchema"

// Path localhost:5000/api/golf/
export const golfIndex = async (req, res) => {
  res.send({ response: "I am alive" }).status(200)
}

// Path localhost:5000/api/golf/nearbyGolfCourses
export const findAll = async (req, res) => {
  NearbyGolfCourseSchema.find({})
    .then((data) => {
      // console.log("Data received from database is: " + data)
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

// Path localhost:5000/api/golf/nearbyGolfCourses/:id
export const findOne = async (req, res) => {
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
export const create = async (req, res) => {
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
export const updateOne = async (req, res) => {
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
export const deleteAll = async (req, res) => {
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

// Path localhost:5000/api/golf/nearbyGolfCourses/:id
export const deleteOne = async (req, res) => {
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

// Function to save nearby golf course data to mongodb
// Longitude first in Javascript
export const saveNearbyGolfCourseDataToDatabase = async () => {
  try {
    const json = require("../rawData/nearbyGolfCourses.json")

    let i = 0
    do {
      const golfCourseCoords = new CoordsSchema({
        lat: json.features[i].geometry.coordinates[1],
        lng: json.features[i].geometry.coordinates[0],
      })

      // Now create a model instance
      const nearbyGolfCourse = new NearbyGolfCourseSchema({
        databaseVersion: process.env.DATABASE_VERSION,
        type: "Golf Club",
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
