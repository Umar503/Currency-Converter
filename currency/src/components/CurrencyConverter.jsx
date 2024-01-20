import React, { useState, useEffect } from "react";

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [exchangeRate, setExchangeRate] = useState(null);
  const [convertedAmount, setConvertedAmount] = useState(null);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await fetch(
          `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
        );
        const data = await response.json();
        setExchangeRate(data.rates[toCurrency]);
      } catch (error) {
        console.error("Error fetching exchange rate:", error);
      }
    };

    fetchExchangeRate();
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    if (exchangeRate !== null) {
      setConvertedAmount((amount * exchangeRate).toFixed(2));
    }
  }, [amount, exchangeRate]);

  const handleAmountChange = (e) => {
    const inputAmount = parseFloat(e.target.value) || 0;
    setAmount(inputAmount);
  };

  return (
    <div className="container mx-auto mt-8 text-center">
      <h1 className="text-3xl font-semibold mb-4">Currency Converter</h1>

      <div className="flex justify-center items-center space-x-2 mb-4">
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={handleAmountChange}
          className="border p-2"
        />
      </div>

      <div className="flex justify-center items-center space-x-2 mb-4">
        <label htmlFor="fromCurrency">From Currency:</label>
        <select
          id="fromCurrency"
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
          className="border p-2"
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </select>
      </div>

      <div className="flex justify-center items-center space-x-2 mb-4">
        <label htmlFor="toCurrency">To Currency:</label>
        <select
          id="toCurrency"
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
          className="border p-2"
        >
          <option value="EUR">EUR</option>
          <option value="USD">USD</option>
        </select>
      </div>

      {exchangeRate !== null && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Converted Amount:</h2>
          <div className="border p-4 inline-block">
            {convertedAmount} {toCurrency}
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrencyConverter;
