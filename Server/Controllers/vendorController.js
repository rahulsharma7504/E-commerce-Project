const ProductModel = require('../Models/productModel');
const CategoryModel = require('../Models/categoryModel');
const { cloudinary } = require('../Config/Cloudinary')

const createProduct = async (req, res) => {
    const { name, description, price, stockQuantity, categoryName, vendorId } = req.body;

    try {
        const productImages = req.files.map(file => file.path);

        // Check if the product already exists
        const findexistProduct = await ProductModel.findOne({ name });
        if (findexistProduct) {
            return res.status(400).json({ error: "Product already exists" });
        }

        // Find the category by name
        const category = await CategoryModel.findOne({ name: categoryName });
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
            description,
            category: category._id,
            vendor: vendorId,
        });

        // Save the product to the database
        await product.save();

        res.status(201).json({ message: "Product created successfully", product });
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};




const AllProduct=async(req,res)=>{
    try {
        const allProduct = await ProductModel.find()
        res.status(200).json({ message: "All Product", Product: allProduct,totel:allProduct.length });
    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).json({ error: "Internal Server Error" });
}
}

const UpdateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, description, category, quantity, shipping } = req.body;
        let image;

        // Check if req.file exists and set the image path accordingly
        if (req.file) {
            image = req.file.path;
            const uploadedImage = await cloudinary.uploader.upload(image);
            image = uploadedImage.secure_url;
        } else {
            // If no new image is uploaded, use the existing image URL
            image = req.body.image;
        }
        
        const slug = slugify(String(name)); 

        const updateProduct = await ProductModel.findOneAndUpdate(
            { _id: id }, // Filter criteria
            { $set: { name: slug, price: price, description: description, category: category, quantity: quantity, image: image, shipping: shipping } }, // Update document
            { new: true } // To return the updated document
        );

        // Product found, send it in the response
        res.status(200).json({ message: "Update Product Success", product: updateProduct });
    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = {
    createProduct,
    AllProduct,
    UpdateProduct
}