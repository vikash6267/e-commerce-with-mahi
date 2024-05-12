const Address = require("../models/Addresses");

// Add Address
exports.addAddress = async (req, res) => {
    try {
        const { address, email, phone, city, state, country, zipCode, isDefault } = req.body;

        if (!address || !email || !phone || !city || !state || !country || !zipCode) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const newAddress = new Address({
            user: req.user.id,
            address,
            email,
            phone,
            city,
            state,
            country,
            zipCode,
            isDefault
        });

        await newAddress.save();

        res.status(201).json({ success: true, message: "Address added successfully", address: newAddress });
    } catch (error) {
        console.error("Error adding address:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Update Address
exports.updateAddress = async (req, res) => {
    try {
        const { id } = req.params;

        let address = await Address.findById(id);

        if (!address) {
            return res.status(404).json({ success: false, message: "Address not found" });
        }

        address.address = req.body.address || address.address;
        address.email = req.body.email || address.email;
        address.phone = req.body.phone || address.phone;
        address.city = req.body.city || address.city;
        address.state = req.body.state || address.state;
        address.country = req.body.country || address.country;
        address.zipCode = req.body.zipCode || address.zipCode;
        address.isDefault = req.body.isDefault || address.isDefault;

        await address.save();

        res.status(200).json({ success: true, message: "Address updated successfully", address });
    } catch (error) {
        console.error("Error updating address:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Delete Address
exports.deleteAddress = async (req, res) => {
    try {
        const { id } = req.params;

        await Address.findByIdAndDelete(id);

        res.status(200).json({ success: true, message: "Address deleted successfully" });
    } catch (error) {
        console.error("Error deleting address:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Get Addresses of Logged-in User
exports.getUserAddresses = async (req, res) => {
    try {
        const { id: userId } = req.user;

        const addresses = await Address.find({ user: userId });

        res.status(200).json({ success: true, addresses });
    } catch (error) {
        console.error("Error retrieving user addresses:", error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};
