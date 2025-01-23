const userDB = require('../Models/userModel')
const cartModel = require('../Models/cartModel')
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const ReviewModel = require('../Models/reviewsModel');
const categoryModel = require('../Models/categoryModel');
const productModel = require('../Models/productModel');
const {sendResetEmail}=require('../Config/Mail')
const randomString = require('randomstring');




// -----------------------------------------
// User Registration API
const Register = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;
        const existingUser = await userDB.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' })

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 20);

        const user = new userDB({
            name,
            email,
            password: hashedPassword,
            phone
        });
        await user.save();
        res.status(201).json({ message: 'User Registered Successfully' })

    } catch (error) {
        if (error) throw error.message
        res.status(400).json({ message: 'Something Went Wronge' })

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

const ForgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        console.log(email)
        // Check if the user exists
        const user = userDB.find({email: email});
      
        if (!user) {
          return res.status(404).json({ message: 'User not found.' });
        }
      
        // Create a reset token (in a real app, use a more secure method)
        const resetToken = randomString.generate({
            length: 20,
            charset: 'alphanumeric',
        })
         user.token = resetToken;
        await user.save();
        // Send the reset email
        sendResetEmail(email, resetToken);
      
        return res.status(200).json({ message: 'Password reset link sent to email.' });
        
    } catch (error) {
        
    }
}

const ResetPassword = async (req, res) => {
    try {
        const { tokne, newPassword } = req.body;

        // Find the user with the reset token and check if the token is valid
        const user = userDB.find({token:token});
      
        if (!user) {
          return res.status(400).json({ message: 'Invalid or expired token.' });
        }
      
        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
      
        // Update the user's password
        user.password = hashedPassword;
        user.token = null;
        await user.save();
        return res.status(200).json({ message: 'Password reset successfully.' });
        
    } catch (error) {
        console.log(error.message);
        
    }
}

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

const Logout = async (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
}


// FOR USR REVIEWS ON PRODUCTS
// ---------------------------------

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

        const productData = await productModel.find({ _id: productId })
            .populate({
                path: 'reviews',
                select: 'createdAt rating comment',
                populate: {
                    path: 'user',  // 'user' field ko populate karenge jo review model mein ref diya gaya hai
                    select: 'name email'  // Agar aap specific fields chahte hain, unhe specify kar sakte hain
                }
            });
        res.status(201).json({ message: 'Review saved successfully', data: productData });
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
// ------------------------------
const getAllProducts = async (req, res) => {
    try {
        const products = await productModel.find({}).populate({
            path: 'reviews'
        }).limit(10);
        res.status(200).json(products);

    } catch (error) {
        res.status(500).json({ message: " failed to get all products" })

    }
}

const getAllShopProducts = async (req, res) => {
    try {
        const products = await productModel.find({}).populate({
            path: 'reviews'
        }).limit(9);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: " failed to get all products" })

    }
}


const getAllCategory = async (req, res) => {
    try {
        const category = await categoryModel.aggregate([
            {
                $lookup: {
                    from: 'products',  // 'products' collection se join
                    localField: 'products',  // category ka products field join karega
                    foreignField: '_id',
                    as: 'productDetails'  // Resulting products ko 'productDetails' array mein store karega
                }
            },
            {
                $project: {
                    name: 1,  // Category ka name
                    totalProducts: { $size: '$productDetails' },  // Product count for each category
                    image: { $arrayElemAt: ['$productDetails.images', 0] }  // First image of the product
                }
            }
        ]);

        res.status(200).json(category);

    } catch (error) {
        res.status(500).json({ message: "Failed to get all categories" });
    }
}

