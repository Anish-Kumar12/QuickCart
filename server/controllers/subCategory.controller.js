import SubCategoryModel from "../models/subCategory.model.js";
import { deleteImageCloudinary } from "../utils/uploadImageCloudinary.js";
import { redis } from "../index.js";

const SUBCATEGORY_CACHE_KEY = "subcategories";

export const AddSubCategoryController = async (request, response) => {
  try {
    const { name, image, category } = request.body;

    if (!name && !image && !category[0]) {
      return response.status(400).json({
        message: "Provide name, image, category",
        error: true,
        success: false,
      });
    }

    const payload = {
      name,
      image,
      category,
    };

    const createSubCategory = new SubCategoryModel(payload);
    const save = await createSubCategory.save();

    // Clear Redis cache
    await redis.del(SUBCATEGORY_CACHE_KEY);

    return response.json({
      message: "Sub Category Created",
      data: save,
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const getSubCategoryController = async (request, response) => {
  try {
    // Check if data is in Redis cache
    const cachedData = await redis.get(SUBCATEGORY_CACHE_KEY);
    if (cachedData) {
      console.log("Sub Category data (from cache)");
      return response.json({
        message: "Sub Category data (from cache)",
        data: JSON.parse(cachedData),
        error: false,
        success: true,
      });
    }

    const data = await SubCategoryModel.find()
      .sort({ createdAt: -1 })
      .populate("category");

    // Store data in Redis cache
    await redis.set(SUBCATEGORY_CACHE_KEY, JSON.stringify(data));

    return response.json({
      message: "Sub Category data",
      data: data,
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const updateSubCategoryController = async (request, response) => {
  try {
    const { _id, name, image, category } = request.body;
    const existingSubCategory = await SubCategoryModel.findById(_id);
    if (!existingSubCategory) {
      return response.status(400).json({
        message: "Subcategory not found",
        error: true,
        success: false,
      });
    }

    if (existingSubCategory.image !== image) {
      const publicIdMatch =
        existingSubCategory.image.match(/\/([^\/]+)\.[^\/]+$/);
      const publicId = publicIdMatch ? publicIdMatch[1] : null;
      if (publicId) {
        await deleteImageCloudinary(publicId);
      }
    }

    const checkSub = await SubCategoryModel.findById(_id);

    if (!checkSub) {
      return response.status(400).json({
        message: "Check your _id",
        error: true,
        success: false,
      });
    }

    const updateSubCategory = await SubCategoryModel.findByIdAndUpdate(_id, {
      name,
      image,
      category,
    });

    // Clear Redis cache
    await redis.del(SUBCATEGORY_CACHE_KEY);

    return response.json({
      message: "Updated Successfully",
      data: updateSubCategory,
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const deleteSubCategoryController = async (request, response) => {
  try {
    const { _id } = request.body;
    const subCategory = await SubCategoryModel.findById(_id);
    if (!subCategory) {
      return response.status(404).json({
        message: "Subcategory not found",
        error: true,
        success: false,
      });
    }

    const publicIdMatch = subCategory.image.match(/\/([^\/]+)\.[^\/]+$/);
    const publicId = publicIdMatch ? publicIdMatch[1] : null;

    if (publicId) {
      await deleteImageCloudinary(publicId);
    }
    const deleteSub = await SubCategoryModel.findByIdAndDelete(_id);

    // Clear Redis cache
    await redis.del(SUBCATEGORY_CACHE_KEY);

    return response.json({
      message: "Delete successfully",
      data: deleteSub,
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
