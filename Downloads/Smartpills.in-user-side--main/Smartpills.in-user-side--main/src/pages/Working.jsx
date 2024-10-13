import React from "react";
import banner from "../assets/banner.png"
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaExclamationCircle } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import img1 from "../assets/img1.png"
import img2 from "../assets/img2.png"
import img3 from "../assets/img3.png"
import img4 from "../assets/img4.png"
import w1 from "../assets/working-1.png"
import w2 from "../assets/working-2.png"
const Working = () => {
    return (
        <>
            <Navbar />
            <div>
                <h1 style={{ textAlign: 'center' }} className="text-2xl mt-10 mb-2 font-semibold">How SmartPills Work</h1>
                <h2 style={{ textAlign: 'center' }}>Your Savings! Our Priority!</h2>
                <div className="md:flex mt-10 mx-10">
                    <iframe
                        height="325"
                        src="https://www.youtube.com/embed/WUHZ0v-vmzE"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                        className="mr-5 rounded-lg md:w-6/12 w-full"
                    ></iframe>
                    <div className=" my-auto md:w-6/12 w-full text-center md:text-left" style={{ fontSize: '1.2rem' }}>
                        <h1 >Stop Paying Too Much Your Medicines. Compare and Get Best Prices From Your Local Chemists!</h1>
                        <h2 className="font-semibold mt-5">Download Your Free COUPON & BUY Now!</h2>
                    </div>
                </div>
                <img src={banner} className="hidden md:block"></img>
                <div className="w-11/12 mx-auto text-center md:hidden">
                    <div className="font-bold mt-10 text-2xl">Step 1</div>
                    <div>Medicine prices vary by pharmacy. Use SmartPills to find current prices and discounts.</div>
                    <img src={w1} className="mx-auto"></img>
                    <div className="font-bold mt-10 text-2xl">Step-2</div>
                    <div>SmartPills coupons can help you pay less than the actual price of your medicines.</div>
                    <img src={w2} className="mx-auto"></img>
                    <div className="font-bold mt-10 text-2xl">Step 3</div>
                    <div>Bring your free coupons to the pharmacy while picking up your medicines.</div>
                </div>
                <div className=" mx-auto lg:flex justify-between mt-10 lg:w-8/12 w-11/12" style={{ fontSize: '1.2rem' }}>
                    <div className="w-full lg:pr-10">
                        In less than 90 seconds see how SmartPills provided best prices and discounts for your medicines from a pharmacy near you.
                    </div>
                    <div className="mx-auto w-max lg:mt-0 mt-5">
                        <div className="flex w-32">
                            <MdOutlineEmail className="my-auto" color="orange"></MdOutlineEmail>
                            <div className="text-center">&nbsp;Reach Us</div>
                        </div>
                        <div className="flex">
                            <FaExclamationCircle className="my-auto" color="orange"></FaExclamationCircle>
                            <div>&nbsp;FAQ's</div>
                        </div>
                    </div>
                </div>
                <div className=" lg:mx-20 mb-20 mx-5">
                <h1 className="mt-20 text-2xl font-semibold mb-5">How to Use SmartPills</h1>
                <hr></hr>
                <div className="lg:flex mt-6">
                    <div className="mr-5 w-full">
                        <h1 className="font-semibold mb-3" style={{fontSize:'1.1rem'}}>How do I find discounts for my medicine?</h1>
                        <h2 className="mb-3 text-sm">It’s easy. Just go to the home page, type in your medicine's name in the search field, and click the “Find the Lowest Price” button.</h2>
                        <h2 className="text-sm">We'll even help you spell the name of your medicine.</h2>
                    </div>
                    <img src={img1} className="w-full lg:mt-0 mt-5"></img>
                </div>
                <div className="lg:flex mt-20">
                <div className="lg:ml-8 lg:order-2 w-full">
                        <h1 className="font-semibold mb-3" style={{fontSize:'1.1rem'}}>What are SmartPills coupons?</h1>
                        <h2 className="text-sm mb-3">SmartPills coupons will help you pay less than the printed retail price for your medicine. They’re free to use and are accepted by almost every chemist store in your area.</h2>
                    </div>
                    <img src={img2} className="lg:order-1 w-full"></img>
                </div>
                <div className="lg:flex mt-20">
                    <div className="mr-5">
                        <h1 className="font-semibold mb-3" style={{fontSize:'1.1rem'}}>How do I use a SmartPills coupon?</h1>
                        <h2 className="mb-3 text-sm">It’s similar to using a coupon at a grocery store. Simply print the coupon and bring it with you to the chemist store when you pick up your medicine. The chemist will take note of your coupon number and offer the same at exactly the same discounted price as printed on the coupon.</h2>
                        <h2 className="mb-3 text-sm">Don’t have a printer or want to save paper and ink cartridges? You can show the coupon on your phone by:</h2>
                        <h2 className="mb-3 text-sm">A)Sending the coupon to yourself via email or text</h2>
                        <h2 className="text-sm">B) Or by using Whatsapp's</h2>
                    </div>
                    <img src={img3} className="w-full"></img>
                </div>
                <div className="lg:flex mt-20">
                <div className="lg:ml-8 lg:order-2">
                        <h1 className="font-semibold mb-3" style={{fontSize:'1.1rem'}}>What if I have insurance or Medicare?</h1>
                        <h2 className="mb-3 text-sm">At present the local chemists have no tie ups with insurance companies. The claim for reimbursement if any should be settled directly with the providers.</h2>
                    </div>
                    <img src={img4} className="lg:order-1 w-full"></img>
                    
                </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
export default Working;