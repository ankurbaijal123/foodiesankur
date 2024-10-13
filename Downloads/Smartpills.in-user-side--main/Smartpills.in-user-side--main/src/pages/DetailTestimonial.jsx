import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosClient from '../components/AxiosClient';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const TestimonialDetail = () => {
  const { id } = useParams();
  const [testimonial, setTestimonial] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestimonial = async () => {
      setLoading(true);
      setError(null);

      try {
        const formData = new FormData();
        formData.append('id', id);

        const response = await axiosClient.post('/testimonial/get_testimonial', formData);
        console.log('Single Testimonial API response:', response.data.data);
        setTestimonial(response.data.data[0]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching testimonial:', error);
        setError('Failed to fetch testimonial');
        setLoading(false);
      }
    };

    fetchTestimonial();
  }, [id]);

  const extractYouTubeVideoId = (url) => {
    const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|watch\?.+&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-8">
        {loading ? (
          <p>Loading testimonial...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : testimonial ? (
          <div className="p-4 border rounded">
            <h1 className="text-3xl font-semibold mb-4">Testimonial Detail</h1>
            <p><strong>User:</strong> {testimonial.user}</p>
            <p><strong>Response:</strong> {testimonial.response}</p>
            {testimonial.link && (
              <div className="mt-4">
                <p><strong>Video:</strong></p>
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${extractYouTubeVideoId(testimonial.link)}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="YouTube video"
                  ></iframe>
                </div>
              </div>
            )}
          </div>
        ) : (
          <p>Testimonial not found.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default TestimonialDetail;
