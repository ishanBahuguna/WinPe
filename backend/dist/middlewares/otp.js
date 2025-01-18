"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOtp = void 0;
const generateOtp = async (req, res, next) => {
    try {
        let user = await User.findOne({ phoneNumber });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "User already exsist",
            });
        }
    }
    finally {
    }
};
exports.generateOtp = generateOtp;
