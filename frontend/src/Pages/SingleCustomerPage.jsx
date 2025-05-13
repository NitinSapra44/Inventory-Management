import React from "react";
import AddProductCard from "../components/AddProductCard.jsx";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
function SingleCustomerPage() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const data = { id };

  useEffect(() => {
    axios
      .post("http://localhost:5000/customer/products", data)
      .then((response) => {
        setProducts(response.data);
        console.log(response.data);
      });
  }, []);

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {products?.length > 0 &&
        products.map((product) => (
          <div
            onClick={() => {
              navigate(`/product/${product._id}`);
            }}
            key={product._id}
            className="max-w-xs w-64 h-64 cursor-pointer bg-white mt-6 border border-gray-200 rounded-lg shadow-sm overflow-hidden dark:bg-gray-800 dark:border-gray-700"
          >
            <div>
              <img
                className="rounded-t-lg w-full h-32 object-cover"
                src={"http://localhost:5000/uploads/" + product.photos[0]}
                alt=""
              />
            </div>
            <div className="p-2 flex flex-row gap-4 items-center justify-between">
              {/* Left section */}
              <div className="flex-grow overflow-hidden">
                <h5 className="text-xl font-bold text-gray-900 dark:text-white truncate">
                  {product.partyName}
                </h5>
                <h5 className="text-xl font-bold text-gray-900 dark:text-white truncate">
                  {product.type}
                </h5>
                <h5 className="text-xl font-bold text-gray-900 dark:text-white truncate">
                  {product.size}
                </h5>
                <h5 className="text-xl font-bold text-gray-900 dark:text-white truncate">
                  {product.specialName}
                </h5>
              </div>

              {/* Right section (quantity badge) */}
              <div className="flex-shrink-0">
                <h5 className="text-sm border rounded-full px-2 py-1 text-white bg-red-600 font-bold text-center">
                  {product.quantity}
                </h5>
              </div>
            </div>
          </div>
        ))}

      {/* Add Product Card - Always at the End */}
      <AddProductCard />
    </div>
  );
}

export default SingleCustomerPage;
