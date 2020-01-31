import mongoose, { Schema } from "mongoose"

const GeoSchema = new Schema({
  type: {
    type: String,
    default: "Point"
  },
  coordinates: {
    type: [Number],
    index: "2dsphere"
  }
})

const PortArrivalSchema = new Schema(
  {
    database_version: { type: Number },
    port_name: { type: String },
    port_un_locode: { type: String },
    port_coords: { type: GeoSchema },
    vessel_shortcruise_name: { type: String },
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
