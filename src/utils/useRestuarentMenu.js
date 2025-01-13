import {useEffect, useState} from "react";
import "../../index.css"
import { RES_URL } from "./constant";
const useRestuarentMenu = (resId) =>{
    const[resInfo, setResInfo] = useState(null)
    useEffect(() => {
        fetchmenu();
      }, []);
    
      const fetchmenu = async () => {
        const data = await fetch(RES_URL + resId);
        const menu = await data.json();
        setResInfo(menu.data)
      };

      return resInfo;
    
}
export default useRestuarentMenu;