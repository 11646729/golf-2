import mongoose, { Schema } from "mongoose"

const PortArrivalSchema = new Schema(
  {
    database_version: { type: Number },
    port_name: { type: String },
    port_un_locode: { type: String },
    port_coords: {
      type: {
        type: String,
        enum: ["Point"],
        required: true
      },
      coordinates: {
        type: [Number],
        required: true
      }
    },
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
