import mongoose, { Schema } from "mongoose"

const headerCrsPropertiesGC = new Schema({
  type: { type: String, default: "name" },
  properties: {
    type: String,
    default: "urn:ogc:def:crs:OGC:1.3:CRS84",
  },
})

module.exports = HeaderCrsProperties = mongoose.model(
  "headerCrsPropertiesGolfCourse",
  headerCrsPropertiesGC
)
// export const HeaderCrsProperties = mongoose.model(
//   "headerCrsPropertiesGolfCourse",
//   headerCrsPropertiesGC
// )
