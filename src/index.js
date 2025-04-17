import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import createError from "http-errors";
import cookieParser from "cookie-parser";
import { errorResponse } from "./utils/response.js";
import { origin, port } from "./config/config.js";
import connectToDB from "./config/connectToDB.js";
import authRouter from "./routers/authRouter.js";
import itemRoutes from "./routers/itemRoutes.js";

const app = express();

//middlewares
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173" || "https://crud-frontendapp.netlify.app"],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("dev"));

app.use(cookieParser());

//routes

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1", authRouter);
app.use("/api/v1", itemRoutes);

//error handling middleware

app.use((req, res, next) => {
  return next(createError(404, "route not found"));
});

app.use((err, req, res, next) => {
  return errorResponse(res, { statusCode: err.status, message: err.message });
});

app.listen(port, async () => {
  console.log(`Server is running on http://localhost:${port}`);
  await connectToDB();
});
