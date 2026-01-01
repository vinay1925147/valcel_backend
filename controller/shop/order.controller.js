import { instance } from "../../config/rozapay.js";
export const createPayment = async (req, res) => {
  try {
    // const {
    //   userId,
    //   cartItems,
    //   addressInfo,
    //   orderStatus,
    //   paymentMethod,
    //   paymentStatus,
    //   totalAmount,
    //   orderDate,
    //   orderUpdateDate,
    //   paymentId,
    //   payerId,
    //   cartId,
    // } = req.body;
    const { orderData } = req.body;
  
    const options = {
      amount: orderData * 100,
      currency: "INR",
      receipt:`receipt_${Date.now()}`
    };

    const order = await instance.orders.create(options);
   

    if (!order) {
      return res.status(400).json({
        msg: "error",
      });
    }

    //  savedata
    // const newlyCreatedOrder = new Order({
    //   userId,
    //   cartId,
    //   cartItems,
    //   addressInfo,
    //   orderStatus: "CREATED",
    //   paymentMethod: paymentMethod || "Razorpay",
    //   paymentStatus:"PENDING",
    //   totalAmount,
    //   orderDate,
    //   orderUpdateDate,
    //   paymentId: razorpayOrder.id,
    //   payerId: null,
    // });
    // await newlyCreatedOrder.save();

    res.status(200).json({
      data: order,
      msg: "Hello world",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "error occure in created payment",
    });
  }
};


// import crypto from "crypto";

export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;
     console.log(req.body)
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.ROZERPAY_API_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      return res.status(200).json({
        success: true,
        message: "Payment verified successfully",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid signature",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Payment verification failed",
    });
  }
}



// export const verifyPayment = async (req, res) => {
//   // try {
//   //   const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
//   //     req.body;
//   //   const body = razorpay_order_id + "|" + razorpay_payment_id;

//   //   const expectedSignature = crypto
//   //     .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
//   //     .update(body.toString())
//   //     .digest("hex");

//   //   const isAuthentic = expectedSignature === razorpay_signature;
//   //   console.log(isAuthentic);
//   //   if (isAuthentic) {
//   //     // Database comes here
//   //     await PaymentOrder.create({
//   //       razorpay_order_id,
//   //       razorpay_payment_id,
//   //       razorpay_signature,
//   //     });
//   //     res.redirect(
//   //       `http://localhost:5173/shop/paypal-success?reference=${razorpay_payment_id}`
//   //     );
//   //   } else {
//   //     res.status(400).json({
//   //       success: false,
//   //     });
//   //   }
//   // }
//   try {
//      console.log(req.body);
//      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
//       req.body;
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       success: false,
//     });
//   }
// };
// import paypal from "../../config/rozapay.js";
// import Order from "../../models/order.js";
// import Product from "../../models/product.js";

// export const createOrder = async (req, res) => {
//   try {
//     const {
//       userId,
//       cartItems,
//       addressInfo,
//       orderStatus,
//       paymentMethod,
//       paymentStatus,
//       totalAmount,
//       orderDate,
//       orderUpdateDate,
//       paymentId,
//       payerId,
//       cartId,
//     } = req.body;

//     const create_payment_json = {
//       intent: "sale",
//       payer: {
//         payment_method: "paypal",
//       },
//       redirect_urls: {
//         return_url: "http://localhost:5173/shop/paypal-return",
//         cancel_url: "http://localhost:5173/shop/paypal-cancel",
//       },
//       transactions: [
//         {
//           item_list: {
//             items: cartItems.map((item) => ({
//               name: item.title,
//               sku: item.productId,
//               price: item.price.toFixed(2), // STRING
//               currency: "USD",
//               quantity: item.quantity,
//             })),
//           },
//           amount: {
//             currency: "USD",
//             total: totalAmount.toFixed(2),
//           },
//           description: "description",
//         },
//       ],
//     };

//     paypal.payment.create(create_payment_json, async (error, paymentInfo) => {
//       if (error) {
//         console.log(error);
//         return res.status(500).json({
//           success: false,
//           message: "Error while creating paypal payment",
//         });
//       } else {
//         const newlyCreatedOrder = new Order({
//           userId,
//           cartId,
//           cartItems,
//           addressInfo,
//           orderStatus,
//           paymentMethod,
//           paymentStatus,
//           totalAmount,
//           orderDate,
//           orderUpdateDate,
//           paymentId,
//           payerId,
//         });

//         await newlyCreatedOrder.save();

//         const approvalURL = paymentInfo.links.find(
//           (link) => link.rel === "approval_url"
//         ).href;

//         res.status(201).json({
//           success: true,
//           approvalURL,
//           orderId: newlyCreatedOrder._id,
//         });
//       }
//     });
//   } catch (e) {
//     console.log(e);
//     res.status(500).json({
//       success: false,
//       message: "Some error occured!",
//     });
//   }
// };

// export const captureOrder = async (req, res) => {
//   try {
//     const { paymentId, payerId, orderId } = req.body;
//     let order = await Order.findById(orderId);

//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: "Order can not be found",
//       });
//     }

//     order.paymentStatus = "paid";
//     order.orderStatus = "confirmed";
//     order.paymentId = paymentId;
//     order.payerId = payerId;

//     for (let item of order.cartItems) {
//       let product = await Product.findById(item.productId);

//       if (!product) {
//         return res.status(404).json({
//           success: false,
//           message: `Not enough stock for this product ${product.title}`,
//         });
//       }

//       product.totalStock -= item.quantity;
//       await product.save();
//     }

//     const getCartId = order.cartId;
//     await Cart.findByIdAndDelete(getCartId);

//     await order.save();

//     res.status(200).json({
//       success: true,
//       message: "Order confirmed",
//       data: order,
//     });
//   } catch (error) {
//     console.error("captureOrder error:", error);
//     return res.status(500).json({
//       success: false,
//       msg: "Error Occurring During Pay to Order",
//       error: error.message,
//     });
//   }
// };
