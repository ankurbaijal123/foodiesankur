const Footer = () => {
  return (
    <div className="bg-gray-200 shadow-xl flex flex-col md:flex-row justify-between p-10">
      <div className="text-center md:text-left mb-4 md:mb-0">
        <p className="text-gray-700 font-medium">
          Flavor at Your Fingertips – Savor, Share, Repeat 🍴🍴!
        </p>
      </div>
      <div className="flex justify-center md:justify-end">
        <ul className="flex space-x-6 text-gray-600">
         
          <li className="text-purple-800 ">
            All rights reserved ©️
          </li>
          <li className="text-red-500 transition duration-300 ">
          <h4>Made with ❤️ </h4>
          </li>
        </ul>
        
        
      </div>
    </div>
  );
};

export default Footer;
