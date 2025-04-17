import express from "express";
import { userSignin, userSignUp, verifyToken } from "../controllers/auth.js";

const authRouter = express.Router();

authRouter.post("/signup", userSignUp);
authRouter.post("/signin", userSignin);
authRouter.get("/profile", verifyToken);

export default authRouter;
