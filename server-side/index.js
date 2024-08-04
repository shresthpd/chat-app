import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import cookieParser from "cookie-parser";
import { userRoutes } from "./routes/userRoutes.js";
import cors from "cors";
import chatRouter from "./routes/chatRoutes.js";

const app = express();
dotenv.config({ path: "./.env" });
app.use(express.json());
app.get("/", (req, res) => {
  res.send("API is running");
});

app.use(cors({ credentials: true, origin: true }));

// const MONGODB_URI = process.env.MONGODB_URI;
// console.log(MONGODB_URI);
app.use(cookieParser());
const PORT = process.env.PORT || 8080;

connectDB()
  .then(() => {
    app.listen(process.env.PORT || PORT, () => {
      console.log(`Server is running at Port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("MONGO DB connection failed !!!", error);
  });

app.use("/user", userRoutes);
app.use("/chat", chatRouter);
