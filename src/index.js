import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import createError from "http-errors";
import cookieParser from "cookie-parser";
import { errorResponse } from "./utils/response.js";
import { port } from "./config/config.js";

const app = express();

//middlewares
app.use(express.json());
app.use(
  cors({
    origin: "*",
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

//error handling middleware

app.use((req, res, next) => {
  return next(createError(404, "route not found"));
});

app.use((err, req, res, next) => {
  return errorResponse(res, { statusCode: err.status, message: err.message });
});

app.listen(port, async () => {
  console.log(`Server is running on http://localhost:${port}`);
});
