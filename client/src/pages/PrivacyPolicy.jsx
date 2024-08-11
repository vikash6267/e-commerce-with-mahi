import React, { useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const PrivacyPolicy = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <HelmetProvider>
            <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-[70px]">
                <Helmet>
                    <title>Privacy Policy | Wear Absence</title>
                    <meta name="description" content="Learn about how Wear Absence collects, uses, and protects your personal information with our comprehensive Privacy Policy." />
                    <meta name="robots" content="index, follow" />
                    <link rel="canonical" href="https://wearabsence.com/privacy-policy" />
                </Helmet>

                <h1 className="text-3xl font-bold mb-4 text-gray-900">Privacy Policy for Wear Absence</h1>
                <p className="text-gray-700 mb-6 leading-relaxed">
                    At Wear Absence, we are dedicated to safeguarding your personal information. This Privacy Policy outlines how we collect, use, disclose, and protect your information when you interact with our website, mobile application, and other services.
                </p>

                <h2 className="text-2xl font-semibold mb-3 text-gray-800">1. Information We Collect</h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                    We gather several types of information to provide and enhance our services, including:
                    <ul className="list-disc list-inside pl-6">
                        <li><strong>Personal Data:</strong> Information such as your name, email address, contact number, and postal address.</li>
                        <li><strong>Account Details:</strong> Data related to your account activities, preferences, and transactions.</li>
                        <li><strong>Usage Data:</strong> Information about how you interact with our services, including your IP address, browser type, and device information.</li>
                        <li><strong>Cookies:</strong> Small files stored on your device to track your preferences and enhance your user experience.</li>
                    </ul>
                </p>

                <h2 className="text-2xl font-semibold mb-3 text-gray-800">2. How We Use Your Information</h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                    The information we collect is used in various ways, such as:
                    <ul className="list-disc list-inside pl-6">
                        <li>To operate and maintain our services, including processing transactions and managing your account.</li>
                        <li>To communicate with you, including sending updates, notifications, and promotional materials.</li>
                        <li>To improve our services and provide personalized content and recommendations based on your preferences.</li>
                        <li>To monitor and analyze usage patterns to enhance the functionality and performance of our services.</li>
                        <li>To comply with legal obligations and protect our rights and the rights of others.</li>
                    </ul>
                </p>

                <h2 className="text-2xl font-semibold mb-3 text-gray-800">3. Sharing Your Information</h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                    We may share your information under the following circumstances:
                    <ul className="list-disc list-inside pl-6">
                        <li><strong>Service Providers:</strong> With third-party partners who assist us in operating our services, such as payment processors and marketing providers.</li>
                        <li><strong>Legal Requirements:</strong> When required by law or to respond to legal processes and requests.</li>
                        <li><strong>Business Transactions:</strong> In connection with mergers, acquisitions, or asset sales where your information may be transferred to a new entity.</li>
                        <li><strong>With Your Consent:</strong> When you provide explicit consent for specific disclosures.</li>
                    </ul>
                </p>

                <h2 className="text-2xl font-semibold mb-3 text-gray-800">4. Security Measures</h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                    We implement industry-standard security measures to protect your personal information. However, due to the nature of online communications and the internet, we cannot guarantee complete security. We strive to use reasonable safeguards to prevent unauthorized access, alteration, or misuse of your data.
                </p>

                <h2 className="text-2xl font-semibold mb-3 text-gray-800">5. Your Choices</h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                    You have the following choices regarding your information:
                    <ul className="list-disc list-inside pl-6">
                        <li><strong>Access and Update:</strong> You can view and update your personal information through your account settings.</li>
                        <li><strong>Opt-Out:</strong> You can opt out of receiving marketing communications by following the instructions in those communications.</li>
                        <li><strong>Cookies:</strong> You can configure your browser to block or delete cookies, though this may affect your experience on our website.</li>
                    </ul>
                </p>

                <h2 className="text-2xl font-semibold mb-3 text-gray-800">6. Changes to This Privacy Policy</h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                    We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date. We encourage you to periodically review this policy to stay informed about how we are protecting your information.
                </p>

                <h2 className="text-2xl font-semibold mb-3 text-gray-800">7. Contact Us</h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                    If you have any questions or concerns about this Privacy Policy or our data practices, please contact us:
                    <br />
                    <strong>Email:</strong> {" "}
                    <a href="mailto:privacy@wearabsence.com">privacy@wearabsence.com</a>
                    <br />
                    <strong>Address:</strong>  {" "} Bhopal, Madhya Pradesh 462010
                </p>
            </div>
        </HelmetProvider>
    );
};

export default PrivacyPolicy;
