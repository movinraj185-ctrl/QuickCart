import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: { type: String, required: true },
  items: [
    {
      product: {
        _id: { type: String },
        name: { type: String },
        price: { type: Number },
        imageUrl: { type: String },
      },
      quantity: { type: Number, required: true },
    },
  ],
  address: {
    fullName: String,
    phoneNumber: String,
    pincode: String,
    area: String,
    city: String,
    state: String,
  },
  amount: { type: Number, required: true },
  method: { type: String, default: "COD" },
  status: { type: String, default: "Pending" },
  date: { type: Date, default: Date.now },
});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order;
