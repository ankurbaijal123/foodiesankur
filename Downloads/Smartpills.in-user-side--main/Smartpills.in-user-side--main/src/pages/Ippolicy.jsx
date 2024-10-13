import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const Ippolicy=()=>{
    return(
        <>
        <Navbar/>
        <div className="mx-20 my-10 py-5">
        <div style={{textAlign:'center'}} className="font-semibold text-2xl mb-5">INTELLECTUAL PROPERTY INFRINGEMENT POLICY</div>
        <div className="mb-5 text-sm">This intellectual property infringement policy (“IP Policy”) must be read along with the Terms and Conditions of SMARTPILLS.</div>
        <div className="mb-5 text-sm">The domain name www.smartpills.in, an internet-based portal and SmartPills mobile application (Android and iOS) is owned and operated by Saverx Technologies Private Ltd a company duly incorporated under the provisions of the Companies Act, 2013. The domain name and the mobile application are collectively (hereinafter referred to as the “Website”). The terms of this IP Policy constitute a legal and binding contract between you (hereinafter referred to as “You” or “Your” or the “User”) on one part and the Company on the other Part.</div>
        <div className="mb-5 text-sm">The Company respects the intellectual property rights of all individuals and entities (“Persons”). and for that strictly prohibits its third-party service providers and all other third parties from using the Website to sell, distribute, circulate, post, upload or in any other manner deal with any information, data or content that infringes upon the intellectual property including copyrights and trademarks of any Persons.</div>
        <div className="mb-5 text-sm">In the event, You believe that Your intellectual property has been infringed upon by any material made available on the Website, You should notify the Website by sending an e-mail at (info@smartpills.inz) (“Claim"). You must also include the following information in Your Claim:</div>
        <ol className="mb-5 text-sm mx-4">
            <li>1. The URL(s) through which the claimed infringing material is made available on the Website</li>
            <li>2. Identification or description of the claimed infringing material</li>
            <li>3. Intellectual property that is allegedly being infringed, including evidence of Your ownership of the intellectual property rights over the claimed infringing material</li>
            <li>4. Your particulars including your full name, address, telephone number(s) and email address and</li>
            <li>5. A statement that You have a good-faith belief that use of the claimed infringing material in question and the URL submitted is unauthorized by the rights owner or its licensee, and such use amounts to infringement under law. Such statement shall also declare that the information being provided by You is complete and accurate</li>
        </ol>
        <div className="mb-5 text-sm">On receipt of such Claim along with the full particulars as provided above, the Company shall investigate into the matter and determine whether your intellectual property has been infringed as mentioned in your claim. During such investigation by the Company, the Company may request You for further information in regard to your Claim or post investigation may take the requisite action. Such action shall be determined at the sole discretion of the Company. In case the information received in your Claim is found to be incomplete, frivolous or untrue, the Company shall not be obliged to take actions and may re-activate the URL provided in the Claim at its sole discretion and the Company may also hold you liable for any civil and possibly criminal proceedings as per the applicable law.</div>
        </div>
        <Footer/>
        </>
    )
}
export default Ippolicy;