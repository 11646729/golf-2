import mongoose, { Schema } from "mongoose"

var vesselSchema = new Schema(
  {
    databaseVersion: { type: Number },
    vesselNameUrl: { type: String },
    title: { type: String },
    vesselType: { type: String },
    vesselName: { type: String },
    vesselFlag: { type: String },
    vesselShortOperator: { type: String },
    vesselLongOperator: { type: String },
    vesselYearBuilt: { type: String },
    vesselLengthMetres: { type: Number },
    vesselWidthMetres: { type: Number },
    vesselGrossTonnage: { type: Number },
    vesselAverageSpeedKnots: { type: String },
    vesselMaxSpeedKnots: { type: Number },
    vesselAverageDraughtMetres: { type: Number },
    vesselImoNumber: { type: Number },
    vesselMmsiNumber: { type: Number },
    vesselCallsign: { type: String },
    vesselTypicalPassengers: { type: String },
    vesselTypicalCrew: { type: Number },
  },
  {
    timestamps: true,
  }
)

vesselSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject()
  object.id = _id
  return object
})

// Export model
export const VesselSchema = mongoose.model("vessels", vesselSchema)
