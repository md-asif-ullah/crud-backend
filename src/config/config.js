import dotenv from "dotenv";

dotenv.config(".env");

const port = process.env.PORT || 5000;

export { port };
