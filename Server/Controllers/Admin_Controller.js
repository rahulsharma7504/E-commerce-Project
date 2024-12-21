const userDB = require('../Models/userModel');
const vendorDB = require('../Models/vendorModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createVendor = async (req, res) => {
    try {
        const { name, email, password, phone, storeName, role } = req.body;
        const findVendor = await userDB.find({ email });
        if (findVendor) return res.status(200).send({ message: 'Anyone Already Register from this ' + email + ' Mail ID' })
        const hashPassword = await bcrypt.hash(password, 15);
        const createUser = await userDB({
            name,
            email,
            password: hashPassword,
            phone,
            role
        });
        const USER = await createUser.save();
        const createVendor = await vendorDB({
            user: USER._id,
            storeName
        });
        await createVendor.save();
        res.status(201).json({ message: "Vendor has been Created Successfully!", Data: createVendor });


    } catch (error) {
        if (error) throw error.message
        res.status(400).send({ message: 'Something Went Wronge' })

    }
}

const getAllUsers = async (req, res) => {
    try {
        const allUsers = await userDB.find({ role: { $nin: ['admin'] } });

        if (!allUsers || allUsers.length === 0) {
            return res.status(404).send({ message: "No users found" });
        }

        res.status(200).send({ message: "All Users", data: allUsers });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Something went wrong', error: error.message });
    }
};



const Status = async (req, res) => {
    try {
        const { id, status } = req.body;
        if (!id || !status) {
            return res.status(400).json({ message: "ID and status are required" });
        }

        const findUser = await userDB.findOne({ _id: id });

        if (!findUser) {
            return res.status(404).json({ message: "User not found" });
        }

        findUser.status = status;  // Dynamically adding 'status'

        // Save the updated user document
        const updatedUser = await findUser.save();

        res.status(200).json({ message: "Status Updated", data: updatedUser.toObject() });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Something went wrong', error: error.message });
    }
};

const updateUserOrVendorDetails = async (req, res) => {
    try {
        const { adminId, userId, updatedData } = req.body;

        const adminUser = await userDB.findById(adminId);
        if (!adminUser || adminUser.role !== 'admin') {
            return res.status(403).json({ message: "You do not have permission to update user or vendor details" });
        }

        const userToUpdate = await userDB.findById(userId);
        if (!userToUpdate) {
            return res.status(404).json({ message: "User not found" });
        }

        if (userToUpdate.role === 'vendor') {
            const vendorDetails = await vendorDB.findOne({ user: userId });
            if (!vendorDetails) {
                return res.status(404).json({ message: "Vendor details not found" });
            }

            Object.assign(vendorDetails, updatedData);
            Object.assign(userToUpdate, updatedData)

            await vendorDetails.save();
            await userToUpdate.save();

            return res.status(200).json({
                message: "Vendor details updated successfully",
                data: {
                    user: userToUpdate,
                    vendor: vendorDetails
                },
            });
        } else if (userToUpdate.role === 'user') {
            Object.assign(userToUpdate, updatedData);

            await userToUpdate.save();

            return res.status(200).json({
                message: "User details updated successfully",
                data: userToUpdate,
            });
        } else {
            return res.status(400).json({ message: "Invalid user role" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
}


const DeleteAny = async (req, res) => {
    try {
        const { id } = req.body;
        const DeleteAny = await userDB.findByIdAndDelete({ _id: id });
        res.status(200).json({ message: 'Action Completed', data: DeleteAny })
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Something went wrong', error: error.message });
    }
};

module.exports = {
    createVendor,
    getAllUsers,
    Status,
    updateUserOrVendorDetails,
    DeleteAny
}







