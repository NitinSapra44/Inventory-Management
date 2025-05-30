import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function ImageSlider() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [product, setProduct] = useState(null);
  const [printQuantity, setPrintQuantity] = useState("");
  const [dispatchQuantity, setDispatchQuantity] = useState("");
  const [relatedBottoms, setRelatedBottoms] = useState([]);

  const fetchProduct = () => {
    axios
      .post("https://inventory-management-backend-xdly.onrender.com/product/find-product-by-id", { id })
      .then((response) => {
        if (response.data.cover) {
          setProduct(response.data.cover);
          setRelatedBottoms(response.data.bottom);
        } else {
          setProduct(response.data);
          setRelatedBottoms([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
      });
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const goToPrevious = () => {
    const isFirst = currentIndex === 0;
    setCurrentIndex(isFirst ? product.photos.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    const isLast = currentIndex === product.photos.length - 1;
    setCurrentIndex(isLast ? 0 : currentIndex + 1);
  };

  async function setPrintTransaction(ev) {
    ev.preventDefault();
    const printData = { productId: id, type: "print", quantity: printQuantity };
    await axios.post("https://inventory-management-backend-xdly.onrender.com/transaction", printData);
    setPrintQuantity("");
    fetchProduct();
  }

  async function setDispatchTransaction(ev) {
    ev.preventDefault();
    const dispatchData = { productId: id, type: "dispatch", quantity: dispatchQuantity };
    await axios.post("https://inventory-management-backend-xdly.onrender.com/transaction", dispatchData);
    setDispatchQuantity("");
    fetchProduct();
  }

  if (!product || !product.photos) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex flex-col md:flex-row max-w-7xl mx-auto p-4 gap-6">
        {/* Left: Image Slider */}
        <div className="w-full md:w-1/2 mb-6 md:mb-0">
          <div className="relative w-full h-[400px] md:h-[500px]">
            <img
              src={product.photos[currentIndex]}
              className="w-full h-full max-h-[500px] object-contain rounded"
              alt={`Slide ${currentIndex}`}
            />

            <button
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
            >
              &#8592;
            </button>
            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
            >
              &#8594;
            </button>

            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {product.photos.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-3 h-3 rounded-full ${
                    currentIndex === idx ? "bg-white" : "bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="w-full md:w-1/2 flex flex-col justify-start">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Party Name: {product.partyName}
          </h2>
          <p className="text-xl md:text-2xl font-bold mb-2">Type: {product.type}</p>
          <p className="text-xl md:text-2xl font-bold mb-2">Size: {product.size}</p>
          <p className="text-xl md:text-2xl font-bold mb-2">Special Name: {product.specialName}</p>
          <p className="text-xl md:text-2xl font-bold mb-2">Quantity: {product.quantity}</p>

          <div className="flex flex-col sm:flex-row gap-2 justify-start mt-5">
            <input
              type="text"
              className="p-3 border w-full sm:w-80"
              placeholder="Enter Quantity to be printed"
              value={printQuantity}
              onChange={(e) => setPrintQuantity(e.target.value)}
            />
            <button
              onClick={setPrintTransaction}
              type="submit"
              className="bg-red-600 text-white p-2"
            >
              Print
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 justify-start mt-5">
            <input
              type="text"
              className="p-3 border w-full sm:w-80"
              placeholder="Enter Quantity to be dispatched"
              value={dispatchQuantity}
              onChange={(e) => setDispatchQuantity(e.target.value)}
            />
            <button
              onClick={setDispatchTransaction}
              type="submit"
              className="bg-red-600 text-white p-2"
            >
              Dispatch
            </button>
          </div>
        </div>
      </div>

      {/* Related Bottoms */}
      {product?.type === "Cover" && relatedBottoms.length > 0 && (
        <div className="mt-10 px-5">
          <h2 className="text-3xl font-bold mb-4">Related Bottoms</h2>
          <div className="flex flex-wrap gap-6">
            {relatedBottoms.map((bottom) => (
              <div
                onClick={() => navigate(`/product/${bottom._id}`)}
                key={bottom._id}
                className="max-w-xs w-64 h-64 cursor-pointer bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
              >
                <img
                  className="rounded-t-lg w-full h-32 object-cover"
                  src={bottom.photos[0]}
                  alt=""
                />
                <div className="p-2 flex flex-row gap-4 items-center justify-between">
                  <div className="flex-grow overflow-hidden">
                    <h5 className="text-lg font-bold text-gray-900 dark:text-white truncate">{bottom.partyName}</h5>
                    <h5 className="text-lg font-bold text-gray-900 dark:text-white truncate">{bottom.type}</h5>
                    <h5 className="text-lg font-bold text-gray-900 dark:text-white truncate">{bottom.size}</h5>
                    <h5 className="text-lg font-bold text-gray-900 dark:text-white truncate">{bottom.specialName}</h5>
                  </div>
                  <div className="flex-shrink-0">
                    <h5 className="text-sm border rounded-full px-2 py-1 text-white bg-red-600 font-bold text-center">
                      {bottom.quantity}
                    </h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
