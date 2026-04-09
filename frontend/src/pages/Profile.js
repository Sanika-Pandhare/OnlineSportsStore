import React, { useEffect, useState } from 'react'

const Profile = () => {
    const [user, setUser] = useState(null)
    const [orders, setOrders] = useState([])

    // 🔥 Fetch user
    const fetchUser = async () => {
        const res = await fetch("http://localhost:8080/api/user-details", {
            method: "GET",
            credentials: "include"
        })
        const data = await res.json()

        if (data.success) {
            setUser(data.data)
        }
    }

    // 🔥 Fetch orders
    const fetchOrders = async () => {
        const res = await fetch("http://localhost:8080/api/my-orders", {
            method: "GET",
            credentials: "include"
        })
        const data = await res.json()

        if (data.success) {
            setOrders(data.data)
        }
    }

    useEffect(() => {
        fetchUser()
        fetchOrders()
    }, [])

    return (
        <div className="container mx-auto p-6">

            {/* 🔹 USER INFO */}
            <div className="bg-white shadow-md rounded p-4 mb-6">
                <h2 className="text-xl font-bold mb-4">User Profile</h2>

                {user && (
                    <div className="flex items-center gap-4">
                        <img
                            src={user.profilePic || "https://via.placeholder.com/80"}
                            alt="profile"
                            className="w-16 h-16 rounded-full"
                        />

                        <div>
                            <p className="font-semibold">{user.name}</p>
                            <p className="text-gray-600">{user.email}</p>
                            <p className="text-sm text-gray-400">Role: {user.role}</p>
                        </div>
                    </div>
                )}
            </div>

            {/* 🔹 ORDER HISTORY */}
            <div className="bg-white shadow-md rounded p-4">
                <h2 className="text-xl font-bold mb-4">Purchase History</h2>

                {orders.length === 0 ? (
                    <p>No orders yet</p>
                ) : (
                    orders.map(order => (
                        <div key={order._id} className="border p-3 mb-3 rounded">
                            
                            <div className="flex justify-between">
                                <p className="font-semibold">Order ID: {order.orderId}</p>
                                <p className="text-green-600">{order.paymentStatus}</p>
                            </div>

                            <p className="text-gray-600">
                                Total: ₹{order.totalAmount}
                            </p>

                            <p className="text-sm text-gray-400">
                                {new Date(order.createdAt).toLocaleString()}
                            </p>

                            {/* PRODUCTS */}
                            <div className="mt-2">
                                {order.products.map((item, index) => (
                                    <div key={index} className="text-sm">
                                        Product ID: {item.productId} | Qty: {item.quantity}
                                    </div>
                                ))}
                            </div>

                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default Profile