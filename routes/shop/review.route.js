import express from "express";
import { addProductReview, getProductReview } from "../../controller/shop/review-controller.js";
const route = express.Router();

route.post('/add',addProductReview)
route.get('/:productId',getProductReview)

export default route;