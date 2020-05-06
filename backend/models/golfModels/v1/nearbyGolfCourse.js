import mongoose, { Schema } from "mongoose"

const headerCrsPropertiesSchema = new Schema({
  type: { type: String, default: "name" },
  properties: {
    type: String,
    default: "urm:ogc:def:crs:OGC:1.3:CRS84",
  },
})

export const headerCrsPropertiesGolfCourse = mongoose.model(
  "headerCrsPropertiesGolfCourse",
  headerCrsPropertiesSchema
)

const headerCrsSchema = new Schema({
  crs: {
    type: { type: String, default: "WGS84" },
    properties: { headerCrsPropertiesSchema },
  },
})

export const headerCrsGolfCourse = mongoose.model(
  "headerCrsGolfCourse",
  headerCrsSchema
)

const headerSchema = new Schema({
  database_version: { type: Number, default: 1.0 },
  type: { type: String, default: "FeatureCollection" },
  crs: { headerCrsSchema },
})

export const headerGolfCourse = mongoose.model("headerGolfCourse", headerSchema)

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

export const featuresLocationGolfCourse = mongoose.model(
  "featuresLocationGolfCourse",
  featuresLocationSchema
)

const featuresPropertySchema = new Schema({
  name: { type: String },
  phoneNumber: { type: String },
})

export const featuresPropertyGolfCourse = mongoose.model(
  "featuresPropertyGolfCourse",
  featuresPropertySchema
)

const featuresSchema = new Schema({
  type: { type: String, default: "Feature" },
  projection: { type: featuresLocationSchema },
  properties: { type: featuresPropertySchema },
})

export const featuresGolfCourse = mongoose.model(
  "featuresGolfCourse",
  featuresSchema
)

const nearbyGolfCourseSchema = new Schema(
  {
    type: { type: headerSchema },
    features: [featuresSchema],
  },
  {
    timestamps: true,
  }
)

export const NearbyGolfCourse = mongoose.model(
  "NearbyGolfCourse",
  nearbyGolfCourseSchema
)
