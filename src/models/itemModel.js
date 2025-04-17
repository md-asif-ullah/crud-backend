import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
  name: String,
});

export const Item = mongoose.model("Item", ItemSchema);
