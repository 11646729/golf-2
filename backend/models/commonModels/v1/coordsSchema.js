import mongoose, { Schema } from "mongoose"

const coordsSchema = new Schema({
  lat: { type: Number, required: true },
  lng: {
    type: Number,
    required: true,
  },
})

coordsSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject()
  object.id = _id
  return object
})

// Export model
export const CoordsSchema = mongoose.model("coords", coordsSchema)
