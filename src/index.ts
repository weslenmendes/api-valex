import "dotenv/config";
import express, { json } from "express";
import "express-async-errors";
import cors from "cors";

const app = express();
const port: number = +process.env.PORT || 4000;

app.use(cors());
app.use(json());

app.listen(port, () => {
  console.log(`Server is running on: http://localhost:${port}`);
});
