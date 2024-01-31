import express from "express";
import {config} from "dotenv"
import cookieParser from "cookie-parser";
import cors from "cors";
import { ErrorMiddleware } from "./middleware/Error.js";
config({
    path:"./config/config.env"
})
const app = express();
app.use(express.json())
app.use(express.urlencoded({
  extended: true,
}))

app.use(cookieParser())
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

import user from "./routes/userRoutes.js"
import course from "./routes/courseRoue.js"

app.use("/api/v1/auth" , user)
app.use("/api/v1/" , course)

export default app ;
app.get("/", (req, res) =>
  res.send(
    `<h1>Site is Working. click <a href=${process.env.FRONTEND_URL}>here</a> to visit frontend.</h1>`
  )
);
app.use(ErrorMiddleware)