import AddressModel from "../models/address.model.js";
import UserModel from "../models/user.model.js"; 
import { redis } from "../index.js";

export const addAddressController = async (request, response) => {
    try {
        const userId = request.userId;
        const { address_line, city, state, pincode, country, mobile } = request.body;

        const createAddress = new AddressModel({
            address_line,
            city,
            state,
            country,
            pincode,
            mobile,
            userId: userId 
        });
        const saveAddress = await createAddress.save();

        await UserModel.findByIdAndUpdate(userId, {
            $push: {
                address_details: saveAddress._id
            }
        });

        await redis.del(`user:${userId}:addresses`);

        const cachedAddresses = await redis.get(`user:${userId}:addresses`);
        if (cachedAddresses) {
            const addresses = JSON.parse(cachedAddresses);
            addresses.push(saveAddress);
            await redis.set(`user:${userId}:addresses`, JSON.stringify(addresses), 'EX', 3600);
        }

        return response.json({
            message: "Address Created Successfully",
            error: false,
            success: true,
            data: saveAddress
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

export const getAddressController = async (request, response) => {
    try {
        const userId = request.userId;

        const cachedAddresses = await redis.get(`user:${userId}:addresses`);
        if (cachedAddresses) {
            return response.json({
                data: JSON.parse(cachedAddresses),
                message: "List of address",
                error: false,
                success: true
            });
        }

        const data = await AddressModel.find({ userId: userId }).sort({ createdAt: -1 });

        await redis.set(`user:${userId}:addresses`, JSON.stringify(data), 'EX', 3600);

        return response.json({
            data: data,
            message: "List of address",
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

export const updateAddressController = async (request, response) => {
    try {
        const userId = request.userId;
        const { _id, address_line, city, state, country, pincode, mobile } = request.body;

        const updateAddress = await AddressModel.updateOne({ _id: _id, userId: userId }, {
            address_line,
            city,
            state,
            country,
            mobile,
            pincode
        });

        const updatedAddress = await AddressModel.findById(_id);

        await redis.del(`user:${userId}:addresses`);

        const cachedAddresses = await redis.get(`user:${userId}:addresses`);
        if (cachedAddresses) {
            const addresses = JSON.parse(cachedAddresses);
            const index = addresses.findIndex(address => address._id.toString() === _id);
            if (index !== -1) {
                addresses[index] = updatedAddress;
                await redis.set(`user:${userId}:addresses`, JSON.stringify(addresses), 'EX', 3600);
            }
        }

        return response.json({
            message: "Address Updated",
            error: false,
            success: true,
            data: updateAddress
        });
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

export const deleteAddressController = async (request, response) => {
    try {
        const userId = request.userId;
        const { _id } = request.body;

        const disableAddress = await AddressModel.updateOne({ _id: _id, userId }, {
            status: false
        });

        await redis.del(`user:${userId}:addresses`);

        return response.json({
            message: "Address removed",
            error: false,
            success: true,
            data: disableAddress
        });
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}
