import mongoose, { Schema } from "mongoose"
import { CoordsSchema } from "../../commonModels/v1/coordsSchema"

const nearbyGolfCourseSchema = new Schema(
  {
    databaseVersion: { type: Number },
    type: { type: String },
    crsName: { type: String },
    crsUrn: { type: String },
    name: { type: String },
    phoneNumber: { type: String },
    photoTitle: { type: String },
    photoUrl: { type: String },
    description: { type: String },
    coordinates: { type: CoordsSchema.schema },
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
