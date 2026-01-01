import { Address } from "../../models/address.js";

export const addAddress = async (req, res) => {
  try {
    const { address, city, pincode, phone, notes, userId } = req.body;
    console.log(userId, address);
    if (!userId || !address || !city || !pincode || !phone || !notes) {
      return res.status(400).json({
        msg: "All fields are required",
        success: false,
      });
    }
    const newAddress = new Address({
      userId,
      address,
      city,
      pincode,
      phone,
      notes,
    });
    await newAddress.save();
    res.status(201).json({
      msg: "Address added successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error adding address",
      success: false,
    });
  }
};

export const getAddresses = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({
        msg: "userId is required",
        success: false,
      });
    }
    const addressList = await Address.find({ userId });
    res.status(200).json({
      data: addressList,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error getting address",
      success: false,
    });
  }
};
export const deleteAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    if (!userId || !addressId) {
      return res.status(400).json({
        msg: "userId and addressID is required",
        success: false,
      });
    }
    const deleteAddress = await Address.findOneAndDelete({
      _id: addressId,
      userId: userId,
    });

    if (!deleteAddress) {
      return res.status(404).json({
        msg: "deleteAddress not found",
        success: false,
      });
    }

    res.status(200).json({
      msg: "Address deleted successfully",
      success: true,
      data: deleteAddress,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error deleting address",
      success: false,
    });
  }
};

export const editAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const { formData } = req.body;
    console.log(formData);
    if (!userId || !addressId) {
      return res.status(400).json({
        msg: "userId and addressId are required",
        success: false,
      });
    }

    if (!formData || Object.keys(formData).length === 0) {
      return res.status(400).json({
        msg: "No data provided to update",
        success: false,
      });
    }

    const updatedAddress = await Address.findOneAndUpdate(
      { _id: addressId, userId },
      formData,
      { new: true, runValidators: true }
    );

    if (!updatedAddress) {
      return res.status(404).json({
        msg: "Address not found",
        success: false,
      });
    }

    res.status(200).json({
      msg: "Address edited successfully",
      success: true,
      data: updatedAddress,
    });
  } catch (error) {
    console.error("Edit Address Error:", error);
    res.status(500).json({
      msg: "Error editing address",
      success: false,
    });
  }
};
