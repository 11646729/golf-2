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
