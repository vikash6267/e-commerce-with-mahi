import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { HelmetProvider } from 'react-helmet-async';

const CancellationRefund = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
}, []);
  return (
    <HelmetProvider>
    <div className="bg-gray-100 p-8 mt-[50px]">
      <Helmet>
        <title>Cancellation and Refund Policy | ABSENCE</title>
        <meta name="description" content="Learn about the cancellation and refund policy of ABSENCE, your trusted online clothing store." />
      </Helmet>
      <div className="max-w-3xl mx-auto bg-white p-6 shadow-md rounded-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Cancellation and Refund Policy</h1>
        <p className="text-gray-700 mb-4">
          At <strong>ABSENCE</strong>, we strive to ensure a seamless shopping experience for our customers. However, we understand that there might be instances where you may need to cancel an order or request a refund. Please read our cancellation and refund policy below:
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Order Cancellation</h2>
        <p className="text-gray-700 mb-4">
          <strong>Before Shipment:</strong> If you wish to cancel your order, please contact us at <a href="mailto:support@wearabsence.com" className="text-blue-500 underline">support@wearabsence.com</a> as soon as possible. If your order has not yet been shipped, we will cancel it and process a full refund.
        </p>
        <p className="text-gray-700 mb-4">
          <strong>After Shipment:</strong> Once your order has been shipped, it cannot be canceled. In such cases, please refer to our return and refund process below.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Return and Refund</h2>
        <p className="text-gray-700 mb-4">
          <strong>Eligibility for Return:</strong> To be eligible for a return, the product must be unused, in its original packaging, and in the same condition as when you received it. Returns must be initiated within 7 days of delivery.
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Return Process:</strong> To initiate a return, please contact us at <a href="mailto:support@wearabsence.com" className="text-blue-500 underline">support@wearabsence.com</a> with your order details. Once your return is approved, we will provide instructions for shipping the item back to us. Please note that return shipping costs are the responsibility of the customer.
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Refund Process:</strong> Once we receive and inspect the returned item, we will notify you of the approval or rejection of your refund. If approved, your refund will be processed within 7-10 business days and will be credited to your original method of payment.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Non-Refundable Items</h2>
        <p className="text-gray-700 mb-4">
          Certain items are non-refundable, including:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>Sale items</li>
          <li>Gift cards</li>
          <li>Customized or personalized products</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Damaged or Defective Products</h2>
        <p className="text-gray-700 mb-4">
          If you receive a damaged or defective product, please contact us immediately at <a href="mailto:support@wearabsence.com" className="text-blue-500 underline">support@wearabsence.com</a>. We will arrange for a replacement or issue a full refund, including any shipping costs.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Contact Us</h2>
        <p className="text-gray-700 mb-4">
          If you have any questions about our cancellation and refund policy, please feel free to contact us at <a href="mailto:support@wearabsence.com" className="text-blue-500 underline">support@wearabsence.com</a>.
        </p>
      </div>
    </div>
    </HelmetProvider>
  );
};

export default CancellationRefund;
