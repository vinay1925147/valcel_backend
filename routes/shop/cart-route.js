import express from "express"
import { addCartItems, deleteCartItems, getCartItems, updateCartItems } from "../../controller/shop/cart-controller.js";

const router = express.Router();

router.post('/add', addCartItems);
router.get('/get/:userId', getCartItems);
router.put('/update-cart', updateCartItems);
router.delete('/:userId/:productId', deleteCartItems);


export default router;
