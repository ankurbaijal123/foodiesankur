import React, { useState } from "react";
import { IoAdd } from "react-icons/io5";
import { GrSubtract } from "react-icons/gr";

const Question =(props)=>{
    const [show,setShow]=useState(false)
    return (
        <div className={show==false?"bg-gray-200 my-2":'bg-slate-900 my-2 text-white'}>
            <div className="flex justify-between" onClick={()=>setShow(!show)}>
                <h1 className="my-auto px-5 py-4">{props.question}</h1>
                {show==false?
                <IoAdd className="my-auto mr-5" fontSize='2rem'></IoAdd>:<GrSubtract className="my-auto mr-5" color="white" fontSize='2rem'></GrSubtract>
}
            </div>
            {show&&<div>
                <h2 className="bg-white text-black px-5 py-2">{props.answer}</h2>
            </div>
}
        </div>
    )
}
export default Question;