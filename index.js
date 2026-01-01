import dotenv from "dotenv";
dotenv.config();

import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import adminRoute from "./routes/admin/product-route.js";
import authRoute from "./routes/auth/auth-route.js";
import shopProductRoute from "./routes/shop/product-route.js";
import shopCartRoute from "./routes/shop/cart-route.js";
import shopAddressRoute from "./routes/shop/address.route.js";
import shopOrderRoute from "./routes/shop/order.route.js"
import shopSearchRoute from "./routes/shop/search.route.js"
import shopReviewRoute from "./routes/shop/review.route.js"
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
    origin: "https://vercel-frontend-coral-delta.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.use("/api/auth", authRoute);
app.use("/api/admin/product", adminRoute);
app.use("/api/shop/product", shopProductRoute);
app.use("/api/shop/cart",shopCartRoute);
app.use("/api/shop/address",shopAddressRoute);
app.use("/api/shop/order",shopOrderRoute);
app.use("/api/shop/search",shopSearchRoute);
app.use("/api/shop/review",shopReviewRoute);


// const PORT = process.env.PORT || 8000;
// app.listen(PORT, () =>{
//   console.log(`server is started at http://localhost:${PORT}`);
// });
export default app;