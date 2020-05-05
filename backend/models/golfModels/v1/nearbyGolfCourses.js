import mongoose, { Schema } from "mongoose"

const headerCrsPropertiesSchema = new Schema({
  type: { type: String, default: "name" },
  properties: {
    type: String,
    default: "urm:ogc:def:crs:OGC:1.3:CRS84",
  },
})

const headerCrsSchema = new Schema({
  crs: {
    type: { type: String, default: "name" },
    properties: { headerCrsPropertiesSchema },
  },
})

const headerSchema = new Schema({
  database_version: { type: Number, default: 1.0 },
  type: { type: String, default: "FeatureCollection" },
  crs: { headerCrsSchema },
})

const featuresLocationSchema = new Schema({
  type: {
    type: String,
    default: "Point",
  },
  coordinates: {
    type: [Number],
    index: "2dsphere",
  },
})

const featuresPropertySchema = new Schema({
  name: { type: String },
  phoneNumber: { type: String },
})

const featuresSchema = new Schema({
  type: { type: String, default: "Feature" },
  geometry: { type: featuresLocationSchema },
  properties: { type: featuresPropertySchema },
})

const nearbyGolfCoursesSchema = new Schema(
  {
    type: { type: headerSchema },
    features: [featuresSchema],
  },
  {
    timestamps: true,
  }
)

// Export model
export const NearbyGolfCourses = mongoose.model(
  "nearbyGolfCourses",
  nearbyGolfCoursesSchema
)
