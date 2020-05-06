import mongoose, { Schema } from "mongoose"

const headerCrsPropertiesGC = new Schema({
  Mytype: { type: String, default: "name" },
  properties: {
    type: String,
    default: "urn:ogc:def:crs:OGC:1.3:CRS84",
  },
})

export const HeaderCrsProperties = mongoose.model(
  "headerCrsPropertiesGolfClub",
  headerCrsPropertiesGC
)
