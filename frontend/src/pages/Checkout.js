import { useLocation } from "react-router-dom";
import { useState } from "react";
import SummaryApi from "../common";

const Checkout = () => {
  const location = useLocation();
  const product = location.state?.product;

  const [selectedSize, setSelectedSize] = useState(null);
  const [address, setAddress] = useState("");

  if (!product) return <h2>No product selected</h2>;

  const handlePayment = async () => {
    if (!selectedSize) {
      alert("Select size");
      return;
    }

    if (!address) {
      alert("Enter address");
      return;
    }

   const res = await fetch(SummaryApi.createOrder.url, {
  method: SummaryApi.createOrder.method,
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    amount: product.sellingPrice,
  }),
});

const data = await res.json();
console.log("res order :", data);

    console.log("res order :", res);


    const options = {
      key: "rzp_test_SbqOG2TsjgzOL8", // 👉 put your key
      amount: data.amount,
      currency: "INR",
      name: "ECART",
      order_id: data.id,
      handler: function (response) {
        alert("Payment Success");
        console.log(response);
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Checkout</h1>

      {/* Product */}
      <div className="border p-4 rounded">
        <img src={product.productImage[0]} className="w-32" />
        <h2>{product.productName}</h2>
        <p>₹{product.sellingPrice}</p>
      </div>

      {/* Size */}
      <div className="mt-4">
        <p>Select Size</p>
        {[26, 28, 30, 32, 34].map((size) => (
          <button
            key={size}
            onClick={() => setSelectedSize(size)}
            className={`border px-3 py-1 m-1 ${selectedSize === size ? "bg-black text-white" : ""}`}
          >
            {size}
          </button>
        ))}
      </div>

      {/* Address */}
      <div className="mt-4">
        <p>Enter Address</p>
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border w-full p-2"
        />
      </div>

      {/* Button */}
      <button
        onClick={handlePayment}
        className="bg-purple-600 text-white w-full mt-4 py-2"
      >
        Continue
      </button>
    </div>
  );
};

export default Checkout;
