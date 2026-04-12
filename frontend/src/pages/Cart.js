import React, { useContext, useEffect, useState } from "react";
import SummaryApi from "../common";
import Context from "../context";
import displayINRCurrency from "../helpers/displayCurrency";
import { MdDelete } from "react-icons/md";

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);

  // 🔹 Fetch cart data
  const fetchData = async () => {
    try {
      const response = await fetch(SummaryApi.addToCartProductView.url, {
        method: SummaryApi.addToCartProductView.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      });

      const result = await response.json();

      if (result.success) {
        setData(result.data);
      }
    } catch (err) {
      console.error("Cart fetch error:", err);
    }
  };

  // 🔥 HANDLE PAYMENT (FIXED PROPERLY)
  const handlePayment = async () => {
    try {
      const response = await fetch(SummaryApi.createOrder.url, {
        method: SummaryApi.createOrder.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          amount: totalPrice,
        }),
      });

      // ❌ API fail check
      if (!response.ok) {
        const text = await response.text();
        console.error("API Error:", text);
        alert("Server error");
        return;
      }

      const data = await response.json();
      console.log("Order response:", data);

      // ❌ validate response
      if (!data.success || !data.order) {
        alert("Invalid order response");
        return;
      }

      const options = {
        key: "rzp_test_SbqOG2TsjgzOL8", // ✅ correct key
        amount: data.order.amount,
        currency: "INR",
        name: "Vijay Sport",
        description: "Sports Store",
        order_id: data.order.id,

        handler: async function (response) {
          try {
            const verifyRes = await fetch(SummaryApi.verifyPayment.url, {
              method: SummaryApi.verifyPayment.method,
              credentials: "include",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(response),
            });

            const verifyData = await verifyRes.json();

            if (verifyData.success) {
              alert("Payment Successful");
              window.location.href = "/profile";
            } else {
              alert("Payment Failed");
            }
          } catch (err) {
            console.error("Verification error:", err);
          }
        },

        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error("Payment error:", error);
      alert("Something went wrong");
    }
  };

  // 🔹 Quantity increase
  const increaseQty = async (id, qty) => {
    await fetch(SummaryApi.updateCartProduct.url, {
      method: SummaryApi.updateCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
        quantity: qty + 1,
      }),
    });

    fetchData();
  };

  // 🔹 Quantity decrease
  const decreaseQty = async (id, qty) => {
    if (qty <= 1) return;

    await fetch(SummaryApi.updateCartProduct.url, {
      method: SummaryApi.updateCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
        quantity: qty - 1,
      }),
    });

    fetchData();
  };

  // 🔹 Delete product
  const deleteCartProduct = async (id) => {
    await fetch(SummaryApi.deleteCartProduct.url, {
      method: SummaryApi.deleteCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ _id: id }),
    });

    fetchData();
    context.fetchUserAddToCart();
  };

  useEffect(() => {
    setLoading(true);
    fetchData().finally(() => setLoading(false));
  }, []);

  // 🔹 totals
  const totalQty = data.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = data.reduce(
    (acc, item) => acc + item.quantity * item?.productId?.sellingPrice,
    0
  );

  return (
    <div className="container mx-auto p-4">
      {data.length === 0 && !loading && (
        <p className="text-center bg-white py-5">No Data</p>
      )}

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Products */}
        <div className="w-full max-w-3xl">
          {data.map((product) => (
            <div
              key={product._id}
              className="bg-white border rounded grid grid-cols-[128px,1fr] my-2"
            >
              <div className="w-32 h-32 bg-slate-200">
                <img
                  src={product?.productId?.productImage[0]}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="p-3 relative">
                <div
                  className="absolute right-2 top-2 text-red-600 cursor-pointer"
                  onClick={() => deleteCartProduct(product._id)}
                >
                  <MdDelete />
                </div>

                <h2 className="font-semibold">
                  {product?.productId?.productName}
                </h2>

                <p className="text-red-600">
                  {displayINRCurrency(product?.productId?.sellingPrice)}
                </p>

                <div className="flex gap-3 mt-2">
                  <button onClick={() => decreaseQty(product._id, product.quantity)}>-</button>
                  <span>{product.quantity}</span>
                  <button onClick={() => increaseQty(product._id, product.quantity)}>+</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="w-full max-w-sm">
          <div className="bg-white p-4">
            <h2 className="bg-red-600 text-white px-3 py-1">Summary</h2>

            <div className="flex justify-between mt-2">
              <p>Quantity</p>
              <p>{totalQty}</p>
            </div>

            <div className="flex justify-between">
              <p>Total Price</p>
              <p>{displayINRCurrency(totalPrice)}</p>
            </div>

            <button
              className="bg-blue-600 text-white w-full mt-3 py-2"
              onClick={handlePayment}
            >
              Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;