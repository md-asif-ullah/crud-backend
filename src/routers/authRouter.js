import express from "express";
import { userSingin, userSingUp, verifyToken } from "../controllers/auth.js";

const authRouter = express.Router();

authRouter.post("/signup", userSingUp);
authRouter.post("/signin", userSingin);
authRouter.get("/profile", verifyToken);

export default authRouter;