// Product pagination
const productPagination = async (req, res) => {

    const page = parseInt(req.query.page) || 1;  // Default to page 1 if no page is passed
    const pageSize = 9;  // Number of items per page
    const skip = (page - 1) * pageSize;  // Calculate the number of items to skip

    try {
        // Get products with pagination
        const products = await productModel.find()
            .skip(skip)
            .limit(pageSize);

        // Get total number of products
        const totalProducts = await productModel.countDocuments();

        // Calculate total pages
        const totalPages = Math.ceil(totalProducts / pageSize);

        res.json({
            products,
            totalPages,
            currentPage: page,
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Error fetching products' });
    }
}




const productFilters = async (req, res) => {
    const { price } = req.query;
    try {
        if (!price || price === '' || price === null) {
            const findAllProducts = await productModel.find({});

            return res.status(200).json(findAllProducts);
        }

        const filterValues = price.split(',').sort();  // Splitting and sorting the price ranges
        let allProducts = [];  // To store all the products from different ranges

        for (let range of filterValues) {
            const [start, end] = range.split(' - ').map(Number);

            // Fetch data from MongoDB in the given price range
            const data = await productModel.find({ price: { $gte: start, $lte: end } }).lean();

            // Combining the data into the allProducts array
            allProducts = [...allProducts, ...data];
        }

        // Returning combined data after iterating through all the ranges
        res.status(200).json(allProducts);

    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Error fetching products' });
    }
};


const colorFilters = async (req, res) => {
    const { color } = req.query;
    try {
        if (!color || color === '' || color === null) {
            const findAllProducts = await productModel.find({});

            return res.status(200).json(findAllProducts);
        }

        const colorValues = color.split(',').map(c => c.trim());  // Splitting and trimming color values
        let allProducts = [];  // To store all the products for given colors

        // Loop through each color and fetch products
        for (let c of colorValues) {
            // Fetch products with the given color
            const data = await productModel.find({ color: c }).lean();

            // Combining the data into the allProducts array
            allProducts = [...allProducts, ...data];
        }

        // Returning combined data after iterating through all the colors
        res.status(200).json(allProducts);

    } catch (error) {
        console.error('Error fetching products by color:', error);
        res.status(500).json({ message: 'Error fetching products by color' });
    }
};



const productSorting = async (req, res) => {
    const { sortBy } = req.query;
    console.log(sortBy);
    try {
        var findAllProducts = await productModel.find().lean();
        // Logic for sorting
        if (sortBy === 'latest') {
            // Sort by creation date (newest first)
            findAllProducts = findAllProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        } else if (sortBy === 'popularity') {
            // Sort by stock quantity (most in stock)
            findAllProducts = findAllProducts.sort((a, b) => b.stockQuantity - a.stockQuantity);
        } else if (sortBy === 'bestRating') {
            // Sort by number of reviews (mocked as length of reviews array)
            findAllProducts = findAllProducts.sort((a, b) => (b.reviews.length > a.reviews.length ? 1 : -1));
        }
        // console.log(findAllProducts )
        res.status(200).json(findAllProducts); // Return sorted products
    } catch (error) {
        console.error('Error fetching products by color:', error);
        res.status(500).json({ message: 'Error fetching products by color' });
    }
};


const productSearch = async (req, res) => {
    const { search } = req.query;

    try {
        // Agar search query nahi hai toh sabhi products fetch karo
        if (!search || search === '' || search === null) {
            const findAllProducts = await productModel.find({});
            return res.status(200).json(findAllProducts);
        }

        // Case-insensitive search using regular expression
        const searchResults = await productModel.find({
            $or: [
                { name: { $regex: search, $options: 'i' } },  // Name match karwana (case-insensitive)
                { description: { $regex: search, $options: 'i' } },  // Description match karwana (case-insensitive)
                { color: { $regex: search, $options: 'i' } }  // Color match karwana (case-insensitive)
            ]
        }).lean();

        // Return search results
        res.status(200).json(searchResults);

    } catch (error) {
        console.error('Error fetching products by search:', error);
        res.status(500).json({ message: 'Error fetching products by search' });
    }
};


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


// -------------------------------------

//Get One Product
const getProduct = async (req, res) => {
    try {
        const { productId } = req.params;

        // Find the product by productId
        const product = await productModel.findById(productId)
            .populate({
                path: 'reviews',
                select: 'createdAt rating comment',
                populate: {
                    path: 'user',  // Populate the user field in the review model
                    select: 'name email'  // Only select specific fields from user
                }
            });

        // Check if the product exists
        if (!product) {
            return res.status(404).json({ message: "Product not found", data: null });
        }

        // Find related products based on category (assuming category is available in product)
        const relatedProducts = await productModel.find({ category: product.category });

        // Send the response with the product and related products
        res.status(200).json({
            message: "Product found",
            data: product,
            relatedProducts: relatedProducts
        });

    } catch (error) {
        // Log the error for debugging
        console.error("Error fetching product:", error);

        // Send a generic error response
        res.status(500).json({ message: "Failed to get product" });
    }
};



const getProductByPrice = async (req, res) => {
    try {
        const { minPrice, maxPrice } = req.query;
        // const findProducts = await productModel.find({
        //     price: {
        //         $gte: Number(minPrice), // Minimum price
        //         $lte: Number(maxPrice), // Maximum price
        //     }
        // });
        const findProducts = await productModel.aggregate([
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

        if (!findProducts.length > 0) {
            res.status(200).json({ message: 'No Any Products with thie price range' })
        }
        res.status(200).json({ message: "filter Products", data: findProducts })

    } catch (error) {
        res.status(500).json({ message: " failed to get all products" })

    }
}


const getProductByColor = async (req, res) => {
    try {
        const { color } = req.query;
        const findProducts = await productModel.find({ color: color });
        if (!findProducts.length > 0) {
            res.status(200).json({ message: "No Any Products with this color" });
        }
        re.status(200).json({ message: true, data: findProducts })
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


// Cart Management APIS

const addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        const findProductQuentity = await productModel.findById(productId);
        if (!findProductQuentity) {
            return res.status(404).json({ message: "Product not found" })
        }
        if (findProductQuentity.stockQuantity < quantity) {
            return res.status(400).json({ message: "Not enough stock for this product" })
        }

        // Validate input
        if (!userId || !productId || !quantity) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Find or create user's cart
        let userCart = await cartModel.findOne({ user: userId });
        if (!userCart) {
            userCart = new cartModel({ user: userId, items: [], totalPrice: 0 });
        }

        // Find existing product in cart
        const existingProductIndex = userCart.items.findIndex(
            (item) => item.product.toString() === productId
        );

        // Update or add product to cart
        if (existingProductIndex !== -1) {
            userCart.items[existingProductIndex].quantity = quantity;
        } else {
            userCart.items.push({ product: productId, quantity });
        }

        // Calculate total price
        userCart.totalPrice = await calculateTotalPrice(userCart.items);

        // Save updated cart
        await userCart.save();

        res.status(200).json({ message: 'Item added to cart successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding item to cart', error: error.message });
    }
};

const calculateTotalPrice = async (cartItems) => {
    let totalPrice = 0;
    for (const item of cartItems) {
        const product = await productModel.findById(item.product);
        if (product) {
            totalPrice += product.price * item.quantity;
        } else {
            console.warn(`Product with ID ${item.product} not found`);
        }
    }
    return totalPrice;
};

const getUserCartItems = async (req, res) => {
    const { userId } = req.params;

    try {
        // Find cart items that include the given productId
        const cart = await cartModel.findOne({ user: userId })
            .populate({
                path: 'items.product', // Populate the 'product' field within 'items'
                select: 'name price description stockQuantity' // Specify which fields to select from the Product model
            });


        if (!cart) {
            return res.status(404).json({ message: "Cart not found for the user." });
        }

        // Filter the items in the cart that match the productId

        res.status(200).json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching cart items', error: error.message });
    }
}



const deleteCartItems=async(req,res)=>{
    try {
        const { userId, productId } = req.params; 
            console.log(userId,productId);
        // Step 1: Find the cart for the user
        let userCart = await cartModel.findOne({ user: userId });
        if (!userCart) {
            return res.status(404).json({ message: 'Cart not found for this user' });
        }

        // Step 2: Find the item index in the cart to delete
        const itemIndex = userCart.items.findIndex(item => item.product.toString() === productId);
        if (itemIndex === -1) {
            return res.status(404).json({ message: 'Item not found in the cart' });
        }

        // Step 3: Delete the item from the cart
        userCart.items.splice(itemIndex, 1);

        // Step 4: Update the total price after removing the item
        userCart.totalPrice = await calculateTotalPrice(userCart.items);

        // Save updated cart
        await userCart.save();

        // Step 5: Update the product's stock quantity
        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Find the quantity of the product in the cart
        

        return res.status(200).json({ message: 'Item removed from cart ' });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error deleting item from cart', error: error.message });
    }
}



module.exports = {
    Register,
    ResetPassword,
    Login,
    ForgotPassword,
    Logout,
    UserProfile,
    updateProfile,
    addReview,
    getReview,
    updateReview,
    deleteReview,
    // for products
    getAllShopProducts,
    getAllProducts,
    getAllCategory,
    getProductByCategory,
    getProductByPrice,
    getProductByColor,
    getProductBySearch,
    getProduct,
    productPagination,
    productFilters,
    colorFilters,
    productSorting,
    productSearch,
    addToCart,
    getUserCartItems,
    deleteCartItems
}