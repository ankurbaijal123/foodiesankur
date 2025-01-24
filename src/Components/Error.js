import {useRouteError} from "react-router"
const Error = () =>{
    const err = useRouteError();
    //It gives more detail about error
    console.log(err);
return(
        <>
        <h1>Opps !!</h1>
        <h2>This page is not there 🥺</h2>
        <h3>{err.data}</h3>
        </>
    );
};
export default Error