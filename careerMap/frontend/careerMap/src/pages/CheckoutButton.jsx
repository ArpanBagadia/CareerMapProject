// frontend/pages/CheckoutButton.jsx
import { loadStripe } from '@stripe/stripe-js';
import { useEffect } from 'react';
import axios from 'axios';

const stripePromise = loadStripe("pk_test_51RbfCAPJR8i3AEwYdoQU6DL0H7Ff9Z9ZUR7QaWJP9Y76Do1gqDVZ6qYGoHrgdnz4DblKZHediFlGIIc3hdPntA2w00nfQ7V63J");

const CheckoutButton = ({ course }) => {
    const handleCheckout = async () => {
        const stripe = await stripePromise;
        const res = await axios.post('http://localhost:5000/api/create-checkout-session', { course });
        console.log(res)

        await stripe.redirectToCheckout({ sessionId: res.data.id });
    };

    return (
        <button
            onClick={handleCheckout}
            className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
            Buy Now
        </button>
    );
};

export default CheckoutButton;
