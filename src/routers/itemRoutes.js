import express from "express";
import {
  createItem,
  deletedItem,
  getItem,
  updateItem,
} from "../controllers/itemControllers.js";

const itemRoutes = express.Router();

itemRoutes.get("/items", getItem);

itemRoutes.post("/items", createItem);

itemRoutes.put("/items/:id", updateItem);

itemRoutes.delete("/items/:id", deletedItem);

export default itemRoutes;
