import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

function ToDoJobs() {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    axios
      .get("https://inventory-management-backend-xdly.onrender.com/product/find-products-ready-to-print")
      .then((res) => {
        setProduct(res.data);
        console.log(res.data);
      });
  }, []);

  return (
    <div className="flex-1 bg-white p-4 overflow-auto">
      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm sm:text-base">
          <thead>
            <tr className="bg-gray-200 text-gray-800">
              <th className="border p-2 whitespace-nowrap">Photo</th>
              <th className="border p-2 whitespace-nowrap">Party Name</th>
              <th className="border p-2 whitespace-nowrap">Type</th>
              <th className="border p-2 whitespace-nowrap">Size</th>
              <th className="border p-2 whitespace-nowrap">Special Name</th>
              <th className="border p-2 whitespace-nowrap">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {product.map((txn, index) => (
              <tr
                key={index}
                className="text-center hover:bg-gray-100 transition"
              >
                <td className="border p-2">
                  <img
                    src={
                      txn.photos && txn.photos[0]
                        ? txn.photos[0]
                        : "/default.png"
                    }
                    alt="Product"
                    className="w-24 h-24 object-cover rounded mx-auto"
                  />
                </td>
                <td className="border p-2">{txn.partyName}</td>
                <td className="border p-2">{txn.type}</td>
                <td className="border p-2">{txn.size}</td>
                <td className="border p-2">{txn.specialName}</td>
                <td className="border p-2">{txn.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ToDoJobs;
