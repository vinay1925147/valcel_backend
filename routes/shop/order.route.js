import express from "express"
import { createPayment, verifyPayment } from "../../controller/shop/order.controller.js";

const route = express.Router();

route.post('/create',createPayment)
route.post('/verify',verifyPayment)
export default route;