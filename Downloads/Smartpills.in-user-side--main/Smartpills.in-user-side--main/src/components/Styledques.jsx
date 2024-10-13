import React,{useState} from "react";
import { IoAdd } from "react-icons/io5";
import { GrSubtract } from "react-icons/gr";
const Styledques=(props)=>{
    const [show,setShow]=useState(false)
    return(
        <div>
            <div className={show==false?"bg-gray-200 my-2":'bg-slate-900 my-2 text-white'}>
            <div className="flex justify-between" onClick={()=>setShow(!show)}>
                <h1 className="my-auto px-5 py-4">How do I find a coupon?</h1>
                {show==false?
                <IoAdd className="my-auto mr-5" fontSize='2rem'></IoAdd>:<GrSubtract className="my-auto mr-5" color="white" fontSize='2rem'></GrSubtract>
}
            </div>
            {show&&<div>
                <h2 className="bg-white text-black px-5 py-2">
                <div>
                    <h1 className="font-semibold">Step 1: Search for your medicine</h1>
                    <h2>To locate a coupon for your medicine, visit SmartPills.in., type in your medicine’s name in the search field and click the “GET LOWEST PRICE” button.</h2>
                </div>
                <div>
                    <h1 className="font-semibold">Step 2: Add your location</h1>
                    <h2>On top of our landing page, you should see a location pin that says, "Set your location ". Click on the "Set your location" link to enter your pin code.</h2>
                </div>
                <div>
                    <h1 className="font-semibold">Step 3: Select brand, your form, strength, and quantity.</h1>
                    <h2>At the top of the page, under your prescription name, locate the drop-down options for brand-name or generic drugs, form, dosage and quantity. Select your correct form, dosage, and quantity, to ensure you are viewing accurate prices for your prescription.</h2>
                </div>
                </h2>
            </div>
}
        </div>
        </div>
    )
}
export default Styledques;