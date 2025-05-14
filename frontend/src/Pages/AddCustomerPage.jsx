import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function AddCustomer() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [GSTIN, setGSTIN] = useState("");
  const [address, setAddress] = useState("");

  async function handleNewCustomer(e) {
    try {
      e.preventDefault();
      const data = {
        name,
        GSTIN,
        address,
      };
      const response = await axios.post(
        "https://inventory-management-backend-xdly.onrender.com/customer/addcustomer",
        data
      );
      alert(response.data.message || "Customer Successfully registered");
      navigate("/customers");
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message || "Customer Registeration Failed");
      } else {
        alert("An error occurred. Please try again.");
      }
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <form
        onSubmit={handleNewCustomer}
        className="flex flex-col md:flex-row gap-6"
      >
        {/* Right: Text Fields */}
        <div className="w-full  flex flex-col gap-4">
          <input
            type="text"
            placeholder="Customer Name"
            className=" w-full border p-2 rounded-md"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />

          <input
            type="text"
            placeholder="GSTIN"
            className=" w-full border p-2 rounded-md"
            value={GSTIN}
            onChange={(e) => {
              setGSTIN(e.target.value);
            }}
          />
          <textarea
            type="text"
            placeholder="Address"
            className=" w-full border p-2 rounded-md"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />

          {/* <label htmlFor="dropdown">Choose an option:</label>
    <select className="border p-2 rounded-md" id="dropdown">
      <option value="">-- Select --</option>
      <option value="apple">Apple</option>
      <option value="banana">Banana</option>
      <option value="mango">Mango</option>
    </select> */}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Add Customer
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddCustomer;
