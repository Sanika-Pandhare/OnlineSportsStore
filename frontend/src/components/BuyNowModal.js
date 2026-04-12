import React, { useState } from "react";

const BuyNowModal = ({ product, onClose, onConfirm }) => {

  const [selectedSize, setSelectedSize] = useState(null);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-end justify-center">

      <div className="bg-white w-full p-4 rounded-t-2xl">

        <div className="flex justify-between">
          <h2>Select Size</h2>
          <button onClick={onClose}>X</button>
        </div>

        <div className="flex gap-2 mt-3">
          {[26,28,30,32,34,36].map((size)=>(
            <button
              key={size}
              onClick={()=>setSelectedSize(size)}
              className={`border px-3 py-1 ${selectedSize === size ? "bg-black text-white" : ""}`}
            >
              {size}
            </button>
          ))}
        </div>

        <button
          onClick={()=>onConfirm(selectedSize)}
          disabled={!selectedSize}
          className="w-full mt-4 bg-purple-600 text-white py-2"
        >
          Buy Now
        </button>

      </div>
    </div>
  );
};

export default BuyNowModal;