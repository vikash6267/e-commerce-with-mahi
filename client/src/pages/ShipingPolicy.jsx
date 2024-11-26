import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { HelmetProvider } from 'react-helmet-async';

const ShippingDelivery = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
}, []);
  return (
    <HelmetProvider>

<div className="bg-gray-100 p-8 mt-[50px]">
      <Helmet>
        <title>Shipping and Delivery Policy | ABSENCE</title>
        <meta name="description" content="Learn about ABSENCE's shipping and delivery policy within India. We ensure timely and safe delivery of your orders across the country." />
      </Helmet>
      <div className="max-w-3xl mx-auto bg-white p-6 shadow-md rounded-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Shipping and Delivery Policy</h1>
        <p className="text-gray-700 mb-4">
          At <strong>ABSENCE</strong>, we are committed to delivering your orders accurately, in good condition, and always on time. Below is our shipping and delivery policy for orders within India:
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Shipping Locations</h2>
        <p className="text-gray-700 mb-4">
          We ship products across India. Currently, we do not offer international shipping. All orders are shipped and delivered through registered courier companies within India.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Shipping Costs</h2>
        <p className="text-gray-700 mb-4">
          Shipping costs are calculated based on the weight of the product and the destination within India. The final shipping cost will be displayed at checkout before you complete your order.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Order Processing Time</h2>
        <p className="text-gray-700 mb-4">
          Orders are processed within 1-7 business days. Orders placed on weekends or holidays will be processed on the next business day.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Delivery Time</h2>
        <p className="text-gray-700 mb-4">
          The delivery time depends on your location within India. Typically, delivery takes 3-7 business days. Please note that these are estimated delivery times and may vary.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Tracking Your Order</h2>
        <p className="text-gray-700 mb-4">
          Once your order has been shipped, you will receive an email with the tracking details. You can use this tracking number to check the status of your delivery.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Delivery Partners</h2>
        <p className="text-gray-700 mb-4">
          We partner with reliable courier services to ensure your order reaches you in the best condition and in the fastest time possible. Our delivery partners operate throughout India.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Contact Us</h2>
        <p className="text-gray-700 mb-4">
          If you have any questions regarding our shipping and delivery policy, feel free to reach out to us at <a href="mailto:support@wearabsence.com" className="text-blue-500 underline">support@wearabsence.com</a>.
        </p>
      </div>
    </div>
    </HelmetProvider>

  );
};

export default ShippingDelivery;
