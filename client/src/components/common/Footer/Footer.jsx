import { FaFacebook, FaTwitter, FaLinkedin, FaPinterest,FaHeart,FaInstagram   } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="new_footer_area bg-gray-200">
      <div className="new_footer_top">
        <div className="container mx-auto py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="f_widget company_widget">
              <h3 className="f-title font-semibold text-lg mb-4">Get in Touch</h3>
              <p className="text-gray-700 mb-4">Don’t miss any updates of our new products and T-shrts!</p>
              <form action="#" className="f_subscribe_two mailchimp" method="post" noValidate>
                <input type="text" name="EMAIL" className="form-control memail bg-gray-100 px-4 py-2 rounded-md mb-2" placeholder="Email" />
                <button className="btn btn_get btn_get_two bg-blue-500 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out hover:bg-blue-600" type="submit">Subscribe</button>
                <p className="mchimp-errmessage" style={{ display: 'none' }}></p>
                <p className="mchimp-sucmessage" style={{ display: 'none' }}></p>
              </form>
            </div>
        
            <div className="f_widget about-widget pl-4 md:pl-0">
              <h3 className="f-title font-semibold text-lg mb-4">Help</h3>
              <ul className="list-unstyled f_list text-gray-700">
                <li>FAQ</li>
                <li>Terms & conditions</li>
                <li>Reporting</li>
                <li>Documentation</li>
                <li>Support Policy</li>
                <li>Privacy</li>
              </ul>
            </div>
            <div className="f_widget social-widget pl-4 md:pl-0">
              <h3 className="f-title font-semibold text-lg mb-4">Follow Us</h3>
              <div className="f_social_icon">
               <a href="https://www.instagram.com/absence.in?igsh=c2lia3YwYmczYW5i" className='text-gray-700 hover:text-blue-500 transition duration-300 ease-in-out text-3xl'><FaInstagram ></FaInstagram></a>
              </div>
            </div>
          </div>
        </div>
        <div className="footer_bg">
          <div className="footer_bg_one"></div>
          <div className="footer_bg_two"></div>
        </div>
      </div>
      <div className="footer_bottom bg-gray-300 py-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center flex-wrap gap-2">
            <p className="mb-0 text-gray-700 flex items-center gap-2">Made with <span className="text-red-500"><FaHeart /></span>  <a href="https://mahi-technocrafts.vercel.app/" target='_blank' className=' text-blue-900 underline'>Mahi Technocrafts</a></p>
            <p className="mb-0 text-gray-700">©Absence  2024 All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
