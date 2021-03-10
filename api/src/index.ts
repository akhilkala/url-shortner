import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db";

const app: Application = express();
dotenv.config();
app.use(express.json());
app.use(cors());
connectDB();

app.listen(9201, () => console.log(`Server running on port 5000...`));
