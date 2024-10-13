import React, { useState, useEffect } from 'react';
import noteContext from './noteContext';
import axiosClient from '../../components/AxiosClient';
import { useNavigate } from 'react-router-dom';
const NoteState = (props) => {
    const [pin, setPin] = useState('');
    const navigate = useNavigate();
    const checkTokenExpiry = async () => {
        const adminToken = localStorage.getItem('token');
        if (!adminToken) {
            navigate("/signin")
        }

        try {
            const response = await axiosClient.post('/auth/token_expiry_check', null, {
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                },
            });

            if (response.data.code !== 200) {
                navigate("/signin")
            }
        } catch (error) {
            navigate("/signin")
        }
    };

    useEffect(() => {
        const handleUnload = () => {
            localStorage.removeItem('PIN');
        };

        window.addEventListener('beforeunload', handleUnload);

        return () => {
            window.removeEventListener('beforeunload', handleUnload);
        };
    }, []);

    return (
        <noteContext.Provider value={{ pin, setPin, checkTokenExpiry }}>
            {props.children}
        </noteContext.Provider>
    );
};

export default NoteState;
