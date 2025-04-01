import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {connectDB} from "./database/dbconnection.js";
import errorHandler from "./middlewares/error.js";
import reservationRoutes from "./routes/reservationRoute.js";

const app = express();
dotenv.config({path: "./config/config.env" });

app.use(
  cors({
        origin: [process.env.FRONTEND_URL],
        methods: ["POST"],
        credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/reservation", reservationRoutes);


connectDB();

app.use(errorHandler);
export default app;