import mongoose, { Schema } from "mongoose"

var vesselSchema = new Schema(
  {
    databaseVersion: { type: Number, default: 1.0 },
    vesselNameUrl: {
      type: String,
    },
    title: {
      type: String,
    },
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
    vesselTypicalCrew: { type: String },
  },
  {
    timestamps: true,
  }
)

// Export model
export const VesselDetailsSchema = mongoose.model("vessel", vesselSchema)
