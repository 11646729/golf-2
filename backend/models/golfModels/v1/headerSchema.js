import mongoose, { Schema } from "mongoose"
import { headerCrsGolfCourse } from "./headerCrsGC"

const headerSchema = new Schema({
  database_version: { type: Number, default: 1.0 },
  type: { type: String, default: "FeatureCollection" },
  crs: { headerCrsGolfCourse },
})

export const headerGolfCourse = mongoose.model("headerGolfCourse", headerSchema)
