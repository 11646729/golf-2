import mongoose, { Schema } from "mongoose"
import { CoordsSchema } from "../../commonModels/v1/coordsSchema"

const nearbyGolfCourseSchema = new Schema(
  {
    databaseVersion: { type: Number, default: 1.0 },
    type: String,
    crsName: String,
    crsUrn: String,
    name: String,
    phoneNumber: String,
    photoTitle: String,
    photoUrl: String,
    description: String,
    coordinates: CoordsSchema.schema,
  },
  {
    timestamps: true,
  }
)

nearbyGolfCourseSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject()
  object.id = _id
  return object
})

export const NearbyGolfCourseSchema = mongoose.model(
  "nearbyGolfCourse",
  nearbyGolfCourseSchema
)
