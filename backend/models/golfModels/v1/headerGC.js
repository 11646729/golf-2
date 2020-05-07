import mongoose, { Schema } from "mongoose"
import { HeaderCrs } from "./headerCrsGC"

const headerGCSchema = new Schema({
  databaseVersion: { type: Number, default: 1.0 },
  type: { type: String, default: "FeatureCollection" },
  crs: { type: Schema.Types.ObjectId, ref: "headerCrsGolfCourse" },
})

module.exports = HeaderSchema = mongoose.model(
  "headerGolfCourse",
  headerGCSchema
)
// export const HeaderSchema = mongoose.model(
//   "headerGolfCourse",
//   headerGCSchema
// )
