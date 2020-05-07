import mongoose, { Schema } from "mongoose"
import { HeaderCrsProperties } from "./headerCrsPropertiesGC"

const headerCrsGC = new Schema({
  crs: {
    type: { type: String, default: "WGS84" },
    properties: {
      type: Schema.Types.ObjectId,
      ref: "headerCrsPropertiesGolfCourse",
    },
  },
})

module.exports = HeaderCrs = mongoose.model("headerCrsGolfCourse", headerCrsGC)
// export const HeaderCrs = mongoose.model("headerCrsGolfCourse", headerCrsGC)
