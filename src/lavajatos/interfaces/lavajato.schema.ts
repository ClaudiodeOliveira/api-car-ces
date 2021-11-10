import * as mongoose from 'mongoose';

export const LavaJatoSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    services: [
      {
        description: { type: String, required: false },
        price: { type: Number, required: false },
      },
    ],
    address: {
      street: { type: String, required: false },
      number: { type: Number, required: false },
      complement: { type: String, required: false },
      city: { type: String, required: false },
      state: { type: String, required: false },
      zipCode: { type: String, required: false },
    },
  },
  { timestamps: true, collection: 'lavajato' },
);
