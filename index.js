import dotenv from "dotenv";
dotenv.config();

import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import adminRoute from "./routes/admin/product-route.js";
import authRoute from "./routes/auth/auth-route.js";
import shopProductRoute from "./routes/shop/product-route.js";
import shopCartRoute from "./routes/shop/cart-route.js"
const app = express();

mongoose
  .connect(process.env.MONGODB_URL) 
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.error("mongo error:", err);
  });

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

 app.get("/" , (req,res)=>{
  res.send("Hello  World")
 })
app.use("/api/auth", authRoute);
app.use("/api/admin/product", adminRoute);
app.use("/api/shop/product", shopProductRoute);
app.use("/api/shop/cart",shopCartRoute)



const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`server is started at http://localhost:${PORT}`);
});
