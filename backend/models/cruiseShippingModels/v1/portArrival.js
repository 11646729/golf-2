import mongoose, { Schema } from "mongoose"

const PortArrivalSchema = new Schema(
  {
    database_version: { type: Number, default: 1.0 },
    port_name: { type: String, default: "Belfast" },
    port_un_locode: { type: String, default: "GBBEL" },
    port_longitude: { type: Number, default: "-5.89831" },
    port_latitude: { type: Number, default: "54.61750" },
    vessel_shortcruise_name: { type: String, default: "" },
    vessel_eta: { type: String },
    vessel_etd: { type: String },
    vessel_name_url: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

// Export model
export const PortArrival = mongoose.model("portArrival", PortArrivalSchema)
