import React, { useState } from "react";
import axios from "axios";

function Daybook() {
  const [initialDate, setInitialDate] = useState("");
  const [finalDate, setFinalDate] = useState("");
  const [transactions, setTransactions] = useState([]);

  const handleSubmit = async () => {
    try {
      const response = await axios.post("https://inventory-management-backend-xdly.onrender.com/daybook", {
        startDate: initialDate,
        endDate: finalDate,
      });
      setTransactions(response.data.transactions);
    } catch (error) {
      console.error("Failed to fetch transactions", error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-full p-4 gap-6">
      {/* Filters Section */}
      <div className="flex flex-col items-start w-full lg:w-1/4 space-y-4">
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Initial Date
          </label>
          <input
            type="date"
            value={initialDate}
            onChange={(e) => setInitialDate(e.target.value)}
            className="w-full border border-gray-300 rounded-xl p-2 px-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
          />
        </div>
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Final Date
          </label>
          <input
            type="date"
            value={finalDate}
            onChange={(e) => setFinalDate(e.target.value)}
            className="w-full border border-gray-300 rounded-xl p-2 px-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
          />
        </div>
        <button
          className="bg-red-600 p-2 w-full rounded-xl text-white font-semibold"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>

      {/* Table Section */}
      <div className="w-full overflow-x-auto">
        <table className="min-w-full border text-sm sm:text-base">
          <thead>
            <tr className="bg-gray-200 text-gray-800">
              <th className="border p-2 whitespace-nowrap">Photo</th>
              <th className="border p-2 whitespace-nowrap">Party Name</th>
              <th className="border p-2 whitespace-nowrap">Type</th>
              <th className="border p-2 whitespace-nowrap">Size</th>
              <th className="border p-2 whitespace-nowrap">Special Name</th>
              <th className="border p-2 whitespace-nowrap">Quantity</th>
              <th className="border p-2 whitespace-nowrap">Operation</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn, index) => (
              <tr key={index} className="text-center hover:bg-gray-100">
                <td className="border p-2">
                  <img
                    src={
                      txn.productId?.photos?.[0]
                        ? txn.productId.photos[0]
                        : "/default.png"
                    }
                    alt="Product"
                    className="w-24 h-24 object-cover mx-auto rounded"
                  />
                </td>
                <td className="border p-2">{txn.productId.partyName}</td>
                <td className="border p-2">{txn.productId.type}</td>
                <td className="border p-2">{txn.productId.size}</td>
                <td className="border p-2">{txn.productId.specialName}</td>
                <td className="border p-2">{txn.quantity}</td>
                <td className="border p-2">{txn.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Daybook;
