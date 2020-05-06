import mongoose, { Schema } from "mongoose"
import { HeaderCrs } from "./headerCrsGC"

const headerGC = new Schema({
  database_version: { type: Number, default: 1.0 },
  type: { type: String, default: "FeatureCollection" },
  crs: { HeaderCrs },
})

export const Header = mongoose.model("HeaderGolfCourse", headerGC)
