import React from "react";
import AddProductCard from "../components/AddProductCard.jsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ProductPage() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/product/find-products")
      .then((response) => {
        setProducts(response.data);
        console.log(response.data);
      });
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {products?.length > 0 &&
        products.map((product) => (
          <div
            onClick={() => navigate(`/product/${product._id}`)}
            key={product._id}
            className="cursor-pointer bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 transition hover:shadow-md"
          >
            <div>
              <img
                className="rounded-t-lg w-full h-40 sm:h-32 object-cover"
                src={"http://localhost:5000/uploads/" + product.photos[0]}
                alt=""
              />
            </div>
            <div className="p-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              {/* Text Info */}
              <div className="flex-grow overflow-hidden">
                <h5 className="text-base font-semibold text-gray-900 dark:text-white truncate">
                  {product.partyName}
                </h5>
                <p className="text-sm text-gray-700 dark:text-gray-300 truncate">
                  {product.type} - {product.size}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300 truncate">
                  {product.specialName}
                </p>
              </div>

              {/* Quantity Badge */}
              <div className="flex-shrink-0">
                <span className="text-sm border rounded-full px-3 py-1 text-white bg-red-600 font-bold text-center inline-block">
                  {product.quantity}
                </span>
              </div>
            </div>
          </div>
        ))}

      {/* Add Product Card */}
      <AddProductCard />
    </div>
  );
}

export default ProductPage;
