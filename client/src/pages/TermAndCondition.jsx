import React, { useEffect } from 'react';

const TermsAndConditions = () => {
  useEffect(()=>{
    window.scrollTo(0, 0);
},[])
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-[70px]">
      <h1 className="lg:text-3xl font-bold mb-4 text-gray-900 text-2xl text-center">Terms and Conditions for ABSENCE</h1>
      <p className="text-gray-700 mb-6 leading-relaxed">
        Welcome to ABSENCE! These Terms and Conditions ("Terms") govern your use of our website, mobile application, and other services provided by Absence Apparels ("ABSENCE", "we", "us", or "our"). By accessing or using our services, you agree to comply with and be bound by these Terms. If you do not agree with these Terms, please do not use our services.
      </p>

      <h2 className="text-2xl font-semibold mb-3 text-gray-800">1. Use of Our Services</h2>
      <p className="text-gray-700 mb-6 leading-relaxed">
        You agree to use our services only for lawful purposes and in accordance with these Terms. You are responsible for ensuring that your use of our services complies with all applicable laws and regulations. You agree not to use our services in any manner that could harm, disable, overburden, or impair our services or interfere with any other party's use of our services.
      </p>

      <h2 className="text-2xl font-semibold mb-3 text-gray-800">2. Account Registration</h2>
      <p className="text-gray-700 mb-6 leading-relaxed">
        To access certain features of our services, you may need to create an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
      </p>

      <h2 className="text-2xl font-semibold mb-3 text-gray-800">3. Payment and Transactions</h2>
      <p className="text-gray-700 mb-6 leading-relaxed">
        All payments for purchases made through our services are processed securely. You agree to provide accurate payment information and authorize us to charge the payment method you provide for the total amount of your purchase. We reserve the right to refuse or cancel any order at our discretion.
      </p>

      <h2 className="text-2xl font-semibold mb-3 text-gray-800">4. Intellectual Property</h2>
      <p className="text-gray-700 mb-6 leading-relaxed">
        All content and materials provided through our services, including but not limited to text, graphics, logos, images, and software, are the property of ABSENCE or its licensors and are protected by intellectual property laws. You may not use, reproduce, distribute, or create derivative works of any content without our prior written consent.
      </p>

      <h2 className="text-2xl font-semibold mb-3 text-gray-800">5. User Content</h2>
      <p className="text-gray-700 mb-6 leading-relaxed">
        By submitting content to our services, you grant us a worldwide, royalty-free, perpetual, and irrevocable license to use, reproduce, modify, publish, and distribute such content. You are solely responsible for the content you submit and for ensuring that it does not infringe on any third-party rights or violate any laws.
      </p>

      <h2 className="text-2xl font-semibold mb-3 text-gray-800">6. Limitation of Liability</h2>
      <p className="text-gray-700 mb-6 leading-relaxed">
        To the fullest extent permitted by law, ABSENCE and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or data, arising out of or in connection with your use of our services. Our total liability for any claims arising from your use of our services shall be limited to the amount you paid for the service in question.
      </p>

      <h2 className="text-2xl font-semibold mb-3 text-gray-800">7. Indemnification</h2>
      <p className="text-gray-700 mb-6 leading-relaxed">
        You agree to indemnify, defend, and hold harmless ABSENCE, its affiliates, and their respective officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, or expenses, including reasonable attorneys' fees, arising out of or related to your use of our services or any violation of these Terms.
      </p>

      <h2 className="text-2xl font-semibold mb-3 text-gray-800">8. Changes to These Terms</h2>
      <p className="text-gray-700 mb-6 leading-relaxed">
        We may update these Terms from time to time. Any changes will be posted on this page, and your continued use of our services constitutes your acceptance of the updated Terms. We encourage you to review these Terms periodically.
      </p>

      <h2 className="text-2xl font-semibold mb-3 text-gray-800">9. Termination</h2>
      <p className="text-gray-700 mb-6 leading-relaxed">
        We reserve the right to suspend or terminate your access to our services at any time, with or without cause, and with or without notice. Upon termination, your right to use our services will immediately cease.
      </p>

     

      <h2 className="text-2xl font-semibold mb-3 text-gray-800">Contact Us</h2>
      <p className="text-gray-700 mb-6 leading-relaxed">
        If you have any questions or concerns about these Terms, please contact us at:
        <br />
        <strong>Email:</strong> support@wearabsence.com
        <br />
        <strong>Address:</strong> Bhopal , Madhya Pradesh 462010
      </p>
    </div>
  );
};

export default TermsAndConditions;
