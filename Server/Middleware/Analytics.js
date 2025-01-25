const orderModel = require('../Models/orderModel')
const productModel = require('../Models/productModel');
const vendorDB = require('../Models/vendorModel');

// Helper function to get the total revenue from all orders
const getTotalRevenue = async (vendorId) => {
    const orders = await orderModel.find({ 'items.vendor': vendorId }).populate('items.productId');
    return orders.reduce((total, order) => total + order.totalAmount, 0);
};


// Helper function to get the total sales (quantity of products sold)
const getTotalSales = async (vendorId) => {
    const orders = await orderModel.find({ 'items.vendor': vendorId }).populate('items.productId');
    let totalSales = 0;
    orders.forEach(order => {
        order.items.forEach(item => {
            totalSales += item.quantity;
        });
    });
    return totalSales;
};



// Helper function to get recent 3 orders with product details
const getRecentOrders = async (vendorId) => {
    const orders = await orderModel.find({ 'items.vendor': vendorId })
        .populate('items.productId')
        .sort({ createdAt: -1 })
        .limit(3);
    
    return orders.map(order => {
        return {
            orderId: order._id,
            createdAt: order.createdAt,
            items: order.items.map(item => ({
                productName: item.productId.name,
                price: item.price,
                quantity: item.quantity,
            })),
            totalAmount: order.totalAmount,
            paymentStatus: order.paymentStatus,
        };
    });
};



// Helper function to calculate total orders count
const getTotalOrders = async (vendorId) => {
    const orders = await orderModel.find({ 'items.vendor': vendorId });
    return orders.length;
};

module.exports={
    getTotalRevenue,
    getTotalSales,
    getRecentOrders,
    getTotalOrders,
 
}