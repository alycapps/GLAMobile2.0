const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
  amount: { type: Integer, required: true },
  clientEmailAddress: { type: String, required: true },
  styleEmailAddress: { type: String, required: true }
});

const Payments = mongoose.model("Payments", paymentSchema);

module.exports = Payments;
