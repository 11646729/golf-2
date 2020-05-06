import mongoose, { Schema } from "mongoose"
import { headerCrsPropertiesGolfCourse } from "./headerCrsPropertiesGC"

const headerCrsSchema = new Schema({
  crs: {
    type: { type: String, default: "WGS84" },
    properties: { headerCrsPropertiesGolfCourse },
  },
})

export const headerCrsGolfCourse = mongoose.model(
  "headerCrsGolfCourse",
  headerCrsSchema
)
