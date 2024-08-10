import React, { useState } from 'react';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  // Updated FAQ data
  const faqData = [
    {
      category: 'General Queries',
      questions: [
        {
          question: 'HOW TO PLACE AN EXCHANGE REQUEST?',
          answer: `
            - Visit the "Place your Exchange Request" section on the website/app or 
            <a href="https://wearabsence.com">click here</a> to raise an exchange request for your order.<br/><br/>
            - Submit the required details as prompted.<br/>
            - Follow the instructions and select the item(s) you would want to Exchange.<br/><br/>
            Please note that the Exchange request needs to be raised within 7 days of the delivery date. 
            Reverse pickup will be done in 2-3 working days by our courier partner. 
            Once we receive the product, we would get in touch with you to confirm your request.<br/><br/>
            All exchanged products must be unused, unwashed, undamaged, and returned with the original packaging and tags. 
            Items without tags will not be accepted.
          `,
        },
        {
          question: 'HOW LONG WILL MY ORDER TAKE TO ARRIVE?',
          answer: `
            The order usually takes 2-5 working days to reach all the metros and tier I cities, however for some pin codes it might take a little more time. 
            In case of delay, please get in touch with us on:<br/><br/>
            Instagram: wearabsence<br/>
            Whatsapp: +91 8889102080
          `,
        },
        {
          question: 'HOW WOULD I KNOW IF MY ORDER IS PLACED?',
          answer: 'You will get a confirmation of the placed order on your registered email ID and phone number. Besides, we will further notify you once it is dispatched from our warehouse.',
        },
        {
          question: 'WHAT HAPPENS IF MY SHIPMENT DOES NOT GET DELIVERED ON TIME?',
          answer: `
            In case the order does not get delivered within 7-10 working days, you can write to us at:<br/><br/>
            Instagram: wearabsence.com<br/>
            Whatsapp: +91 8889102080<br/><br/>
            We will do our best to get it delivered at the earliest.
          `,
        },
        {
          question: 'DO WE SHIP OUTSIDE INDIA?',
          answer: 'At the moment, we do not deliver items outside India. However, you can make a purchase from anywhere in the world as long as the shipping address is within India.',
        },
      ],
    },
    {
      category: 'Cancellation, Exchange & Refund',
      questions: [
        {
          question: 'HOW CAN I CANCEL AN ORDER?',
          answer: `
            You can cancel your order within 6 hours of placing the order via Whatsapp. 
            You can opt to cancel the order by clicking the cancel order button in the Order confirmation message.
          `,
        },
        {
          question: 'WHAT HAPPENS TO ORDERS WHERE PRODUCTS ARE RECEIVED IN DAMAGED CONDITION?',
          answer: `
            We strive to deliver the best quality standards. However, if you receive a damaged/defective product, 
            please notify us within 24 hours of delivery. 
            Also, email us a photograph of the damaged/defective product at:<br/><br/>
            Instagram: wearabsence<br/>
            Whatsapp: +91 8889102080<br/><br/>
            If you fail to notify us within this period, the return may not be processed.
          `,
        },
        {
          question: 'WHAT SHOULD I DO IF I RECEIVE A DIFFERENT ITEM FROM THE ONE THAT I HAVE ORDERED?',
          answer: `
            We try our best to deliver the right products on time. However, in rare cases where you receive a different/wrong product, 
            please visit the returns section on the website or 
            <a href="https://wearabsence.com">click here</a> to raise a return request if you receive the wrong order.
          `,
        },
        {
          question: 'I HAVE REQUESTED A REPLACEMENT, WHEN WILL I GET IT?',
          answer: `
            For exchange, the reverse pickup will be done in 2-3 days once the request is placed. 
            It takes 7-10 days for the product to arrive at our warehouse, where it undergoes a quality check. 
            Once it passes the QC, the request for exchange will be initiated within 72 hours. 
            Once the product is dispatched, it will take 7-10 working days to reach you. For further assistance, please contact:<br/><br/>
            Instagram: wearabsence<br/>
            Whatsapp: +91 8889102080
          `,
        },
        {
          question: 'CAN I RETURN ALL ITEMS?',
          answer: `
            Innerwear (Briefs, Trunks, Boxers), Socks, Sunglasses, Accessories, Perfumes, and Face Masks cannot be returned for hygiene reasons. 
            Additionally, orders including any free products received during promotional events/offers are not eligible for returns/exchanges.
          `,
        },
        {
          question: 'HOW DO I CHECK THE STATUS FOR MY EXCHANGED ORDER?',
          answer: `
            For further information on your exchanged order, 
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
            Our website has a size chart available for each product. 
            Please refer to it to select the right size. If you are still unsure, 
            you can reach out to us at:<br/><br/>
            Instagram: wearabsence<br/>
            Whatsapp: +91 8889102080
          `,
        },
        {
          question: 'WHAT SIZE SHOULD I PURCHASE IF MY MEASUREMENTS FALL IN BETWEEN TWO SIZES?',
          answer: 'We recommend opting for the larger size if your measurements fall between two sizes.',
        },
      ],
    },
  ];

  // Toggle function to expand/collapse answers
  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
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
  
  );
};

export default FAQ;
