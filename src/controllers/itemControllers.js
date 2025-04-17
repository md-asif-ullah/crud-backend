import { Item } from "../models/itemModel.js";

// Routes
const getItem = async (req, res) => {
  const items = await Item.find();
  res.json(items);
};

const createItem = async (req, res) => {
  const item = new Item({ name: req.body.name });
  await item.save();
  res.json(item);
};

const updateItem = async (req, res) => {
  const updated = await Item.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  res.json(updated);
};

const deletedItem = async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.json({ message: "Item deleted" });
};

export { getItem, createItem, updateItem, deletedItem };
