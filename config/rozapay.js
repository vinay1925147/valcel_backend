import dotenv from 'dotenv'
dotenv.config();

import Razorpay from 'razorpay';

 export const  instance = new Razorpay({
  key_id: process.env.ROZERPAY_API_KEY ,
  key_secret: process.env.ROZERPAY_API_SECRET,
});

