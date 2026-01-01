import express from "express";
import { addAddress, deleteAddress, editAddress, getAddresses,  } from "../../controller/shop/address.controller.js";
const routes = express.Router();

routes.post("/add", addAddress);//--> create
routes.get("/get/:userId", getAddresses);//--> read
routes.delete("/delete/:userId/:addressId", deleteAddress);//--> delete
routes.put("/edit/:userId/:addressId", editAddress); //--> update

export default routes;

