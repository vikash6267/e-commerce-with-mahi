import React, { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  useEffect(() => {
    window.scrollTo(0, 0);
}, []);
  // Updated FAQ data
  const faqData = [
    {
      category: 'General Queries',
      questions: [
        {
          question: 'HOW TO PLACE AN EXCHANGE REQUEST?',
          answer: `
            - Visit the "Place your Exchange Request" section on the Wear Absence website or 
            <a href="https://wearabsence.com">click here</a> to raise an exchange request for your Absence order.<br/><br/>
            - Submit the required details as prompted.<br/>
            - Follow the instructions and select the item(s) you would like to exchange.<br/><br/>
            Please note that the exchange request needs to be raised within 7 days of the delivery date. 
            Reverse pickup will be arranged in 2-3 working days by our courier partner. 
            Once we receive the product, we will contact you to confirm your request.<br/><br/>
            All exchanged products must be unused, unwashed, undamaged, and returned with the original packaging and tags. 
            Items without tags will not be accepted.
          `,
        },
        {
          question: 'HOW LONG WILL MY ORDER TAKE TO ARRIVE?',
          answer: `
            An order from Wear Absence typically takes 2-5 working days to reach metros and tier I cities. 
            However, for some pin codes, it might take a little longer. 
            In case of any delay, please contact us via:<br/><br/>
            Instagram: wearabsence<br/>
            Whatsapp: +91 8889102080
          `,
        },
        {
          question: 'HOW WOULD I KNOW IF MY ORDER IS PLACED?',
          answer: 'You will receive a confirmation email and a notification on your registered phone number from Wear Absence once your order is placed. We will also notify you once your order is dispatched from our warehouse.',
        },
        {
          question: 'WHAT HAPPENS IF MY SHIPMENT DOES NOT GET DELIVERED ON TIME?',
          answer: `
            If your order from Wear Absence does not get delivered within 7-10 working days, 
            please contact us at:<br/><br/>
            Instagram: wearabsence<br/>
            Whatsapp: +91 8889102080<br/><br/>
            We will work diligently to get it delivered as soon as possible.
          `,
        },
        {
          question: 'DO WE SHIP OUTSIDE INDIA?',
          answer: 'Currently, Wear Absence does not offer international shipping. However, you can make a purchase from anywhere globally, provided the shipping address is within India.',
        },
      ],
    },
    {
      category: 'Cancellation, Exchange & Refund',
      questions: [
        {
          question: 'HOW CAN I CANCEL AN ORDER?',
          answer: `
            You can cancel your order from Wear Absence within 6 hours of placing it via Whatsapp. 
            Alternatively, you can click the cancel order button in the order confirmation message you received.
          `,
        },
        {
          question: 'WHAT HAPPENS TO ORDERS WHERE PRODUCTS ARE RECEIVED IN DAMAGED CONDITION?',
          answer: `
            While we strive for the highest quality standards, if you receive a damaged or defective product from Wear Absence, 
            please notify us within 24 hours of delivery. 
            Also, email us a photograph of the damaged or defective product at:<br/><br/>
            Instagram: wearabsence<br/>
            Whatsapp: +91 8889102080<br/><br/>
            If you do not notify us within this period, the return may not be processed.
          `,
        },
        {
          question: 'WHAT SHOULD I DO IF I RECEIVE A DIFFERENT ITEM FROM THE ONE THAT I HAVE ORDERED?',
          answer: `
            Although we make every effort to ensure accurate deliveries, if you receive a different or incorrect item from Wear Absence, 
            please visit the returns section on our website or 
            <a href="https://wearabsence.com">click here</a> to raise a return request.
          `,
        },
        {
          question: 'I HAVE REQUESTED A REPLACEMENT, WHEN WILL I GET IT?',
          answer: `
            For exchanges with Wear Absence, reverse pickup will be arranged within 2-3 days after the request is placed. 
            It generally takes 7-10 days for the product to reach our warehouse, where it undergoes a quality check. 
            If it passes the quality check, the exchange will be processed within 72 hours. 
            Once the replacement is dispatched, it will reach you in 7-10 working days. For further assistance, please contact:<br/><br/>
            Instagram: wearabsence<br/>
            Whatsapp: +91 8889102080
          `,
        },
        {
          question: 'CAN I RETURN ALL ITEMS?',
          answer: `
            For hygiene reasons, innerwear (Briefs, Trunks, Boxers), Socks, Sunglasses, Accessories, Perfumes, and Face Masks cannot be returned. 
            Additionally, orders including free products received during promotional events or offers are not eligible for returns or exchanges.
          `,
        },
        {
          question: 'HOW DO I CHECK THE STATUS FOR MY EXCHANGED ORDER?',
          answer: `
            To check the status of your exchanged order with Wear Absence, 
            you may log into your account or contact us at:<br/><br/>
            Instagram: wearabsence<br/>
            Whatsapp: +91 88891 02080
          `,
        },
      ],
    },
    {
      category: 'Sizing Help',
      questions: [
        {
          question: 'HOW DO I DETERMINE MY SIZE?',
          answer: `
            Wear Absence provides a size chart for each product on our website. 
            Please refer to it to select the right size. If you are still unsure, 
            you can reach out to us at:<br/><br/>
            Instagram: wearabsence<br/>
            Whatsapp: +91 8889102080
          `,
        },
        {
          question: 'WHAT SIZE SHOULD I PURCHASE IF MY MEASUREMENTS FALL IN BETWEEN TWO SIZES?',
          answer: 'We recommend choosing the larger size if your measurements fall between two sizes to ensure a better fit.',
        },
      ],
    },
  ];

  // Toggle function to expand/collapse answers
  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>FAQ - Wear Absence</title>
        <meta name="description" content="Frequently asked questions about Wear Absence products and services. Get answers to queries about orders, returns, exchanges, and sizing help." />
      </Helmet>
      <div className="f p-4 sm:p-6 md:p-8 mt-[70px]">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">Frequently Asked Questions</h1>
        {faqData.map((category, catIndex) => (
          <div key={catIndex} className="mb-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4">{category.category}</h2>
            {category.questions.map((item, index) => (
              <div
                key={index}
                className={`cursor-pointer p-4 border-b ${activeIndex === index ? 'bg-gray-100' : ''}`}
                onClick={() => toggleFAQ(index)}
              >
                <div className="text-base sm:text-lg md:text-xl flex justify-between items-center">
                  {item.question}
                  <span className="text-lg sm:text-xl md:text-2xl">
                    {activeIndex === index ? '-' : '+'}
                  </span>
                </div>
                {activeIndex === index && (
                  <div
                    className="mt-2 text-sm sm:text-base md:text-lg"
                    dangerouslySetInnerHTML={{ __html: item.answer }}
                  />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </HelmetProvider>
  );
};

export default FAQ;
