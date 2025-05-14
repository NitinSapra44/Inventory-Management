import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AddPartyCard from "../components/AddPartyCard.jsx";

function CustomerPage() {
  const [customer, setCustomer] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://inventory-management-backend-xdly.onrender.com/customer/find-customer")
      .then((response) => {
        setCustomer(response.data);
      });
  }, []);

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {customer.length > 0 &&
          customer.map((cust, index) => (
            <div
              onClick={() => {
                navigate(`/customers/${cust._id}`);
              }}
              key={index}
              className="flex items-center justify-center w-64 h-20 p-6 bg-white border border-gray-200 rounded-lg shadow-sm cursor-pointer"
            >
              <h5 className="text-xl font-medium text-gray-900">{cust.Name}</h5>
            </div>
          ))}

        {/* Wrap AddPartyCard in same outer style */}
        <div className="w-64 h-20">
          <AddPartyCard />
        </div>
      </div>
    </div>
  );
}

export default CustomerPage;

// onClick={navigate(`/customer/${cust._id}`)}
