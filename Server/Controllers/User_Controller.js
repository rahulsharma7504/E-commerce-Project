const userDB = require('../Models/userModel')
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const ReviewModel = require('../Models/reviewsModel');
const categoryModel = require('../Models/categoryModel');
const productModel = require('../Models/productModel');

const Register = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;
        console.log(name, email, password, phone);
        const existingUser = await userDB.findOne({ email });
        if (existingUser) return res.status(400).send({ message: 'User already exists' })

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 20);

        const user = new userDB({
            name,
            email,
            password: hashedPassword,
            phone
        });
        await user.save();
        res.status(201).send({ message: 'User Registered Successfully' })

    } catch (error) {
        if (error) throw error.message

    }
}
 
const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, password);

        // Find user with indexed query
        const user = await userDB.findOne({ email }).exec(); // .exec() for better query optimization

        if (!user) {
            return res.status(401).send({ message: 'User does not exist' });
        }
        if (user.status === 'inActive') {
            return res.status(400).json({ message: "Your Account is Not Active" });
        }

        // Compare password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        // Generate JWT
        const token = JWT.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '14d', // Optional: Set token expiration
        });

        // Store token in httpOnly cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // HTTPS in production
            maxAge: 14 * 24 * 60 * 60 * 1000, // 2 weeks
        });

        // Send success response
        return res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const UserProfile = async (req, res) => {
    try {
        const user = await userDB.findById(req.user.userId).select('-password'); // Exclude password from response
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve user data" });
    }
}

const updateProfile = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;
        console.log(req.body)
        // Check if email exists
        const existingUser = await userDB.findOne({ email: email });
        if (existingUser) return res.status(400).send({ message: 'Email already exists' });

        // Hash Password if new password provided
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 20);
            req.body.password = hashedPassword;
        }

        // Update user profile
        const user = await userDB.findByIdAndUpdate(req.user.userId, req.body, { new: true });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Failed to update user profile" });
    }

}

const Logout=async (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
}


// FOR USR REVIEWS ON PRODUCTS

const addReview = async (req, res) => {
    try {
        const { productId, userId, rating, comment } = req.body;

        const existingReview = await ReviewModel.findOne({ user: userId, product: productId });
        if (existingReview) {
            return res.status(400).json({ message: 'User already reviewed this product' });
        }

        const review = await new ReviewModel({
            user: userId,
            product: productId,
            rating,
            comment
        });
        await review.save();
        const product = await productModel.findById(productId);
        product.reviews.push(review._id);
        await product.save();


        res.status(201).json({ message: 'Review saved successfully', data: review });
    } catch (error) {
        res.status(500).json({ message: "Failed to add review" });
    }

}

const getReview = async (req, res) => {
    try {
        const { productId, userId } = req.body;
        const findReview = await ReviewModel.find({ user: userId, product: productId });
        if (!findReview) {
            return res.status(404).json({ message: 'No review found for this product' });
        }
        res.status(200).json({ message: 'Review found', data: findReview });

    } catch (error) {
        res.status(500).json({ message: "Failed to get review" });

    }
}

const updateReview = async (req, res) => {
    try {
        const { productId, userId, reviewId, rating, comment } = req.body;
        const findReview = await ReviewModel.find({ user: userId, product: productId });
        if (!findReview) {
            return res.status(404).json({ message: 'You Not given any review for this product' });
        }
        const updateReview = await ReviewModel.findByIdAndUpdate(
            { _id: reviewId },
            {
                user: userId,
                product: productId,
                rating,
                comment
            }, { new: true }
        );
        await updateReview.save();
        res.status(200).json({ message: 'Review updated successfully', data: updateReview });

    } catch (error) {
        res.status(500).json({ message: "Failed Update review" });

    }
}

const deleteReview = async (req, res) => {
    try {
        const { productId, userId, reviewId } = req.body;
        const findReview = await ReviewModel.find({ user: userId, product: productId });
        if (!findReview) {
            return res.status(404).json({ message: 'You Not given any review for this product' });
        }
        const deleteReview = await ReviewModel.findByIdAndDelete(reviewId);
        const product = await productModel.findById(productId);
        product.reviews = product.reviews.filter(review => review.toString() !== reviewId);
        await product.save();
        res.status(200).json({ message: 'Review deleted successfully', data: deleteReview });

    } catch (error) {
        res.status(500).json({ message: "Failed to delete review" });
    }
}


// FOR PRODUCTS Filttering

const getAllProducts = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.status(200).json({ message: "All products", data: products, totel: products.length });

    } catch (error) {
        res.status(500).json({ message: " failed to get all products" })

    }
}

//Get One Product
const getProduct = async (req, res) => {
    try {
        const {productId}=req.params
        const product = await productModel.find({_id:productId});
        if(product.length==0){
        res.status(400).json({ message: "Not Found product", data:' 😁😁😁😁' });
        }
        res.status(200).json({ message: "All products", data: product });

    } catch (error) {
        res.status(500).json({ message: " failed to get all products" })

    }
}

const getProductByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const category = await categoryModel.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: "Category not found" })
        }
        const products = await productModel.find({ category: categoryId });
        res.status(200).json({ message: "All products", data: products, totel: products.length });

    } catch (error) {
        res.status(500).json({ message: " failed to get all products" })

    }
}
const getProductByPrice = async (req, res) => {
    try {
        const { minPrice, maxPrice } = req.query;
        // const findProducts = await productModel.find({
        //     price: {
        //         $gte: Number(minPrice), // Minimum price
        //         $lte: Number(maxPrice), // Maximum price
        //     }
        // });
        const findProducts =await productModel.aggregate([
            {
                $match: {
                    price: {
                        $gte: Number(minPrice),
                        $lte: Number(maxPrice),
                    }
                }
            },
            { $sort: { price: 1 } }, // Sort by price in ascending order
            { $project: { name: 1, price: 1, _id: 0 } } // Return only name and price
        ]);
        
        if(!findProducts.length>0){
            res.status(200).json({message:'No Any Products with thie price range'})
        }
        res.status(200).json({message:"filter Products",data:findProducts})
        
    } catch (error) {
        res.status(500).json({ message: " failed to get all products" })

    }
}


const getProductByColor = async (req, res) => {
    try {
        const {color}=req.query;
        const findProducts=await productModel.find({color:color});
        if(!findProducts.length>0){
            res.status(200).json({message:"No Any Products with this color"});
        } 
        re.status(200).json({message:true,data:findProducts})
    } catch (error) {
        res.status(500).json({ message: " failed to get all products" })

    } 
}

const getProductBySearch = async (req, res) => {
    try {
        const { search } = req.query;

        // Aggregation query with $or condition
        const findProducts = await productModel.aggregate([
            {
                $match: {
                    $or: [
                        { name: new RegExp(search, "i") }, // Case-insensitive match for name
                        { price: new RegExp(Number(search), "i") }         // Match for price (numeric comparison)
                    ]
                }
            }
        ]);

        // Check if no products are found
        if (findProducts.length === 0) {
            return res.status(200).json({ message: "No products found with the given search term" });
        }

        // Successful response with products
        return res.status(200).json({ success: true, data: findProducts });
    } catch (error) {
        // Handle server error
        return res.status(500).json({ message: "Failed to get products", error: error.message });
    }
};




module.exports = {
    Register,
    Login,
    Logout,
    UserProfile,
    updateProfile,
    addReview,
    getReview,
    updateReview,
    deleteReview,
    // for products
    getAllProducts,
    getProductByCategory,
    getProductByPrice,
    getProductByColor,
    getProductBySearch,
    getProduct
}