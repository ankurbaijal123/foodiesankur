import React, { useState, useEffect } from "react";
import Question from "../components/Question";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from 'axios';
import axiosClient from "../components/AxiosClient";

const Faq = () => {
    const [faqs, setFaqs] = useState([]);

    useEffect(() => {
        const fetchFaqs = async () => {
            try {
                const response = await axiosClient.post('/faq/get_all_faq',null);

                if (response.data.code === 200) {
                    setFaqs(response.data.data[0]);
                }
            } catch (error) {
                console.error('Error fetching FAQs:', error);
            }
        };

        fetchFaqs();
    }, []);


    return (
        <>
            <Navbar />
            <div className="mx-20 my-10 py-5">
                <div className="text-2xl" style={{ textAlign: "center" }}>FAQ</div>
          
                {faqs.map((faq, index) => (
           <Question key={index} question={faq.question} answer={faq.answer} />
                  
              
                   
                ))}
            </div>
            <Footer />
        </>
    );
}

export default Faq;
