import mongoose, { Schema } from "mongoose"

const locationSchema = new Schema({
  type: {
    type: String,
    default: "Point",
  },
  coordinates: {
    type: [Number],
    index: "2dsphere",
  },
})

const PortArrivalSchema = new Schema(
  {
    database_version: { type: Number, default: 1.0 },
    port_name: { type: String },
    port_un_locode: { type: String },
    port_coords: { type: locationSchema },
    vessel_shortcruise_name: { type: String },
    vessel_eta: { type: String },
    vessel_etd: { type: String },
    vessel_name_url: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

// Export model
export const PortArrival = mongoose.model("portArrival", PortArrivalSchema)
