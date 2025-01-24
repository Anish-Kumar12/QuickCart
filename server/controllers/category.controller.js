import CategoryModel from "../models/category.model.js";
import SubCategoryModel from "../models/subCategory.model.js";
import ProductModel from "../models/products.model.js";
import { deleteImageCloudinary } from "../utils/uploadImageCloudinary.js";
import { redis } from "../index.js";

export const AddCategoryController = async (request, response) => {
  try {
    const { name, image } = request.body;

    if (!name || !image) {
      return response.status(400).json({
        message: "Enter required fields",
        error: true,
        success: false,
      });
    }

    const addCategory = new CategoryModel({
      name,
      image,
    });

    const saveCategory = await addCategory.save();

    // Clear the cache for categories
    await redis.del("categories");

    return response.json({
      message: "Add Category",
      data: saveCategory,
      success: true,
      error: false,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const getCategoryController = async (request, response) => {
  try {
    // Check if categories are cached in Redis
    const cachedCategories = await redis.get("categories");
    if (cachedCategories) {
      console.log('Cached Categories');
      return response.json({
        data: JSON.parse(cachedCategories),
        error: false,
        success: true
      });
    }

    const data = await CategoryModel.find().sort({ createdAt: -1 });

    // Cache the categories in Redis
    await redis.set("categories", JSON.stringify(data), 'EX', 3600); // Cache for 1 hour

    return response.json({
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

export const updateCategoryController = async (request, response) => {
  try {
    const { _id, name, image } = request.body;
    
    const existingCategory = await CategoryModel.findById(_id);
    if (!existingCategory) {
      return response.status(404).json({
        message: "Category not found",
        error: true,
        success: false,
      });
    }
    if (existingCategory.image !== image) {
      const publicIdMatch = existingCategory.image.match(/\/([^\/]+)\.[^\/]+$/);
      const publicId = publicIdMatch ? publicIdMatch[1] : null;

      if (publicId) {
        await deleteImageCloudinary(publicId);
      }
    }
    const update = await CategoryModel.updateOne(
      {
        _id: _id,
      },
      {
        name,
        image,
      }
    );

    // Clear the cache for categories
    await redis.del("categories");

    return response.json({
      message: "Updated Category",
      success: true,
      error: false,
      data: update,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const deleteCategoryController = async (request, response) => {
  try {
    const { _id } = request.body;

    const checkSubCategory = await SubCategoryModel.find({
      category: {
        $in: [_id],
      },
    }).countDocuments();

    const checkProduct = await ProductModel.find({
      category: {
        $in: [_id],
      },
    }).countDocuments();

    if (checkSubCategory > 0 || checkProduct > 0) {
      return response.status(400).json({
        message: "Category is already use can't delete",
        error: true,
        success: false,
      });
    }
    const category = await CategoryModel.findOne({ _id: _id });
    const publicIdMatch = category.image.match(/\/([^\/]+)\.[^\/]+$/);
    const publicId = publicIdMatch ? publicIdMatch[1] : null;

    if (publicId) {
      await deleteImageCloudinary(publicId);
    }

    const deleteCategory = await CategoryModel.deleteOne({ _id: _id });

    // Clear the cache for categories
    await redis.del("categories");

    return response.json({
      message: "Delete category successfully",
      data: deleteCategory,
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: "Category not found",
      success: false,
      error: true,
    });
  }
};
