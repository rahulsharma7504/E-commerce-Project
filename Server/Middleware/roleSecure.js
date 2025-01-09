const User = require('../Models/userModel')
const roleSecure =  (allowedRoles) => async(req, res, next) => {
    const findRole = await User.findById(req.user.userId);
    const userRole = await findRole.role; // Assuming `req.user` has role after authentication
    if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({ message: "Access Denied" });
    }
    next();
};
module.exports = { roleSecure }