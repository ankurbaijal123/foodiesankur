import { useEffect, useState } from "react"

const Yo =() =>{

    const [dataa, SetData] = useState([])
    useEffect(() =>{
        fetchdata();
    },[]

    )


const fetchdata = async () =>{
    const d = await fetch("https://fakestoreapi.com/products")
    const dat = await d.json();
    console.log(dat)
    SetData(dat)
}


return(
    <>
    <h1> Items Available</h1>
    <ul>
    
    {dataa.map((res, index) =>(
        <li key={index.id}>{res.title} -- {res.price} Rs.</li>)
    )
    }
    </ul>
    </>
)
}

export default Yo;
