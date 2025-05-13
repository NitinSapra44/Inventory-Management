import React from "react";
import { useNavigate } from "react-router-dom";

function AddPartyCard() {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate("/customer/add");
      }}
      class=" flex items-center cursor-pointer justify-center w-64 h-20 p-6 bg-white border border-gray-200 rounded-lg shadow-sm"
    >
      <div className="flex flex-col items-center ">
        <h4 className="text-2xl">+</h4>
        <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 ">
          Add a Party
        </h5>
      </div>
    </div>
  );
}

export default AddPartyCard;
