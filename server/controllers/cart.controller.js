import CartProductModel from "../models/cartProduct.modell.js";
import UserModel from "../models/user.model.js";
import redis from '../dbconfig/redis.js';

export const addToCartItemController = async (request, response) => {
    try {
        const userId = request.userId;
        const { productId } = request.body;

        if (!productId) {
            return response.status(402).json({
                message: "Provide productId",
                error: true,
                success: false
            });
        }

        const checkItemCart = await CartProductModel.findOne({
            userId: userId,
            productId: productId
        });

        if (checkItemCart) {
            return response.status(400).json({
                message: "Item already in cart"
            });
        }

        const cartItem = new CartProductModel({
            quantity: 1,
            userId: userId,
            productId: productId
        });
        const save = await cartItem.save();

        await UserModel.updateOne({ _id: userId }, {
            $push: {
                shopping_cart: productId
            }
        });

        await redis.del(`user:${userId}:cart`);

        return response.json({
            data: save,
            message: "Item added successfully",
            error: false,
            success: true
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

export const getCartItemController = async (request, response) => {
    try {
        const userId = request.userId;

        const cachedCart = await redis.get(`user:${userId}:cart`);
        if (cachedCart) {
            return response.json({
                data: JSON.parse(cachedCart),
                error: false,
                success: true
            });
        }

        const cartItem = await CartProductModel.find({
            userId: userId
        }).populate('productId');

        await redis.set(`user:${userId}:cart`, JSON.stringify(cartItem), 'EX', 3600); 

        return response.json({
            data: cartItem,
            error: false,
            success: true
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

export const updateCartItemQtyController = async (request, response) => {
    try {
        const userId = request.userId;
        const { _id, qty } = request.body;

        if (!_id || !qty) {
            return response.status(400).json({
                message: "Provide _id and qty"
            });
        }

        const updateCartItem = await CartProductModel.updateOne({
            _id: _id,
            userId: userId
        }, {
            quantity: qty
        });

        await redis.del(`user:${userId}:cart`);

        return response.json({
            message: "Cart updated",
            success: true,
            error: false,
            data: updateCartItem
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

export const deleteCartItemQtyController = async (request, response) => {
    try {
        const userId = request.userId; // middleware
        const { _id } = request.body;

        if (!_id) {
            return response.status(400).json({
                message: "Provide _id",
                error: true,
                success: false
            });
        }

        const deleteCartItem = await CartProductModel.deleteOne({ _id: _id, userId: userId });

        await redis.del(`user:${userId}:cart`);

        return response.json({
            message: "Item removed",
            error: false,
            success: true,
            data: deleteCartItem
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}
