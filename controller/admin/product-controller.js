import { ImageUpload } from "../../config/cloudinary.js";
import Product from "../../models/product.js";

export const handleImageUplaod = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await ImageUpload(url);
    res.json({
      success: true,
      result: result,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      msg: "some error occurred",
    });
  }
};

// add product
export const addProduct = async (req, res) => {
  try {
    const {
      title,
      image,
      discription,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;
    // validation
    // if (
    //   !title ||
    //   !image ||
    //   !discription ||
    //   !category ||
    //   !brand ||
    //   !price ||
    //   !salePrice ||
    //   !totalStock
    // ) {
    //   return res.json({
    //     success: false,
    //     msg: "all fields are required",
    //   });
    // }
    const newProduct = new Product({
      image,
      title,
      discription,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    });
    await newProduct.save();
    res.status(201).json({
      success: true,
      msg: "product added successfully in Database",
      data: newProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      msg: "some error during adding product",
    });
  }
};

// fetch/read all products
export const getAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.find({});
    res.status(200).json({
      success: true,
      msg: "all products fetched successfully",
      products: allProducts,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      msg: "some error during fetching product",
    });
  }
};

// update the product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      image,
      title,
      discription,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;
    const findProduct = await Product.findByIdAndUpdate(id);
    if (!findProduct) {
      return res.status(404).json({
        success: false,
        msg: "product not found",
      });
    }

    findProduct.image = image || findProduct.image;
    findProduct.title = title || findProduct.title;
    findProduct.discription = discription || findProduct.discription;
    findProduct.brand = brand || findProduct.brand;
    findProduct.category = category || findProduct.category;
    findProduct.price = price || findProduct.price;
    findProduct.salePrice = salePrice || findProduct.salePrice;
    findProduct.totalStock = totalStock || findProduct.totalStock;

    await findProduct.save();
    res.status(200).json({
          success: true,
      msg: "All products updated successfully",
        data: findProduct,
    })
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      msg: "some error during updating product",
    });
  }
};

// delete the product
export const deleteProduct = async (req, res) => {
  try {
    const {id} = req.params;
    const deletesProduct = await Product.findByIdAndDelete(id);
    if(!deletesProduct){
        return res.status(404).json({
        success: false,
        msg: "product not found",
      });
    }
    res.status(200).json({
        success:true,
        msg:"product deleted successfully",
        data: deletesProduct,
    })
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      msg: "some error during fetching product",
    });
  }
};
