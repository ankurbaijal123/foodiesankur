import React from "react";
import logo from "../assets/logo.png";
import { CiMail } from "react-icons/ci";
import { FaFacebook, FaInstagramSquare, FaLinkedin, FaTwitterSquare, FaYoutubeSquare } from "react-icons/fa";
import footer from "../assets/foot.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="lg:flex justify-between bg-white overflow-hidden">
      <div className="lg:px-10 lg:w-2/5 py-10">
        <img
          src={logo}
          className="w-1/2 mt-5 mb-5 lg:ml-5 mx-auto"
          alt="Logo"
        />
        <div className="sm:flex lg:ml-5 mx-2">
          <div className="sm:w-1/2 lg:w-full">
            <div className="font-bold lg:text-left text-center text-gray-900">
              Our Mission
            </div>
            <div className="text-sm text-gray-700 lg:mr-5 lg:text-left text-center">
              Help Indians to compare offline medicine prices and buy at best price within their reach.
            </div>
          </div>
          <div className="sm:w-1/2 lg:w-full mt-5 sm:mt-0">
            <h1 className="font-bold lg:ml-5 lg:text-left text-center text-gray-900">
              Our Vision
            </h1>
            <div className="text-sm text-gray-700 lg:ml-5 lg:text-left text-center">
              Help Indian community with medicine prices which is affordable, trusted, and within their reach.
            </div>
          </div>
        </div>
      </div>
      
      <div className="relative flex lg:w-4/5 bg-gradient-to-r from-orange-400 to-yellow-400 lg:bg-none">
        <img
          src={footer}
          className="absolute w-full h-full z-10 lg:block hidden"
          alt="Footer"
        />
        <div className="w-2/12 lg:block hidden"></div>
        <div className="z-20 sm:flex justify-between lg:w-10/12 sm:py-10 w-full lg:mx-0 mx-5">
          {/* Important Links Section */}
          <div className="sm:w-1/3">
            <div className="font-semibold mb-5 text-center lg:text-left text-gray-900">
              Important Links
            </div>
            <ul className="w-max mx-auto lg:w-full">
              {[
                { name: "About Us", to: "/about" },
                { name: "FAQ's", to: "/faq" },
                { name: "Testimonials", to: "/testimonials" },
                { name: "Terms & Conditions", to: "/terms" },
                { name: "Cyber Security", to: "/cyber-security" },
                { name: "IP Policy", to: "/ip-policy" },
                { name: "Partner Login", to: "https://smart-pills-admin.web.app/" },
                { name: "Privacy Policy", to: "/privacy" },
              ].map((link, idx) => (
                <li key={idx} className="mb-3">
                  <Link to={link.to} className="hover-link font-bold text-black hover:text-orange-600 transition">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Queries Section */}
          <div className="sm:w-1/3">
            <div className="font-semibold mb-5 text-center lg:text-left text-gray-900">
              Queries
            </div>
            <ul className="w-max mx-auto lg:w-full">
              {[
                { name: "Cancer", to: "/query?label=Cancer" },
                { name: "Chronic Care", to: "/query?label=Chronic%20Care" },
                { name: "Generics", to: "/query?label=Generics" },
                { name: "Special Needs", to: "/query?label=Special%20Needs" },
                { name: "Alliances", to: "/alliance" },
                { name: "Smart Champ", to: "/smartchamp" },
              ].map((link, idx) => (
                <li key={idx} className="mb-3">
                  <Link to={link.to} className="hover-link font-bold text-black hover:text-orange-600 transition">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Reach Us Section */}
          <div className="sm:w-1/3">
            <div className="font-semibold mb-5 text-center lg:text-left text-gray-900">
              Reach Us
            </div>
            <div className="flex w-max mx-auto lg:w-full mb-5">
              <CiMail className="my-auto mr-3 text-gray-700" fontSize="1.5rem" />
              <div className="text-sm text-gray-700">
                <Link to="mailto:info@smartpills.in" className="hover-link font-bold text-black hover:text-orange-600 transition">
                  info@smartpills.in
                </Link>
              </div>
            </div>
            <div className="mt-8 mb-5 font-semibold text-center lg:text-left text-gray-900">
              Follow SmartPills on
            </div>
            <div className="flex w-max mx-auto lg:w-full mb-5">
              {[
                { icon: FaFacebook, to: "https://www.facebook.com/smartpillsindia" },
                { icon: FaInstagramSquare, to: "https://www.instagram.com/smartpillsindia/?igshid=MzRlODBiNWFlZA%3D%3D" },
                { icon: FaLinkedin, to: "https://www.linkedin.com/company/smartpillsindia/" },
                { icon: FaTwitterSquare, to: "https://twitter.com/SmartPillsIndia" },
                { icon: FaYoutubeSquare, to: "https://www.youtube.com/@Smart-Pills" },
              ].map(({ icon: Icon, to }, idx) => (
                <Link key={idx} to={to} className="hover-link social-icon text-white hover:text-orange-600 transition">
                  <Icon fontSize="1.5rem" className="mr-3" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
