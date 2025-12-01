import express from "express";
import { addProduct, deleteProduct, getAllProducts, handleImageUplaod, updateProduct } from "../../controller/admin/product-controller.js";
import { upload } from "../../config/cloudinary.js";
const route = express.Router();

route.post("/upload-image", upload.single("file-name"), handleImageUplaod)

// crud opertions on products
route.post("/add", addProduct)
route.get("/get", getAllProducts)
route.post("/edit/:id", updateProduct)
route.get("/delete/:id", deleteProduct)
export default route;