const dotenv = require('dotenv').config()
const userDB = require('../Models/userModel');
const vendorDB = require('../Models/vendorModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const CategoryModel = require('../Models/categoryModel');
const ProductModel = require('../Models/productModel');
const path = require('path');

const ReviewModel = require('../Models/reviewsModel');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// User Management API

const getAllUsers = async (req, res) => {
    try {
        const allUsers = await userDB.find({ role: 'user' })
            .limit(10)
            .select('-password');


        if (!allUsers || allUsers.length === 0) {
            return res.status(404).send({ message: "No users found" });
        }

        res.status(200).json(allUsers);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Something went wrong', error: error.message });
    }
};



const UpdateUserStatus = async (req, res) => {
    try {
        const { userId, status } = req.body;
        if (!userId || !status) {
            return res.status(400).json({ message: "ID and status are required" });
        }

        const findUser = await userDB.findOne({ _id: userId });

        if (!findUser) {
            return res.status(404).json({ message: "User not found" });
        }

        findUser.status = status;  // Dynamically adding 'status'

        // Save the updated user document
        const updatedUser = await findUser.save();

        res.status(200).json({ message: "Status Updated" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Something went wrong', error: error.message });
    }
};







// Vendor Management API

const createVendor = async (req, res) => {
    try {
        // Destructure vendor data from request body
        const { name, email, password, phone, storeName, role = 'vendor' } = req.body.vendorData;

        // Check if all required fields are provided
        if (!name || !email || !password || !phone || !storeName) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if vendor with the same email already exists
        const findVendor = await userDB.find({ email });
        if (findVendor.length > 0) {
            return res.status(400).send({ message: `A user is already registered with this email ID: ${email}` });
        }

        // Hash the password before saving it to the database
        const hashPassword = await bcrypt.hash(password, 15);

        // Create a new user in the userDB
        const createUser = new userDB({
            name,
            email,
            password: hashPassword,
            phone,
            role
        });

        // Save the user
        const USER = await createUser.save();

        // Create the vendor entry in the vendorDB
        const createVendor = new vendorDB({
            user: USER._id,
            storeName
        });

        // Save the vendor
        await createVendor.save();

        // Send success response
        res.status(201).json({ message: "Vendor has been created successfully!" });

    } catch (error) {
        // Properly handle errors and return a message
        console.error(error);
        res.status(500).send({ message: 'Something went wrong. Please try again later.' });
    }
};


const getAllVendors = async (req, res) => {
    try {
        const allVendors = await vendorDB.find().populate('user'); // Use 'user' instead of 'User' here

        if (!allVendors || allVendors.length === 0) {
            return res.status(404).send({ message: "No vendors found" });
        }

        res.status(200).json(allVendors);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Something went wrong', error: error.message });
    }
};


const updateUserOrVendorDetails = async (req, res) => {
    try {
        const { userId, updatedData } = req.body;


        const VendorData = {
            name: updatedData.name || userToUpdate.name,
            email: updatedData.email || userToUpdate.email,
            phone: updatedData.phone || userToUpdate.phone,
            role: updatedData.role || userToUpdate.role,
            storeName: updatedData.storeName || vendorDetails.storeName,
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

            Object.assign(vendorDetails, VendorData);
            Object.assign(userToUpdate, VendorData)

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

const deleteVendor = async (req, res) => {
    try {
        const { userId } = req.params;
        const userToDelete = await userDB.findById(userId);
        if (!userToDelete) {
            return res.status(404).json({ message: "User not found" });
        }
        if (userToDelete.role === 'vendor') {
            const vendorDetails = await vendorDB.findOneAndDelete({ user: userId });
            const deletedUser = await userDB.findByIdAndDelete(userId);
            if (!vendorDetails) {
                return res.status(404).json({ message: "Vendor details not found" });
            }
        }
        res.status(200).json({ message: "Vendor deleted successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Something went wrong', error: error.message });
    }
};




// Categorizes APIs and returns  them
const getAllCategories = async (req, res) => {
    try {
        const allCategory = await CategoryModel.find();
        res.status(200).json(allCategory);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Create categories
const createCategory = async (req, res) => {
    try {
        const { category } = req.body;
        const findexistCategory = await CategoryModel.findOne({ name: category.toLowerCase() });
        if (findexistCategory) {
            return res.status(400).json({ message: "Category Already Exist" });
        }

        const createCategory = await new CategoryModel({
            name: category.toLowerCase(), // Assuming you're using a predefined category name for now
        }).save();
        return res.status(201).json({ message: "Category Created" });
    } catch (error) {
        if (error) throw error;
        return res.status(500).json({ error: "Internal Server Error" });

    }
}


const updateCategory = async (req, res) => {
    try {
        const { categoryName, categoryId } = req.body;
        const updateCat = await CategoryModel.findByIdAndUpdate({ _id: categoryId }, { $set: { name: categoryName } }, { new: true });
        return res.status(200).json({ message: "Category Updated" });
    } catch (error) {
        if (error) throw error;
        return res.status(500).json({ error: "Internal Server Error" });

    }
}

// Delete Category
const DeleteCategory = async (req, res) => {
    try {

        const { categoryId } = req.params;
        const deleteCategory = await CategoryModel.findByIdAndDelete({ _id: categoryId });
        res.status(200).json({ message: "Category Deleted" });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: "Internal Server Error" });
    }
}


// Products Management API



const createProduct = async (req, res) => {
    const { name, description, price, stockQuantity, color, categoryName, vendorId } = req.body;

    try {
        if (!name || !description || !price || !stockQuantity || !color || !categoryName || !vendorId) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: "No images uploaded" });
        }

        const productImages = req.files.map(file => file.path);
        const findexistProduct = await ProductModel.findOne({ name });
        if (findexistProduct) {
            return res.status(400).json({ message: "Product already exists" });
        }

        const category = await CategoryModel.findOne({ name: categoryName });
        if (!category) {
            return res.status(400).json({ message: "Category not found" });
        }

        // Upload images to Cloudinary
        const uploadedImages = await Promise.all(
            productImages.map((filePath, index) =>
                cloudinary.uploader.upload(filePath)
            )
        )
        const imageUrls = uploadedImages.map(image => image.secure_url);

        const product = new ProductModel({
            name,
            images: imageUrls,
            price,
            stockQuantity,
            color,
            description,
            category: category._id,
            vendor: vendorId,
        });

        await product.save();

        category.products = category.products || [];
        category.products.push(product._id);
        await category.save();
        // Save Product to vendor Account
        const vendor = await vendorDB.findById(vendorId);
        vendor.products = vendor.products || [];
        vendor.products.push(product._id);
        await vendor.save();


        res.status(201).json({ message: "Product created successfully" });
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};





const AllProduct = async (req, res) => {
    try {
        // const allProduct = await ProductModel.find().populate('reviews');
        const allProducts = await ProductModel.find().populate({
            path: 'category',
            select: 'name' // only return the name of the category,
        });

        res.status(200).json(allProducts);
    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

const UpdateProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const { name, description, color, price, stockQuantity, categoryName, vendorId } = req.body;
        console.warn(req.body)

        var uploadedImages
        // Check if req.file exists and set the image path accordingly
        if (req.files) {
            const productImages = req.files.map(file => file.path);
            // Upload images to Cloudinary
            uploadedImages = await Promise.all(
                productImages.map((filePath, index) =>
                    cloudinary.uploader.upload(filePath)
                )
            );
        }
        const imageUrls = uploadedImages.map(image => image.secure_url);

        const category = await CategoryModel.findOne({ name: categoryName });
        if (!category) {
            return res.status(400).json({ error: "Category not found" });
        }


        const updateProduct = await ProductModel.findByIdAndUpdate(
            { _id: productId }, // Filter criteria
            {
                $set: {
                    name: name,
                    price: price,
                    color,
                    description: description,
                    category: category._id,
                    image: imageUrls,
                    stockQuantity: stockQuantity,
                    vendor: vendorId,
                }
            }, // Update document
            { new: true } // To     return the updated document
        );
        console.log(updateProduct)
        // Product found, send it in the response
        res.status(200).json({ message: "Update Product Success", product: updateProduct });
    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
const DeleteProduct = async (req, res) => {
    try {
        const { productId } = req.params;

        // Step 1: Find the product and populate its category
        const singleProduct = await ProductModel.findById(productId).populate('category');

        if (!singleProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        const categoryId = singleProduct.category._id;

        // Step 2: Remove the product reference from the category's products array
        const category = await CategoryModel.findById(categoryId);
        if (category) {
            category.products = category.products.filter(product => product.toString() !== productId);
            await category.save();
        }

        // Step 3: Optionally delete all reviews associated with this product
        // Assuming you want to delete the reviews too, if needed
        await ReviewModel.deleteMany({ product: productId });

        // Step 4: Delete the product
        await ProductModel.findByIdAndDelete(productId);

        // Step 5: Return a success message
        res.status(200).json({ message: "Product and associated data deleted successfully" });

    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

// Admin Update Profile

const updateProfile = async (req, res) => {
    try {
        const { name, email, currentPassword, newPassword, confirmPassword, userId } = req.body;

        const user = await userDB.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (currentPassword, newPassword, confirmPassword) {
            if (newPassword && newPassword !== confirmPassword) {
                return res.status(400).json({ message: "Passwords do not match" });
            }
            // Check if current password matches
            const match = await bcrypt.compare(currentPassword, user.password);
            if (!match) {
                return res.status(401).json({ message: "Incorrect current password" });
            }
            // Hash the new password
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            // Update the user's password
            user.password = hashedPassword;
        }

        // Update the user's name and email
        user.name = name;
        user.email = email;
        // Save the updated user
        await user.save();

        res.status(200).json({ message: "User profile updated successfully" });

    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).json({ error: "Internal Server Error" });
    }

}


module.exports = {
    createVendor,
    getAllUsers,
    updateUserOrVendorDetails,
    getAllCategories,
    createCategory,
    updateCategory,
    DeleteCategory,
    UpdateUserStatus,
    deleteVendor,
    getAllVendors,
    createProduct,
    AllProduct,
    UpdateProduct,
    DeleteProduct,
    updateProfile
}







