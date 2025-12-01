import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
  image: {
    type: String,
  },
  title:{
    type:String
  },
  discription: {
    type: String,
  },
  category: {
    type: String,
  },
  brand: {
    type: String,
  },
  price: {
    type: String,
  },
  salePrice: {
    type: String,
  },
  totalStock: {
    type: String,
  },
},{timestamps:true});
const Product = mongoose.model("Product", productSchema)
export default Product;