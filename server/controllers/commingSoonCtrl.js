const commingSoon = require("../models/commingSoon");

exports.createCommingSoon = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }

        // Check if the email already exists
        const existingEmail = await commingSoon.findOne({ email });
        
        if (existingEmail) {
            return res.status(409).json({
                success: false,
                message: "You Already Subscribed ! Thankyou Have A Nice Day"
            });
        }

        // Create a new record if the email does not exist
        const createComming = await commingSoon.create({
            email
        });

        res.status(201).json({
            success: true,
            message: "Created successfully",
            email
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal server error",
            error
        });
    }
};
