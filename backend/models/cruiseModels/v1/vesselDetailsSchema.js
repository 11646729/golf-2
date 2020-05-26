import mongoose, { Schema } from "mongoose"

var vesselDetailsSchema = new Schema(
  {
    databaseVersion: Number,
    vesselNameUrl: String,
    title: String,
    vesselType: String,
    vesselName: String,
    vesselFlag: String,
    vesselShortOperator: String,
    vesselLongOperator: String,
    vesselYearBuilt: String,
    vesselLengthMetres: Number,
    vesselWidthMetres: Number,
    vesselGrossTonnage: Number,
    vesselAverageSpeedKnots: String,
    vesselMaxSpeedKnots: Number,
    vesselAverageDraughtMetres: Number,
    vesselImoNumber: Number,
    vesselMmsiNumber: Number,
    vesselCallsign: String,
    vesselTypicalPassengers: String,
    vesselTypicalCrew: String,
  },
  {
    timestamps: true,
  }
)

vesselDetailsSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject()
  object.id = _id
  return object
})

// Export model
export const VesselDetailsSchema = mongoose.model(
  "vesselDetails",
  vesselDetailsSchema
)
