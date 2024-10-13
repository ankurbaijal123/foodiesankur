import React from "react";
import { Link } from "react-router-dom";

const isPDF = (url) => {
    return /\.pdf$/i.test(url);
  };
const Article = (props)=>{
    console.log(props, "90900909")
    return(
        <div className="pt-6">
            <Link to={`/all_blogs/${props.link}`} className="flex ">
            {
              isPDF(props.img)?(<iframe
        src={props.img} // Assuming imageData contains the PDF URL
        className=" rounded-lg" 
        style={{height:'18rem'}}
        title={props.title}
      >
        This browser does not support PDFs. Please download the PDF to view it: <a href={props.img}>Download PDF</a>
      </iframe>):
           <img src={props.img} className=" rounded-lg" style={{height:'18rem'}}></img>}
                
                <div className="ml-10">
                    <div className="font-semibold" style={{fontSize:'1.3rem'}}>{props.title}</div>
                    <div className="mt-3 text-gray-500" style={{fontSize:'1.1rem'}}>{props.bio}</div>
                </div>
            </Link>
        </div>
    )
}
export default Article;