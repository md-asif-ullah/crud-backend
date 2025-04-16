import express from "express";
import { userSingin, userSingUp } from "../controllers/auth.js";

const authRouter = express.Router();

authRouter.post("/signup", userSingUp);
authRouter.post("/signin", userSingin);

export default authRouter;
