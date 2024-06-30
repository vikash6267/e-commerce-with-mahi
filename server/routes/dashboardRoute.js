// Import necessary modules and models
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const User = require('../models/User');
const PDFDocument = require('pdfkit');
const fs = require('fs');

// Define the getDashboardData function to fetch data
async function getDashboardData() {
  let filter = {};

  // Fetch total orders count
  const totalOrders = await Order.countDocuments(filter);

  // Fetch total income (sum of all order prices)
  const totalIncomeResult = await Order.aggregate([
    { $match: filter },
    { $group: { _id: null, totalIncome: { $sum: { $toDouble: "$totalPrice" } } } }
  ]);
  const totalIncome = totalIncomeResult.length > 0 ? totalIncomeResult[0].totalIncome : 0;

  // Fetch monthly order data
  const monthlyOrders = await Order.aggregate([
    {
      $match: filter,
    },
    {
      $group: {
        _id: { month: { $month: "$createdAt" }, year: { $year: "$createdAt" } },
        totalOrders: { $sum: 1 },
        totalIncome: { $sum: { $toDouble: "$totalPrice" } }
      }
    }
  ]);

  // Fetch yearly order data
  const yearlyOrders = await Order.aggregate([
    {
      $group: {
        _id: { year: { $year: "$createdAt" } },
        totalOrders: { $sum: 1 },
        totalIncome: { $sum: { $toDouble: "$totalPrice" } }
      }
    }
  ]);

  // Fetch total users count
  const totalUsers = await User.countDocuments();

  return {
    totalOrders,
    totalIncome,
    monthlyOrders,
    yearlyOrders,
    totalUsers
  };
}

// Endpoint to fetch dashboard data
router.get('/dashboardData', async (req, res) => {
  try {
    const dashboardData = await getDashboardData();
    res.status(200).json({
      success: true,
      ...dashboardData
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Endpoint to generate and download PDF report
router.get('/downloadPDF', async (req, res) => {
  try {
    const dashboardData = await getDashboardData();

    // Create PDF document
    const doc = new PDFDocument();
    const fileName = 'dashboard-report.pdf';
    const filePath = `./public/${fileName}`;

    // Pipe PDF output to a writable stream (file)
    doc.pipe(fs.createWriteStream(filePath));

    // Write content to PDF
    doc.fontSize(16).text('Dashboard Report', { align: 'center' }).moveDown();
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`).moveDown();
    doc.text(`Total Orders: ${dashboardData.totalOrders}`);
    doc.text(`Total Income: ₹ ${dashboardData.totalIncome}`);
    doc.moveDown();

    // Write monthly orders
    if (dashboardData.monthlyOrders.length > 0) {
      doc.fontSize(14).text('Monthly Orders:').moveDown();
      dashboardData.monthlyOrders.forEach(monthData => {
        doc.text(`${monthData.totalOrders} orders in ${monthData._id.month}/${monthData._id.year}`);
      });
      doc.moveDown();
    }

    // Write yearly orders
    if (dashboardData.yearlyOrders.length > 0) {
      doc.fontSize(14).text('Yearly Orders:').moveDown();
      dashboardData.yearlyOrders.forEach(yearData => {
        doc.text(`${yearData.totalOrders} orders in ${yearData._id.year}`);
      });
      doc.moveDown();
    }

    // Write total users
    doc.text(`Total Users: ${dashboardData.totalUsers}`).moveDown();

    // Finalize PDF
    doc.end();

    // Respond with download link
    res.download(filePath, fileName);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
