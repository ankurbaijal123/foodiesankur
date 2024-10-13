import React, { useEffect, useState ,useContext} from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosClient from '../components/AxiosClient';
import noteContext from '../context/notes/noteContext';
const Prescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const {checkTokenExpiry} = useContext(noteContext)
  useEffect(() => {
    const fetchPrescriptions = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Token not found');
        return;
      }
      checkTokenExpiry();
      try {
        const response = await axiosClient.post('/users/prescriptions', null, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

        console.log(response)

        if (response.status==200) {
          const data = await response.data?.data?.flat()?.map(item => ({ image: item.image, id: item._id })) || [];
          console.log('Prescriptions:', data.data);
          setPrescriptions(data);
        } else {
          // const errorBody = await response.data();
          console.error('Failed to fetch prescriptions:');
          toast.error('Failed to fetch prescriptions');
        }
      } catch (error) {
        console.error('Error fetching prescriptions:', error);
        toast.error('Error fetching prescriptions');
      }
    };

    fetchPrescriptions();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Prescriptions</h1>
        {console.log(prescriptions, "0--0-00-0-")}
        {prescriptions.length>0?(
          <div>
            {/* Render prescriptions */}
            {prescriptions.map((image,index) => (
              
              <div key={index} className="mb-4">
                {console.log(image, index)}
                <p>{image.id}</p>
                <img src={image.image}/>
              </div>
            ))}
          </div>
        ) : (
          <p>You don't have any uploaded prescriptions yet.</p>
        )}
      </div>
      <ToastContainer />
      <Footer />
    </>
  );
};

export default Prescriptions;
