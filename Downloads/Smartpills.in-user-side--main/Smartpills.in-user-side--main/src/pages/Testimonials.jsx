import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../components/AxiosClient';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axiosClient.post('/testimonial/get_all_testimonial', null);
        console.log('Testimonial API response:', response.data.data);
        setTestimonials(response.data.data[0]); // Ensure we access the correct nested array
        setLoading(false);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        setError('Failed to fetch testimonials');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const truncateResponse = (response) => {
    const words = response.split(' ');
    if (words.length > 30) {
      return words.slice(0, 30).join(' ') + '...';
    }
    return response;
  };

  const handleSeeMore = (id) => {
    navigate(`/testimonial/${id}`);
  };

  return (
    <div>
      <Navbar />
      <div>
        <h1 className='text-center text-3xl font-semibold py-4'>Testimonials</h1>
        {loading ? (
          <p>Loading testimonials...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : testimonials && testimonials.length > 0 ? (
          <div>
            {testimonials.map((testimonial) => (
              <div key={testimonial._id} className="mb-4 p-4 mx-4 border rounded">
                <p><strong>User:</strong> {testimonial.user}</p>
                <p><strong>Response:</strong> {truncateResponse(testimonial.response)}</p>
                <button
  className="text-white px-4 py-2 rounded mt-2 bg-gradient-to-r from-yellow-400 to-orange-500"
  onClick={() => handleSeeMore(testimonial._id)}
>
  See More
</button>

              </div>
            ))}
          </div>
        ) : (
          <p>No testimonials found.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Testimonials;
