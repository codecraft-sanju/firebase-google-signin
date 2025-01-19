import React, { useState, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { auth } from '../services/firebase';
import { useNavigate } from 'react-router-dom';

const Prediction = () => {
  const [events, setEvents] = useState([
    { id: 1, name: 'Match 1: Team A vs Team B', options: ['Team A', 'Team B'] },
    { id: 2, name: 'Match 2: Team C vs Team D', options: ['Team C', 'Team D'] },
  ]);
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const [paymentStatus, setPaymentStatus] = useState(false); // To handle payment status
  const [selectedPrediction, setSelectedPrediction] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state for payment

  // Razorpay Key
  const isTestMode = false; // Set true for Test Mode, false for Live Mode
  const razorpayKey = isTestMode
    ? 'rzp_test_zIqlGLC73lm55u' // Test Key ID
    : 'rzp_live_xOxn12n7w9kPuo'; // Live Key ID

  // Payment Initiation Function
  const initiatePayment = (finalPayment, eventId, choice) => {
    setLoading(true); // Set loading when payment starts

    const options = {
      key: razorpayKey,
      amount: finalPayment * 100, // Amount in paise (20 INR = 2000 paise)
      currency: 'INR',
      name: 'Prediction Game',
      description: `Prediction for event ${eventId}`,
      image: 'https://your_logo_url.com', // Optional logo
      handler: function (response) {
        setPaymentStatus(true);
        setLoading(false); // Stop loading when payment is complete
        alert(`Payment Successful for Event ${eventId}, Prediction: ${choice}`);
        console.log('Payment ID:', response.razorpay_payment_id);
        setSelectedPrediction({ eventId, choice });
      },
      modal: {
        escape: true, // Allow users to cancel the payment process by escaping the modal
        ondismiss: function () {
          setLoading(false); // Stop loading when the payment modal is dismissed (canceled)
          alert('Payment canceled by user');
        },
      },
      prefill: {
        name: auth.currentUser?.displayName || 'Guest User',
        email: auth.currentUser?.email || 'guest@example.com',
        contact: '9999999999', // You can update this if you want to fetch contact
      },
      theme: {
        color: '#F37254', // Customize the button color
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handlePrediction = () => {
    if (!paymentStatus) {
      alert('Please make a payment to submit your prediction.');
      return;
    }

    alert(
      `Prediction submitted: Event ${selectedPrediction.eventId}, Choice: ${selectedPrediction.choice}`,
    );
    // Save the prediction to Firebase Firestore or other storage
    // Further logic like deducting balance from the user's account can be implemented here.
  };

  return (
    <div
      className={`p-6 min-h-screen ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
      }`}
    >
      <h1 className="mb-6 text-4xl font-bold text-center">
        Predict the Outcome (₹20 to Play)
      </h1>

      {/* User Balance Info */}
      <div className="mb-6 text-center">
        <h2 className="text-xl font-medium">
          Current Balance: ₹{auth.currentUser?.balance || 0}
        </h2>
        <p className="text-sm text-gray-500">
          Make a ₹20 prediction to win rewards!
        </p>
      </div>

      {/* Event Prediction Section */}
      {events.map((event) => (
        <div
          key={event.id}
          className={`p-6 mb-6 rounded-lg shadow-lg transition-all duration-300 ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <h2 className="mb-4 text-2xl font-semibold text-center">
            {event.name}
          </h2>
          <div className="flex justify-center space-x-4">
            {event.options.map((option) => (
              <button
                key={option}
                onClick={() => {
                  setSelectedPrediction({ eventId: event.id, choice: option });
                  initiatePayment(20, event.id, option); // Initiate ₹20 payment
                }}
                className={`px-8 py-3 rounded-lg shadow-md transition duration-300 ease-in-out ${
                  theme === 'dark'
                    ? 'bg-green-700 hover:bg-green-800 text-white'
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* Loading Spinner when payment is being processed */}
      {loading && (
        <div className="flex items-center justify-center mt-6">
          <div className="w-16 h-16 border-t-4 border-blue-600 rounded-full animate-spin"></div>
          <p className="ml-4 text-lg text-gray-600">Processing payment...</p>
        </div>
      )}

      {/* Submit Prediction Button */}
      {!loading && paymentStatus && (
        <div className="mt-6 text-center">
          <button
            onClick={handlePrediction}
            className="w-full px-6 py-3 text-white transition duration-300 bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Submit Your Prediction
          </button>
        </div>
      )}
    </div>
  );
};

export default Prediction;

