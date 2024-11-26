import React from 'react';
import { Link } from 'react-router-dom';

function AboutUs() {
  return (
    <div className="bg-white text-gray-900 py-16 px-8 mt-[50px]">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold mb-6">Discover the Essence of Absence</h1>
        <p className="text-lg mb-6 leading-relaxed">
          Welcome to <span className="font-bold text-blue-600">Absence</span>, where fashion meets sophistication.  
          Our curated collection of luxury t-shirts is designed for those who value quality, style, and individuality.  
          Each piece embodies a perfect blend of timeless elegance and modern minimalism.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Exquisite Craftsmanship</h2>
            <p className="text-gray-700">
              We use premium fabrics and innovative techniques to create t-shirts that not only look good but feel extraordinary.  
              Each design is carefully crafted to ensure durability and a luxurious touch with every wear.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Timeless Design</h2>
            <p className="text-gray-700">
              At Absence, less is more. Our designs reflect understated elegance, making them versatile for any occasion.  
              Whether you're dressing up or down, our t-shirts are your perfect style companion.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Sustainable Fashion</h2>
            <p className="text-gray-700">
              We believe in conscious choices. Our collection is ethically produced, combining luxury and sustainability.  
              Join us in creating a future where fashion and responsibility coexist seamlessly.
            </p>
          </div>
        </div>
        <p className="mt-8 text-lg leading-relaxed">
          Absence is more than just a clothing brand — it’s a lifestyle.  
          Every piece we offer is a statement of individuality, comfort, and impeccable taste.  
          Embrace the essence of luxury and step into a world of refined elegance with Absence.
        </p>
        <Link to={"/allProduct"} className="mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-lg">
          Shop the Collection
        </Link>
      </div>
    </div>
  );
}

export default AboutUs;
