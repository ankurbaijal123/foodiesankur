
import React, { useEffect, useState ,useContext} from "react";
import Navbar from "../components/Navbar";
import banner from "../assets/banner.png"
import { Link } from "react-router-dom";
import mobile from "../assets/mobile.png"
import Footer from "../components/Footer";
import accountImage from "../assets/account.png"
import { IoLocation } from "react-icons/io5";
import world from "../assets/world.png"
import { HiUserGroup } from "react-icons/hi";
import { HiDocumentCheck } from "react-icons/hi2";
import w1 from "../assets/working-1.png"
import w2 from "../assets/working-2.png"
import { MdOutlineSecurity } from "react-icons/md";
import { PiHandshakeFill } from "react-icons/pi";
import ios from "../assets/ios.png"
import android from "../assets/andriod.png"
import money from "../assets/money.png"
import team from "../assets/team.png"
import secure from "../assets/secure.png"
import doc from "../assets/doc.png"
// import article from "../assets/article.png"
import axios from 'axios';
import axiosClient from "../components/AxiosClient";

import { FaLongArrowAltRight } from "react-icons/fa"; //arrow to be used in view more 
import MedicineSearch from "../components/MedicineSearch"; // Import the new component
import noteContext from "../context/notes/noteContext";
const Landing = () => {
    const { pin, setPin} = useContext(noteContext);
    const [tempPin, settempPin] = useState('')
    const [showComingSoon, setShowComingSoon] = useState(false);
    const [articles, articleset]=useState([])
    const handlepin = (event) => {
        settempPin(event.target.value)
    }

    const currentmylocation=(pincode)=>{

        if (pincode.length==6){
            setPin(pincode)
            localStorage.setItem("PIN", pincode)
    }}

    const pinsetting = () => {
        if (tempPin.length==6){
        setPin(tempPin)
        localStorage.setItem("PIN", tempPin)
        }
    }
    if (pin=='')
        document.body.classList.add('no-scroll');
    else
        document.body.classList.remove('no-scroll');
    useEffect(() => {
        articlesapi()
        const storedPin = localStorage.getItem('PIN');
        if (storedPin != null)
            setPin(storedPin);
            

            
    }, []);

    const isPDF = (url) => {
        return /\.pdf$/i.test(url);
      };

    const articlesapi = async()=>{
        const token = localStorage.getItem('token');
        // checkTokenExpiry();
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("Token not found");
            }
            // checkTokenExpiry();
            const response =await axiosClient.post("/blogs/get_blogs/1/3", null, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(response.data, "=--==ttttt-=-=-=-")
            if (response.status === 200) {
                articleset(response.data || []); // Ensure cartItems is always an array
            } else {
                throw new Error("Failed to fetch cart items");
            }
        } catch (error) {
            console.error("Error fetching cart items:", error);
        }}

    const handle_pincode = async()=>{
        navigator.geolocation.getCurrentPosition(
            async(position) => {
                const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;  // Replace with your API key
                const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=${apiKey}`;
                const response =  await axios.get(url);
                const results = response.data.results;
                if (results.length > 0) {
                    const addressComponents = results[0].address_components;
                    const postalCodeComponent = addressComponents.find(component => component.types.includes('postal_code'));
                    if (postalCodeComponent) {
                        currentmylocation(postalCodeComponent.long_name)
                    }
                }
            })}
    return (
        <div>
            {pin=='' &&
                <div className="fixed z-50 flex justify-center items-center h-screen w-full">
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <div className="text-2xl font-semibold">
                            Set Your Location
                        </div>
                        <div className="text-sm font-semibold">
                            Find a location near you
                        </div>
                        <div className="flex bg-blue-500 text-white rounded-lg w-10/12 mx-auto py-2 mt-6 mb-2">
                            <div className="flex mx-auto">
                            <button onClick={handle_pincode}><IoLocation className="my-auto" /></button>
                                <div className="ml-2"><button onClick={handle_pincode}>Use my current location</button></div>
                            </div>
                        </div>
                        <div>Note: Your browser will ask permission first</div>
                        <div className="mx-auto w-max mt-3">OR</div>    
                        <input type="text" placeholder="Enter PIN code" className="mt-4 p-2 pl-3 border rounded-lg w-full" onChange={handlepin}></input>
                        <p className="text-sm">*Enter a valid 6 digit pincode</p>
                        <button className="mt-4 bg-gradient-to-r font-semibold text-md from-orange-400 to-yellow-400 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full" onClick={pinsetting}>Set Location</button>
                    </div>
                </div>}
            <div className={`relative z-0 bg-cover bg-center bg-gradient-to-r from-orange-400 to-yellow-400 ${pin=='' ? 'blur-lg' : ''}`}>
                <div className="relative lg:flex justify-end hidden">
                    <img src={accountImage} className="object-cover" alt="Background Image" style={{width:"55%"}}/>
                </div>
                <div className="absolute top-0 left-0 right-0">
                    <Navbar />
                </div>
                <div className="lg:absolute lg:pt-0 lg:w-9/12 lg:px-0 px-10 lg:left-10 text-white font-semibold text-center lg:text-left top-72 pt-20" style={{  fontSize: "2.5rem", lineHeight: "3.4rem" }}>
                    Stop Paying Too Much for Your Medicines.<br></br>Compare & get best prices from your local chemists.
                </div>
                <div className="lg:absolute left-10 text-2xl font-semibold text-center lg:text-left mx-5 lg:mx-0" style={{ top: "420px", fontSize: "1.5rem", lineHeight: "3rem" }}>
                    Download your free coupons & BUY Now!
                </div>
                <MedicineSearch pin={pin} setPin={setPin} handle_pincode={handle_pincode}handlepin={handlepin}pinsetting={pinsetting}/> {/* Use the new component */}
                <div className="bg-white">
                    <div className="text-3xl font-semibold text-center pt-20">How SmartPills Work</div>
                    <img src={banner} className="hidden md:block"></img>
                    <div className="w-11/12 mx-auto text-center md:hidden pb-10">
                        <div className="font-bold mt-10 text-2xl">Step 1</div>
                        <div>Medicine prices vary by pharmacy. Use SmartPills to find current prices and discounts.</div>
                        <img src={w1} className="mx-auto"></img>
                        <div className="font-bold mt-10 text-2xl">Step-2</div>
                        <div>SmartPills coupons can help you pay less than the actual price of your medicines.</div>
                        <img src={w2} className="mx-auto"></img>
                        <div className="font-bold mt-10 text-2xl">Step 3</div>
                        <div>Show the coupon to your pharmacist to get the discounted price.</div>
                        <img src={w2} className="mx-auto"></img>
                    </div>
                </div>
                <div
                    className="bg-cover bg-center"
                    style={{ backgroundImage: `url(${world})` }}
                >
                    <div className="text-white py-10 text-3xl font-semibold flex justify-center mx-4 mr-2">
                        SmartPills is built on the following four principles that every customer can rely on :
                    </div>
                    <div className="lg:flex mx-auto my-20 lg:w-full w-6/12">
                        <div className="text-white lg:w-1/4 lg:mr-5 ">
                            <HiUserGroup color="white" className="mx-auto mb-10" fontSize='5rem'></HiUserGroup>
                            <div className="flex justify-center text-3xl font-bold pt-8"><div>EMPOWERMENT</div></div>
                            <div style={{ textAlign: 'center' }}><div>We empower you to compare offline medicine prices of chemists near you.</div></div>
                        </div>
                        <div className="text-white lg:w-1/4 lg:mx-5">
                            <HiDocumentCheck color="white" className="mx-auto mb-10" fontSize='5rem'></HiDocumentCheck>
                            <div className="flex justify-center text-3xl font-bold pt-8"><div>ADVOCACY</div></div>
                            <div style={{ textAlign: 'center' }}><div>We're breaking complex medicine buying system of India, so you can buy medicine at best prices</div></div>
                        </div>
                        <div className="text-white lg:w-1/4 lg:mx-5">
                            <MdOutlineSecurity color="white" className="mx-auto mb-10" fontSize='5rem'></MdOutlineSecurity>
                            <div className="flex justify-center text-3xl font-bold pt-8"><div>TRANSPARENCY</div></div>
                            <div style={{ textAlign: 'center' }}><div>We're open and honest</div></div>
                        </div>
                        <div className="text-white lg:w-1/4 lg:ml-5">
                            <PiHandshakeFill color="white" className="mx-auto mb-10" fontSize='5rem'></PiHandshakeFill>
                            <div className="flex justify-center text-3xl font-bold pt-8 text-center"><div>DOING GOOD</div></div>
                            <div style={{ textAlign: 'center' }}><div>We're committed to helping communities</div></div>
                        </div>
                    </div>
                </div>
                <div className="bg-white">
                    <div className="text-3xl my-20 pt-10 font-semibold" style={{ textAlign: 'center' }}>SmartPills Values</div>
                    <div className="lg:flex mx-10">
                        <img src={doc} className="lg:mr-10 my-auto lg:w-1/2 w-9/12 mx-auto" style={{ height: '50%' }} ></img>
                        <div className="my-auto w-full">
                            <div className="flex mb-10">
                                <img src={money} style={{ width: '26%', height: '20%' }} className="my-auto"></img>
                                <div className="pl-5">
                                    <div className="text-gray-300 text-6xl font-bold">01</div>
                                    <div>We believe everyone should have access to high quality, affordable medicines, no matter who they are or what their circumstances.</div>
                                </div>
                            </div>

                            <div className="flex mb-10">
                                <img src={secure} style={{ width: '24%', height: '10%' }} className="my-auto"></img>
                                <div className="pl-5">
                                    <div className="text-gray-300 text-6xl font-bold">02</div>
                                    <div>We hold ourselves and our colleagues to the highest standards of integrity, responsibility, and quality in all that we do.</div>
                                </div>
                            </div>

                            <div className="flex">
                                <img src={team} style={{ width: '15%', height: '30%' }} className="my-auto"></img>
                                <div className="pl-5">
                                    <div className="text-gray-300 text-6xl font-bold">03</div>
                                    <div>Consumers are most important for us and we are doing what's best for them.</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="bg-white">
                    <div className="text-4xl font-semibold pt-20" style={{ textAlign: 'center' }}>Healthcare Useful Articles</div>
                    <div className="text-gray-400 mt-2 text-2xl" style={{ textAlign: 'center' }}>From healthcare providers, pharmacists, and journalists you can trust.</div>
                    <div className="lg:flex mx-8 mt-10">
                    {articles.map((articles, index)=>(


                        <div className="lg:w-1/3 mt-5 lg:mr-4 mx-auto">
                            {isPDF(articles.image_url)?<iframe
        src={articles.image_url} // Assuming imageData contains the PDF URL
        className="rounded-lg mx-auto" 
        title={articles.title}
      >
        This browser does not support PDFs. Please download the PDF to view it: <a href={articles.image_url}>Download PDF</a>
      </iframe>:<img src={articles.image_url} className="rounded-lg mx-auto"></img>}
                        
                        <div className="font-semibold my-4 text-center" style={{ fontSize: '1.1em' }}>{articles.title}</div>
                        <div className="text-sm text-center">{articles.description}</div>
                    </div>
                // <Article title={articles.title} img={articles.image_url} link={articles.id} bio={articles.description}/>

                ))}
                        
                        {/* <div className="lg:w-1/3 lg:mr-4 lg:ml-4 mx-auto mt-5">
                            <img src={article} className="rounded-lg mx-auto"></img>
                            <div className="font-semibold my-4 text-center" style={{ fontSize: '1.1em' }}>A new Blood test to detect Alzheimer in advance</div>
                            <div className="text-sm text-center">A new blood test can detect 'toxic' protein years before Alzheimer's symptoms emerge.</div>
                        </div>
                        <div className="lg:w-1/3 lg:ml-4 mx-auto">
                            <img src={article} className="rounded-lg mt-5 mx-auto"></img>
                            <div className="font-semibold my-4 text-center" style={{ fontSize: '1.1em' }}>A new Blood test to detect Alzheimer in advance</div>
                            <div className="text-sm text-center">A new blood test can detect 'toxic' protein years before Alzheimer's symptoms emerge.</div>
                        </div> */}
                    </div>
                    <div className="flex justify-center">
                        <Link to="/articles"><button className="bg-gradient-to-r from-orange-400 to-yellow-400 my-20 py-3 text-white rounded-lg border border-orange-500 flex"><span className="pl-10">VIEW MORE</span><FaLongArrowAltRight className="my-auto ml-2 mr-8"></FaLongArrowAltRight></button></Link>
                    </div>
                </div>
                <div className=" bg-orange-100 lg:flex lg:px-20 px-3 py-20 justify-between">
                    <img src={mobile} className="lg:ml-10 mx-auto" style={{ width: '360px' }}></img>
                    <div className=" mx-auto" style={{ textAlign: 'center' }}>
                        <h1 className="text-3xl font-semibold mb-10 mt-10 pt-5">Download SmartPills App,India’s<br></br>First FREE Medicines Coupons</h1>
                        <h1 className="text-3xl font-semibold mb-10">Your Savings! Our Priority!</h1>
                        <h3>Note: FREE because we are not charging anything for it to be emailed<br></br>,downloaded or WhatsApp.</h3>
                        <div className="sm:flex mt-10 justify-center w-max mx-auto">
                        <img src={android} className="sm:ml-4 mx-auto ms:mx-0 order-2 mb-4 sm:mb-0" style={{ height: '50px', width: '160px' }}></img>
                            <div className="order-1">
                                <img src={ios} className="sm:mr-4 mx-auto sm:mx-0" style={{ height: '50px', width: '160px' }}
                                    onMouseEnter={() => setShowComingSoon(true)}
                                    onMouseLeave={() => setShowComingSoon(false)}></img>
                                {showComingSoon && <button className="bg-gradient-to-r from-orange-400 to-yellow-400 border border-white border-1 sm:mr-4 mt-4 rounded-lg text-white" style={{ height: '50px', width: '160px' }}>COMING SOON</button>}
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>

        </div>
    )
}

export default Landing;
