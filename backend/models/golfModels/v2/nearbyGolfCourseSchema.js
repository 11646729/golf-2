import mongoose, { Schema } from "mongoose"
import { CoordsSchema } from "../../commonModels/v1/coordsSchema"

const nearbyGolfCourseSchema = new Schema(
  {
    databaseVersion: { type: Number, default: 1.0 },
    type: { type: String, default: "Golf Course" },
    crsName: { type: String, default: "WGS84" },
    crsUrn: { type: String, default: "urn:ogc:def:crs:OGC:1.3:CRS84" },
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

export const NearbyGolfCourseSchema = mongoose.model(
  "nearbyGolfCourse",
  nearbyGolfCourseSchema
)
