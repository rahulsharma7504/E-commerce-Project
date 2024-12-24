const ProductModel = require('../Models/productModel');
const CategoryModel = require('../Models/categoryModel');
const ReviewModel = require('../Models/reviewsModel');
const { cloudinary } = require('../Config/Cloudinary')

const createProduct = async (req, res) => {
    const { name, description, price, stockQuantity, color, categoryName, vendorId } = req.body;

    try {
        const productImages = req.files.map(file => file.path);

        // Check if the product already exists
        const findexistProduct = await ProductModel.findOne({ name });
        if (findexistProduct) {
            return res.status(400).json({ error: "Product already exists" });
        }

        // Find the category by name
        const category = await CategoryModel.findOne({ name: categoryName.toLowerCase() });
        if (!category) {
            return res.status(400).json({ error: "Category not found" });
        }

        // Upload images to Cloudinary
        const uploadedImages = await Promise.all(
            productImages.map((filePath, index) =>
                cloudinary.uploader.upload(filePath)
            )
        );

        // Extract secure URLs from uploaded images
        const imageUrls = uploadedImages.map(image => image.secure_url);

        // Create a new product
        const product = new ProductModel({
            name,
            images: imageUrls, // Save all image URLs as an array
            price,
            stockQuantity,
            color,
            description,
            category: category._id,
            vendor: vendorId,
        });

        // Save the product to the database
        await product.save();
        const updateCategory = await CategoryModel.findOne({ name: categoryName.toLowerCase() });
        // Add the new product's ID to the category's products array
        updateCategory.products.push(product._id);
        await updateCategory.save();

        res.status(201).json({ message: "Product created successfully", product, updateCategory });
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};




const AllProduct = async (req, res) => {
    try {
        // const allProduct = await ProductModel.find().populate('reviews');
        const allProducts = await ProductModel.find().populate({
            path: 'reviews',
            select:'comment -_id',
            populate: {
                path: 'user', // Populating the 'user' field inside 'reviews'
                select: 'name -_id' // Specify fields you want to fetch
            }
        });

        res.status(200).json({ message: "All Product", Product: allProducts, totel: allProducts.length });
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

        const category = await CategoryModel.findOne({ name: categoryName.toLowerCase() });
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


module.exports = {
    createProduct,
    AllProduct,
    UpdateProduct,
    DeleteProduct
}