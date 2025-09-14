import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { baseurl } from '../main'

const BookingPage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const getEventById = async () => {
    // console.log(eventId);
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${baseurl}/event/id/${eventId}`, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      });
      setEvent(response.data.event);
    } catch (error) {
      console.log("error", error);
      setError("Failed to fetch event details");
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async () => {
    setBookingLoading(true);
    try {
      const res = await axios.post(`${baseurl}/event/bookEvent`, 
        { eventId }, 
        {
          headers: {
            "Content-Type": "application/json"
          },
          withCredentials: true
        }
      );
      console.log("Booking successful:", res.data);
      setBookingSuccess(true);
      setShowPayment(false);
    } catch (error) {
      console.log("Booking error:", error);
      setError("Failed to book event");
    } finally {
      setBookingLoading(false);
    }
  };

  useEffect(() => {
    if (eventId) {
      getEventById();
    }
  }, [eventId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <div className="text-xl text-gray-600">Loading event details...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-xl shadow-md max-w-md">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <div className="text-xl text-red-600 mb-4">Error: {error}</div>
          <button 
            onClick={() => getEventById()}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-xl shadow-md">
          <div className="text-gray-500 text-6xl mb-4">📅</div>
          <div className="text-xl text-gray-600">Event not found</div>
        </div>
      </div>
    );
  }

  if (bookingSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-xl shadow-md max-w-md">
          <div className="text-green-500 text-6xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Booking Successful!</h2>
          <p className="text-gray-600 mb-6">Your event has been booked successfully.</p>
          <div className="space-y-3">
            <button 
              onClick={() => window.location.href = '/mybooking'}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              View My Bookings
            </button>
            <button 
              onClick={() => window.location.href = '/home'}
              className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Browse More Events
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-8 px-5">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold">Event Booking</h1>
          <p className="text-lg opacity-90">Complete your booking in just a few steps</p>
        </div>
      </div>

      {/* Event Details */}
      <div className="py-10 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Event Header */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 border-b">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{event.title}</h2>
              <p className="text-gray-600 text-lg leading-relaxed">{event.description}</p>
            </div>

            {/* Event Information */}
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">📍</span>
                    <div>
                      <p className="font-semibold text-gray-800">Venue</p>
                      <p className="text-gray-600">{event.venue}</p>
                    </div>
                  </div>
                  
                  {event.date && (
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">📅</span>
                      <div>
                        <p className="font-semibold text-gray-800">Date</p>
                        <p className="text-gray-600">{new Date(event.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  {event.time && (
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">⏰</span>
                      <div>
                        <p className="font-semibold text-gray-800">Time</p>
                        <p className="text-gray-600">{event.time}</p>
                      </div>
                    </div>
                  )}
                  
                  {event.price && (
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">💰</span>
                      <div>
                        <p className="font-semibold text-gray-800">Price</p>
                        <p className="text-gray-600">₹{event.price}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Payment Section */}
              {!showPayment ? (
                <div className="text-center">
                  <button
                    onClick={() => setShowPayment(true)}
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-4 px-8 rounded-lg text-lg font-semibold hover:scale-105 transform transition-all duration-300 shadow-lg"
                  >
                    Proceed to Book Event 🎟️
                  </button>
                </div>
              ) : (
                <div className="border-t pt-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Choose Payment Method
                  </h3>
                  
                  <div className="max-w-md mx-auto space-y-4 mb-8">
                    {/* Cash on Delivery Option */}
                    <div 
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        paymentMethod === 'cod' 
                          ? 'border-indigo-500 bg-indigo-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setPaymentMethod('cod')}
                    >
                      <div className="flex items-center">
                        <input 
                          type="radio" 
                          name="payment" 
                          value="cod"
                          checked={paymentMethod === 'cod'}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="mr-3 text-indigo-600"
                        />
                        <div className="flex-1">
                          <div className="flex items-center">
                            <span className="text-2xl mr-3">💵</span>
                            <div>
                              <p className="font-semibold text-gray-800">Cash on Delivery</p>
                              <p className="text-sm text-gray-600">Pay when you attend the event</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Online Payment Option */}
                    <div 
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        paymentMethod === 'online' 
                          ? 'border-indigo-500 bg-indigo-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setPaymentMethod('online')}
                    >
                      <div className="flex items-center">
                        <input 
                          type="radio" 
                          name="payment" 
                          value="online"
                          checked={paymentMethod === 'online'}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="mr-3 text-indigo-600"
                        />
                        <div className="flex-1">
                          <div className="flex items-center">
                            <span className="text-2xl mr-3">💳</span>
                            <div>
                              <p className="font-semibold text-gray-800">Online Payment</p>
                              <p className="text-sm text-gray-600">Pay securely with card/UPI</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Message */}
                  {paymentMethod === 'cod' && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                      <div className="flex items-start">
                        <span className="text-yellow-500 text-xl mr-3">ℹ️</span>
                        <div>
                          <p className="font-semibold text-yellow-800">Cash on Delivery Selected</p>
                          <p className="text-yellow-700 text-sm mt-1">
                            You will pay ₹{event.price || '0'} when you attend the event. 
                            Please bring exact change if possible.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'online' && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                      <div className="flex items-start">
                        <span className="text-blue-500 text-xl mr-3">🔒</span>
                        <div>
                          <p className="font-semibold text-blue-800">Secure Online Payment</p>
                          <p className="text-blue-700 text-sm mt-1">
                            Your payment of ₹{event.price || '0'} will be processed securely. 
                            We accept all major cards and UPI payments.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <button
                      onClick={() => setShowPayment(false)}
                      className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleBooking}
                      disabled={bookingLoading}
                      className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                        bookingLoading
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:scale-105 shadow-lg'
                      }`}
                    >
                      {bookingLoading ? (
                        <span className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                          Confirming...
                        </span>
                      ) : (
                        'Confirm Booking ✨'
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;