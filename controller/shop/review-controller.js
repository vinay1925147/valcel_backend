import Review from "../../models/review.js";
import Order from '../../models/order.js'
import Product from "../../models/product.js";
export const addProductReview = async (req, res) => {
  try {
    const { productId, userId, userName, reviewMessage, reviewValue } =
      req.body;
  
    const order = await Order.findOne({
      userId,
      //  "cartItems._id": productId,
      orderStatus: "pending",
    });
     console.log(order)
    if (!order) {
      return res.status(403).json({
        success: false,
        message: "You need to purchase product to review it.",
      });
    }

    const checkExistinfReview = await Review.findOne({
      productId,
      userId,
    });

    if (checkExistinfReview) {
      return res.status(400).json({
        success: false,
        message: "You already reviewed this product!",
      });
    }

    const newReview = new Review({
      productId,
      userId,
      userName,
      reviewMessage,
      reviewValue,
    });

    await newReview.save();

    const reviews = await Review.find({ productId });
    const totalReviewsLength = reviews.length;
    console.log("totalReviewsLength",totalReviewsLength)
    const averageReview =
      reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
      totalReviewsLength;
    console.log("averageReview",averageReview)
    await Product.findByIdAndUpdate(productId, { averageReview });

    res.status(201).json({
      success: true,
      data: newReview,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

export const getProductReview =  async (req, res) => {
  try {
    let {productId} = req.params;
    const getSingleReview = await Review({productId});
    res.status(200).json({
      success:true,
      data:getSingleReview,
      msg:"Review adding successfully"
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: "Error get review",
    });
  }
};
