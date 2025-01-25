const ProductModel = require('../Models/productModel');
const CategoryModel = require('../Models/categoryModel');
const ReviewModel = require('../Models/reviewsModel');
const { cloudinary } = require('../Config/Cloudinary')
const vendorDB = require('../Models/vendorModel');
const productModel = require('../Models/productModel');
const userDB = require('../Models/userModel');
const mongoose = require('mongoose');
const orderModel = require('../Models/orderModel')



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
        const vendor = await vendorDB.findOne({ user: vendorId });
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

        // Find vendor by ID    
        const findVendor = await vendorDB.findOne({ user: vendorId })

        if (!findVendor) {
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



        const vendor = await vendorDB.findOne({ user: vendorId });
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

const getVendorAnalytics = async (req, res) => {
    const userId = req.query; // Access vendorId from query parameters

    try {
        // Find vendor using userId
        const vendorData = await vendorDB.find({ user: userId.vendorId.trim() });
        if (!vendorData || vendorData.length === 0) {
            return res.status(404).json({ error: "Vendor not found" });
        }
        const vendorId = vendorData[0]._id;

        // Fetch vendor details and associated products
        const vendor = await vendorDB.findById(vendorId).populate("products", "_id name price");
        if (!vendor) {
            return res.status(404).json({ error: "Vendor not found" });
        }

        const vendorProductIds = vendor.products.map((product) => product._id);

        // Total Sales: Count total orders containing vendor's products
        const totalSales = await orderModel.aggregate([
            { $unwind: "$items" },
            { $match: { "items.productId": { $in: vendorProductIds } } },
            { $group: { _id: null, totalOrders: { $sum: 1 } } },
        ]);

        // Total Revenue: Sum of revenue from vendor's products
        const totalRevenue = await orderModel.aggregate([
            { $unwind: "$items" },
            { $match: { "items.productId": { $in: vendorProductIds } } },
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: { $multiply: ["$items.price", "$items.quantity"] } },
                },
            },
        ]);

        // Total Products Sold
        const totalProductsSold = await orderModel.aggregate([
            { $unwind: "$items" },
            { $match: { "items.productId": { $in: vendorProductIds } } },
            { $group: { _id: null, totalSold: { $sum: "$items.quantity" } } },
        ]);

        // Fetch detailed order information
        const detailedOrders = await orderModel.find({
            "items.productId": { $in: vendorProductIds },
        })
            .populate("userId", "name email") // Populate user details
            .select("items totalAmount paymentStatus createdAt") // Select specific fields
            .sort({ createdAt: -1 }) // Sort by recent orders
            .limit(2); // Limit to 5 recent orders

        // Transform detailedOrders data
        const orderDetails = detailedOrders.map((order) => ({
            orderId: order._id,
            totalAmount: order.totalAmount,
            paymentStatus: order.paymentStatus,
            createdAt: order.createdAt,
            items: order.items.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
                price: item.price,
            })),
        }));

        res.json({
            vendor: {
                id: vendor._id,
                storeName: vendor.storeName,
            },
            analytics: {
                totalSales: totalSales[0]?.totalOrders || 0,
                totalRevenue: totalRevenue[0]?.totalRevenue || 0,
                totalProductsSold: totalProductsSold[0]?.totalSold || 0,
            },
            recentOrders: orderDetails, // Send detailed recent orders
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getVendorAllOrders = async (req, res) => {
    const userId = req.query; // Access vendorId from query parameters
    try {
        // Find vendor using userId
        const vendorData = await vendorDB.find({ user: userId.vendorId.trim() });
        if (!vendorData || vendorData.length === 0) {
            return res.status(404).json({ error: "Vendor not found" });
        }
        const vendorId = vendorData[0]._id;
        // Fetch vendor details
        const vendor = await vendorDB.findById(vendorId).populate("user", "name email");

        if (!vendor) {
            return res.status(404).json({ success: false, message: "Vendor not found" });
        }
        const totalOrders = await orderModel.countDocuments();

        // Fetch orders linked to this vendor's products
        const orders = await orderModel.find({ "items.productId": { $in: vendor.products } })
            .populate("userId", "name email")
            .select("items userId paymentStatus createdAt");

        // Calculate total pending and completed orders
        const totalPendingOrders = orders.filter(order => order.paymentStatus === "pending").length;
        const totalCompletedOrders = orders.filter(order => order.paymentStatus === "completed").length;

        // Format order details
        const formattedOrders = orders.map(order => ({
            orderId: order._id,
            userName: order.userId.name,
            status: order.paymentStatus,
            date: order.createdAt,
            items: order.items.map(item => ({
                productId: item.productId,
                quantity: item.quantity,
                price: item.price,
            })),
        }));

        // Response with vendor and order data
        res.status(200).json({
            success: true,
            data: {
                vendor: {
                    vendorId: vendor._id,
                    storeName: vendor.storeName,
                    user: vendor.user,
                },
                totalOrders,
                totalPendingOrders,
                totalCompletedOrders,
                orders: formattedOrders,
            },
        });
    } catch (error) {
        console.error("Error fetching vendor data:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

const getVendorAllSales = async (req, res) => {

    try {
        const userId = req.query; // Access vendorId from query parameters

        // Find vendor using userId
        const vendorData = await vendorDB.find({ user: userId.vendorId.trim() });
        if (!vendorData || vendorData.length === 0) {
            return res.status(404).json({ error: "Vendor not found" });
        }
        const vendorId = vendorData[0]._id;

        const totalRevenueData = await orderModel.aggregate([
            { $unwind: "$items" },  // Unwind items array
            {
                $lookup: {  // Lookup to join Product model
                    from: 'products',  // Product collection name
                    localField: 'items.productId',  // Join condition on productId
                    foreignField: '_id',  // Match productId with _id of Product
                    as: 'productDetails'  // Store the joined data in productDetails
                }
            },
            { $unwind: "$productDetails" },  // Unwind the productDetails array (because lookup returns array)
            {
                $match: {
                    "productDetails.vendor": new mongoose.Types.ObjectId(vendorId),  // Match the vendor ID from Product
                    paymentStatus: 'completed'  // Only completed orders
                }
            },
            {
                $group: {  // Group data to calculate the total revenue
                    _id: null,
                    totalRevenue: { $sum: { $multiply: ["$items.price", "$items.quantity"] } }  // Total revenue from the order items
                }
            }
        ]);

        const totalRevenue = totalRevenueData.length > 0 ? totalRevenueData[0].totalRevenue : 0;
        
        // total product sale
        const totalSalesProducts = await orderModel.aggregate([
            { $unwind: "$items" },
            { $lookup: {
                from: 'products',
                localField: 'items.productId',
                foreignField: '_id',
                as: 'productDetails'
            }},
            { $unwind: "$productDetails" },
            { $match: { 
                "productDetails.vendor": new mongoose.Types.ObjectId(vendorId),
                paymentStatus: 'completed'
            }},
            { $group: { 
                _id: null, 
                totalProductsSold: { $sum: "$items.quantity" }  // Sum of sold products
            }}
        ]);
        
        const totalProductsSold = totalSalesProducts.length > 0 ? totalSalesProducts[0].totalProductsSold : 0;
        

        const currentMonthRevenue = await orderModel.aggregate([
            { $unwind: "$items" },
            { $lookup: {
                from: 'products',
                localField: 'items.productId',
                foreignField: '_id',
                as: 'productDetails'
            }},
            { $unwind: "$productDetails" },
            { $match: { 
                "productDetails.vendor": new mongoose.Types.ObjectId(vendorId),
                paymentStatus: 'completed',
                createdAt: { $gte: new Date(new Date().setMonth(new Date().getMonth() - 1)) }  // Last month
            }},
            { $group: {
                _id: null,
                totalRevenue: { $sum: { $multiply: ["$items.price", "$items.quantity"] } }
            }}
        ]);
        
        const previousMonthRevenue = await orderModel.aggregate([
            { $unwind: "$items" },
            { $lookup: {
                from: 'products',
                localField: 'items.productId',
                foreignField: '_id',
                as: 'productDetails'
            }},
            { $unwind: "$productDetails" },
            { $match: { 
                "productDetails.vendor": new mongoose.Types.ObjectId(vendorId),
                paymentStatus: 'completed',
                createdAt: { $lt: new Date(new Date().setMonth(new Date().getMonth() - 1)) }  // Before last month
            }},
            { $group: {
                _id: null,
                totalRevenue: { $sum: { $multiply: ["$items.price", "$items.quantity"] } }
            }}
        ]);
        
        const growth = currentMonthRevenue.length > 0 && previousMonthRevenue.length > 0 
            ? (currentMonthRevenue[0].totalRevenue - previousMonthRevenue[0].totalRevenue) / previousMonthRevenue[0].totalRevenue * 100
            : 0;
        
            // Product Sales details
            const productDetails = await orderModel.aggregate([
                { $unwind: "$items" },
                { $lookup: {
                    from: 'products',
                    localField: 'items.productId',
                    foreignField: '_id',
                    as: 'productDetails'
                }},
                { $unwind: "$productDetails" },
                { $match: { 
                    "productDetails.vendor": new mongoose.Types.ObjectId(vendorId),
                    paymentStatus: 'completed'
                }},
                { $group: { 
                    _id: "$productDetails._id",
                    productName: { $first: "$productDetails.name" },
                    revenue: { $sum: { $multiply: ["$items.price", "$items.quantity"] } },
                    quantitySold: { $sum: "$items.quantity" },
                    date: { $first: "$createdAt" }
                }},
                { $project: { _id: 0, productName: 1, revenue: 1, quantitySold: 1, date: 1 } }
            ]);
            
            const productDetailsFormatted = productDetails.map(item => ({
                productName: item.productName,
                revenue: item.revenue,
                quantitySold: item.quantitySold,
                date: item.date
            }));
            

        res.status(200).json({ totalRevenue, totalProductsSold, growth ,productDetailsFormatted});  // Send the total revenue to the client


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}


module.exports = {
    createProduct,
    AllProduct,
    UpdateProduct,
    DeleteProduct,
    getVendorAnalytics,
    getVendorAllOrders,
    getVendorAllSales
}