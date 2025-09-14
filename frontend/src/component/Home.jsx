import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import axios from 'axios'
import { baseurl } from '../main'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [event, setEvent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getAllEvent = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${baseurl}/event/getAllEvent`, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      });
      setEvent(response.data.events);
    } catch (error) {
      console.log("error", error);
      setError("Failed to fetch events");
    } finally {
      setLoading(false);
    }
  };
 const navigate=useNavigate();
  const handleBooking = async (eventId) => {
    // try {
    //   const res = await axios.post(`${baseurl}/event/bookEvent`, 
    //     { eventId }, 
    //     {
    //       headers: {
    //         "Content-Type": "application/json"
    //       },
    //       withCredentials: true
    //     }
    //   );
    //   console.log("Booking successful:", res.data);
      
    // } catch (error) {
    //   console.log("Booking error:", error);
      
    // }
    navigate(`/booking/${eventId}`)
  };

  useEffect(() => {
    getAllEvent();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="text-xl text-gray-600">Loading events...</div>
    </div>;
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="text-xl text-red-600">Error: {error}</div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
    
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white py-16 px-5 text-center">
        <h1 className="text-5xl font-bold mb-5">
          Welcome to EventHub
        </h1>
        <p className="text-xl mb-2 opacity-90">
          Discover Amazing Events Near You
        </p>
        <p className="text-base opacity-80">
          Book your favorite events with just one click • Secure • Fast • Easy
        </p>
      </div>

   
      <div className="py-10 px-5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-4xl font-semibold text-gray-800 mb-10">
            All Events
          </h2>
          
          {event.length === 0 ? (
            <div className="text-center py-16 px-5 bg-white rounded-xl shadow-md">
              <h3 className="text-gray-600 text-xl mb-3">No events available</h3>
              <p className="text-gray-400">Check back later for exciting events!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-2">
              {event.map((singleEvent, index) => (
                <div 
                  key={singleEvent._id || index} 
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-200 cursor-pointer"
                >
                  <div className="mb-5">
                    <h3 className="text-gray-800 text-xl font-semibold mb-4">
                      {singleEvent.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {singleEvent.description}
                    </p>
                    <div className="flex items-center mb-5">
                      <span className="bg-blue-50 text-blue-600 px-3 py-2 rounded-full text-sm font-medium">
                        📍 {singleEvent.location}
                      </span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => handleBooking(singleEvent._id)}
                    className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 px-5 rounded-lg text-base font-semibold hover:scale-105 hover:shadow-lg transition-all duration-300"
                  >
                    Book Event 🎟️
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;