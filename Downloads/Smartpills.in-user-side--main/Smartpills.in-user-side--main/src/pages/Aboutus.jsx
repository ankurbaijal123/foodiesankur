import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const About = () => {
  return (
    <>
      <Navbar />
      <div className="mx-20 my-10">
        <div
          style={{ textAlign: "center" }}
          className="font-semibold text-2xl mb-5"
        >
          About SmartPills
        </div>
        <h1 className="mb-3" style={{ textAlign: "center" }}>
          We believe everyone deserves affordable medicines and our mission is
          to build better ways for people to find the right medicine at the
          best price.
        </h1>
        <h1 className="mb-3" style={{ textAlign: "center" }}>
          We Provide our Consumers with the knowledge, choice, and care they
          need to stay healthy, that’s why we started Smart pills to make
          medicine pricing transparent.
        </h1>
        <h1 className="mb-5" style={{ textAlign: "center" }}>
          SmartPills helps people across the country by providing affordable
          and easier access to medicine which leads to better health.
        </h1>
        <div>
          <h1
            className="font-semibold"
            style={{ fontSize: "1.1rem", textAlign: "center" }}
          >
            SmartPills Values, Mission & Vision
          </h1>
          <div className="flex">
            <div className=" border-2 border-orange-500 rounded-lg w-1/2 ml-10 mr-5 px-4 py-4 mt-10"> 
              <h1 style={{fontSize:'1.2rem'}} className="font-bold">VALUES:</h1>
              <ol>
                <li>We treat everyone honestly, and respectfully.</li>
                <li>
                  We know we can succeed in getting all our consumers access to
                  the medicines they need, and we will not stop until we do.
                </li>
                <li>
                  We believe everyone should have access to high quality,
                  affordable medicines, no matter who they are or what their
                  circumstances.
                </li>
                <li>Our success is defined by the help we provide to people in need.</li>
                <li>
                  We present information that is objective and easy to
                  understand, so consumers can make the best decisions for
                  their needs.
                </li>
                <li>
                  We hold ourselves and our colleagues to the highest standards
                  of integrity, responsibility, and quality in all that we do.
                </li>
              </ol>
            </div>
            <div className="w-1/2 ml-5 mr-10 mt-10 flex flex-col justify-between">
              <div className="bg-gradient-to-r from-orange-400 to-yellow-400 rounded-lg flex-grow mb-5 text-white">
                <h1 className="px-4 py-4 font-bold" style={{fontSize:'1.2rem'}}>MISSION :</h1>
                <h1 className="px-4 py-4">
                  Help Indians to compare offline medicine prices and buy at
                  best price within their reach.
                </h1>
              </div>
              <div className="bg-gradient-to-r from-orange-400 to-yellow-400 rounded-lg flex-grow text-white">
                <h1 className="px-4 py-4 font-bold" style={{fontSize:'1.2rem'}}>VISION :</h1>
                <h1 className="px-4 py-4">
                  Help Indian community with medicine prices which are
                  affordable, trusted and within their reach.
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
