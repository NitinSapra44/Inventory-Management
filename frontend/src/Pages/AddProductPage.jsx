import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddProductPage() {
  const navigate = useNavigate();

  //Using useRef for the square used for image input
  const fileInputRef = useRef(null);
  const handleClick = () => {
    fileInputRef.current.click();
  };

  //Defining States for form
  const [partyName, setPartyName] = useState("");
  const [type, setType] = useState("");
  const [size, setSize] = useState("");
  const [specialName, setSpecialName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [parties, setParties] = useState([]);

  //This useEffect will get Parties name from backend which will be used for names
  useEffect(() => {
    axios
      .get("http://localhost:5000/customer/find-customer")
      .then((response) => {
        setParties(response.data);
      });
  }, []);

  //This Function will handle image Upload and will render the uploaded pics here on our page before submitting
  async function handleImageChange(e) {
    e.preventDefault();
    const file = e.target.files;
    const data = new FormData();

    for (let i = 0; i < file.length; i++) {
      data.append("photos", file[i]);
    }

    const response = await axios.post(
      "http://localhost:5000/product/photo-upload",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const newPhotos = response.data.fileNames;
    setImagePreviews((prev) => [...prev, ...newPhotos]);
  }

  //This Function will handle form submission
  async function handleFormSubmission(e) {
    try {
      e.preventDefault();
      const data = {
        partyName,
        type,
        size,
        specialName,
        quantity,
        photos: imagePreviews,
      };
      const response = await axios.post(
        "http://localhost:5000/product/add-product",
        data,
        {
          withCredentials: true,
        }
      );
      alert(response.data.message);
      navigate("/products");
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message || "Add Product failed");
      } else {
        alert("An error occurred. Please try again.");
      }
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <form
        onSubmit={handleFormSubmission}
        className="flex flex-col md:flex-row gap-6"
      >
        {/* Left: Image Upload Box */}
        <div className="w-full md:w-1/2">
          <div
            onClick={handleClick}
            className="aspect-square border-2 border-dashed border-gray-300 flex items-center justify-center rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer"
          >
            <span className="text-gray-400 text-3xl">+</span>
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              ref={fileInputRef}
              onChange={handleImageChange}
            />
          </div>
        </div>

        {/* Right: Text Fields */}
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <select
            className="border p-2 rounded-md"
            value={partyName}
            onChange={(e) => setPartyName(e.target.value)}
          >
            <option value="">Select Party</option>
            {parties.map((party) => (
              <option key={party._id} value={party.Name}>
                {party.Name}
              </option>
            ))}
          </select>
          <select
            className="border p-2 rounded-md"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">Select Type</option>
            <option value="Cover">Cover</option>
            <option value="Bottom">Bottom</option>
            <option value="Cover+Bottom">Cover+Bottom</option>
            <option value="Cartoon">Cartoon</option>
          </select>

          <input
            type="text"
            placeholder="Size"
            className="border p-2 rounded-md"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          />
          <input
            type="text"
            placeholder="Special Name"
            className="border p-2 rounded-md"
            value={specialName}
            onChange={(e) => setSpecialName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Quantity"
            className="border p-2 rounded-md"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
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
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Add Product
          </button>
        </div>
      </form>

      {/* Image Preview Section */}
      {imagePreviews.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Preview Images</h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
            {imagePreviews.map((img) => (
              <div className="w-full aspect-square rounded-lg overflow-hidden border">
                <img
                  src={"http://localhost:5000/uploads/" + img}
                  //   alt={`Preview ${index + 1}`}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default AddProductPage;
