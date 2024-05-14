import React, { useState, useEffect } from "react";
import "./PaymentPage.css"; // Import your CSS file for styling
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PaymentPage = () => {
  const [currentBalance, setCurrentBalance] = useState(0);
  const [paymentLogs, setPaymentLogs] = useState([]);
  const [addAmount, setAddAmount] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const [paymentError, setPaymentError] = useState(null);

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    // Fetch current balance and payment logs from backend API
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      // Fetch current balance
      const balanceResponse = await fetch(
        "http://localhost:8531/payments/balance",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const balanceData = await balanceResponse.json();
      setCurrentBalance(balanceData.balance);

      // Fetch payment logs
      const logsResponse = await fetch("http://localhost:8531/payments/logs", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const logsData = await logsResponse.json();
      setPaymentLogs(logsData.logs);
    } catch (error) {
      console.error("Error fetching payments:", error);
    }
  };

  const handleAddAmount = () => {
    setIsAdding(true);
  };

  const handleConfirmAdd = async () => {
    try {
      if (!stripe || !elements) {
        return;
      }

      const cardElement = elements.getElement(CardElement);
      console.log("card", cardElement);
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (error) {
        setPaymentError(error.message);
        return;
      }

      // Parse the input value to an integer
      const amountToAdd = parseInt(addAmount);

      // Send paymentMethod.id and amount to backend API for further processing
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8531/payments/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: amountToAdd,
          paymentMethodId: paymentMethod.id,
        }),
      });
      const data = await response.json();
      // Update current balance and payment logs
      setCurrentBalance(data.balance);
      setPaymentLogs(data.logs);
      // Reset addAmount and isAdding state
      setAddAmount(0);
      setIsAdding(false);
    } catch (error) {
      console.error("Error adding money:", error);
      setPaymentError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="payment-page">
      <h2>Current Balance: ₹{currentBalance}</h2>
      <Elements stripe={stripePromise}>
        <div className="add-money">
          <input
            type="number"
            value={addAmount}
            onChange={(e) => setAddAmount(e.target.value)}
            placeholder="Enter amount to add"
          />
          <CardElement />
          <button onClick={handleAddAmount}>Add Money</button>
        </div>

        {isAdding && (
          <div className="confirm-add">
            <p>Are you sure you want to add ₹{addAmount} to your account?</p>
            <button onClick={handleConfirmAdd}>Confirm</button>
            <button onClick={() => setIsAdding(false)}>Cancel</button>
          </div>
        )}
        {paymentError && <div className="error">{paymentError}</div>}
      </Elements>

      <div className="payment-logs">
        <h3>Payment Logs</h3>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Description</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {paymentLogs.map((log, index) => (
              <tr key={index}>
                <td>{new Date(log.createdAt).toLocaleDateString()}</td>
                <td>₹{log.amount}</td>
                <td>{log.description}</td>
                <td>{log.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const PaymentPageWithStripe = () => (
  <Elements stripe={stripePromise}>
    <PaymentPage />
  </Elements>
);

export default PaymentPageWithStripe;
