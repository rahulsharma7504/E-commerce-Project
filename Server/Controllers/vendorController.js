const ProductModel = require('../Models/productModel');
const CategoryModel = require('../Models/categoryModel');
const ReviewModel = require('../Models/reviewsModel');
const { cloudinary } = require('../Config/Cloudinary')
const vendorDB = require('../Models/vendorModel');
const productModel = require('../Models/productModel');
const userDB = require('../Models/userModel');
const mongoose=require('mongoose');




const createProduct = async (req, res) => {
    const { name, description, price, stockQuantity, color, categoryName } = req.body;
    const { vendorId } = req.params;
 
    try {
        // Validate required fields
        if (!name || !description || !price || !stockQuantity || !color || !categoryName || !vendorId) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Ensure files exist
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: "Product images are required." });
        }

        const productImages = req.files.map(file => file.path);

        // Check if product already exists
        const findexistProduct = await ProductModel.findOne({ name });
        if (findexistProduct) {  
            return res.status(400).json({ message: "Product already exists." });
        }

        // Validate vendor existence
        const vendor = await vendorDB.findOne({user:vendorId});
        if (!vendor) {
            return res.status(404).json({ message: "Vendor not found." });
        }

        // Find category
        const category = await CategoryModel.findOne({ name: categoryName });
        if (!category) {
            return res.status(400).json({ message: "Category not found." });
        }

        // Upload images to Cloudinary
        const uploadedImages = await Promise.all(
            productImages.map(filePath => cloudinary.uploader.upload(filePath))
        );

        // Extract secure URLs
        const imageUrls = uploadedImages.map(image => image.secure_url);

        // Create product
        const product = new ProductModel({
            name,
            images: imageUrls,
            price,
            stockQuantity,
            color,
            description,
            category: category._id,
            vendor: vendor._id,
        });

        // Save product
        await product.save();

        // Update category with product ID
        category.products.push(product._id);
        await category.save();

        // Update vendor with product ID
        vendor.products.push(product._id);
        await vendor.save();

        res.status(201).json({ message: "Product created successfully" });
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ error: "Internal server error." });
    }
};




const AllProduct = async (req, res) => {
    try {
        // const allProduct = await ProductModel.find().populate('reviews');
        const { vendorId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(vendorId)) {
            return res.status(400).json({ message: "Invalid vendor ID" });
        }
        
        const findVendor=await vendorDB.findOne({user:vendorId})
        
        if(!findVendor){
            return res.status(404).json({ message: "Vendor not found" });
        }
        const allProducts = await ProductModel.find({ vendor: findVendor._id }).populate('category')
        if (!allProducts) {
            return res.status(404).json({ message: "No products found for this vendor" });
        }
        
        res.status(200).json(allProducts);
    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).json({ error: "Internal Server Error" });
    }
} 

const UpdateProduct = async (req, res) => {
    try {
        const { vendorId } = req.params;
        const { name, description, color, price, stockQuantity, categoryName, productId } = req.body;

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



        const vendor = await vendorDB.findOne({user:vendorId});
        if (!vendor) {
            return res.status(404).json({ message: "Vendor not found." });
        }


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
                    vendor: vendor._id,
                }
            }, // Update document
            { new: true } // To     return the updated document
        );
        
        console.log(updateProduct)
        // Product found, send it in the response
        res.status(200).json({ message: "Update Product Success", });
    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).json({ error: "Internal Server Error" });
    }
}


const DeleteProduct = async (req, res) => {
    try {
        const { productId } = req.params;

        // Validate productId
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ message: "Invalid product ID" });
        }

        // Step 1: Find the product
        const singleProduct = await ProductModel.findById(productId).populate('category');
        if (!singleProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        const categoryId = singleProduct.category?._id;

        // Step 2: Remove the product reference from the category's products array
        if (categoryId) {
            const category = await CategoryModel.findById(categoryId);
            if (category) {
                category.products = category.products.filter(
                    (product) => product.toString() !== singleProduct._id.toString()
                );
                await category.save();
            }
        }

        // Step 3: Optionally delete all reviews associated with this product
        await ReviewModel.deleteMany({ product: productId });

        // Step 4: Remove the product from the vendor's products array
        if (singleProduct.vendor) {
            const findVendor = await vendorDB.findById(singleProduct.vendor);
            if (findVendor) {
                findVendor.products = findVendor.products.filter(
                    (product) => product.toString() !== singleProduct._id.toString()
                );
                await findVendor.save();
            }
        }

        // Step 5: Delete the product
        await ProductModel.findByIdAndDelete(productId);

        // Step 6: Return a success message
        res.status(200).json({ message: "Product and associated data deleted successfully" });
    } catch (error) {
        console.error("Error deleting product:", error); // Log the error for debugging
        return res.status(500).json({ error: "Internal Server Error" });
    }
};


module.exports = {
    createProduct,
    AllProduct,
    UpdateProduct,
    DeleteProduct
}