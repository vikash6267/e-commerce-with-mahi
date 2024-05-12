const User = require("../models/User");

// Add Address
exports.addAddress = async (req, res) => {
    try {
        const userId = req.user._id; // Get the user ID from the request
        const { address, email, phone, city, state, country, zipCode, isDefault } = req.body;

        if (!address || !email || !phone || !city || !state || !country || !zipCode) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // Find the user by ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Add the new address to the user's addresses array
        user.addresses.push({
            address,
            email,
            phone,
            city,
            state,
            country,
            zipCode,
            isDefault
        });

        await user.save();

        res.status(201).json({ success: true, message: "Address added successfully", address: user.addresses[user.addresses.length - 1] });
    } catch (error) {
        console.error("Error adding address:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Update Address
exports.updateAddress = async (req, res) => {
    try {
        const userId = req.user._id; // Get the user ID from the request
        const addressId = req.params.id;

        // Find the user by ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Find the address by ID
        const address = user.addresses.id(addressId);

        if (!address) {
            return res.status(404).json({ success: false, message: "Address not found" });
        }

        // Update address fields
        address.set(req.body);
        await user.save();

        res.status(200).json({ success: true, message: "Address updated successfully", address });
    } catch (error) {
        console.error("Error updating address:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Delete Address
exports.deleteAddress = async (req, res) => {
    try {
        const userId = req.user._id; // Get the user ID from the request
        const addressId = req.params.id;

        // Find the user by ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Remove the address from the user's addresses array
        user.addresses.pull(addressId);
        await user.save();

        res.status(200).json({ success: true, message: "Address deleted successfully" });
    } catch (error) {
        console.error("Error deleting address:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Get Addresses of Logged-in User
exports.getUserAddresses = async (req, res) => {
    try {
        const userId = req.user._id; // Get the user ID from the request

        // Find the user by ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, addresses: user.addresses });
    } catch (error) {
        console.error("Error retrieving user addresses:", error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};
