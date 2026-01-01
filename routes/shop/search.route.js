import express from "express"
import { searchProducts } from "../../controller/shop/search-controller.js";
const route = express.Router();


route.get('/:keyword', searchProducts);
export default route;