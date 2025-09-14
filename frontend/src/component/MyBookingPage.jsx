import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { baseurl } from '../main'

const MyBookingPage = () => {
  const [booking, setBooking] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cancellingId, setCancellingId] = useState(null);

  const myBooking = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${baseurl}/event/mybooking`, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      });
      console.log(res.data.myEvents)
      setBooking(res.data.myEvents);
    } catch (error) {
      console.log("Error fetching bookings:", error);
      setError("Failed to fetch your bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    myBooking();
  }, []);

  const cancel = async (eventId) => {
    setCancellingId(eventId);
    try {
      const res = await axios.post(`${baseurl}/event/cancelBooking`, 
        { eventId }, 
        {
          headers: {
            "Content-Type": "application/json"
          },
          withCredentials: true
        }
      );
      console.log("Booking cancelled:", res.data);

      
      setBooking(prevBookings => prevBookings.filter(event => event._id !== eventId));
    } catch (error) {
      console.log("Cancellation error:", error);
      setError("Failed to cancel booking");
    } finally {
      setCancellingId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <div className="text-xl text-gray-600">Loading your bookings...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-xl shadow-md">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <div className="text-xl text-red-600 mb-4">Error: {error}</div>
          <button 
            onClick={() => myBooking()}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-12 px-5">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-3">My Bookings</h1>
          <p className="text-lg opacity-90">
            Manage your event bookings • View details • Cancel if needed
          </p>
        </div>
      </div>

      {/* Bookings Section */}
      <div className="py-10 px-5">
        <div className="max-w-6xl mx-auto">
          {booking.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl shadow-md">
              <div className="text-6xl mb-4">📅</div>
              <h3 className="text-gray-600 text-2xl mb-4">No bookings found</h3>
              <p className="text-gray-500 mb-6">You haven't booked any events yet.</p>
              <button 
                onClick={() => window.location.href = '/'}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:scale-105 transition-all duration-300"
              >
                Browse Events
              </button>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">
                  Your Booked Events ({booking.length})
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {booking.map((event, index) => (
                  <div 
                    key={event._id || index} 
                    className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 overflow-hidden"
                  >
                    {/* Status Badge */}
                    <div className="bg-green-50 px-4 py-2 border-b border-green-200">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        ✅ Booked
                      </span>
                    </div>

                    {/* Event Details */}
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-800 mb-3">
                        {event.eventId.title}
                      </h3>
                      
                      <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
                        {event.eventId.description}
                      </p>
                      
                      <div className="space-y-2 mb-6">
                        <div className="flex items-center text-gray-600">
                          <span className="text-lg mr-2">📍</span>
                          <span className="font-medium">{event.eventId.location}</span>
                        </div>
                        
                        {event.eventId.date && (
                          <div className="flex items-center text-gray-600">
                            <span className="text-lg mr-2">📅</span>
                            <span>{new Date(event.eventId.date).toLocaleDateString()}</span>
                          </div>
                        )}
                        
                       
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col gap-3">
                        <button className="w-full bg-blue-50 text-blue-600 py-2 px-4 rounded-lg font-medium hover:bg-blue-100 transition-colors">
                          View Details
                        </button>
                        
                        <button 
                          onClick={() => cancel(event.eventId._id)}
                          disabled={cancellingId === event.eventId._id}
                          className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-300 ${
                            cancellingId === event._id
                              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                              : 'bg-red-50 text-red-600 hover:bg-red-100 hover:scale-105'
                          }`}
                        >
                          {cancellingId === event._id ? (
                            <span className="flex items-center justify-center">
                              <div className="animate-spin rounded-full h-4 w-4 border-2 border-red-500 border-t-transparent mr-2"></div>
                              Cancelling...
                            </span>
                          ) : (
                            '🗑️ Cancel Booking'
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBookingPage;