import express from "express";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoute.js";
import { notFound, errorHandler } from "./middleWare/errorMiddleware.js";
import connectDB from "./config/db.js";
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api/users", userRoutes);

app.get("/", (req, res) => res.send("server is ready"));

app.use(notFound);

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on Port ${port}`));
