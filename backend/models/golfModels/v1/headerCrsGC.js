import mongoose, { Schema } from "mongoose"
import { HeaderCrsProperties } from "./headerCrsPropertiesGC"

const headerCrsGC = new Schema({
  crs: {
    type: { type: String, default: "WGS84" },
    properties: { HeaderCrsProperties },
  },
})

export const HeaderCrs = mongoose.model("headerCrsGolfClub", headerCrsGC)
