const toggleWishlist = async (productId) => {
    const response = await fetch("http://localhost:5000/api/wishlist/toggle", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ productId })
    })

    return await response.json()
}

export default toggleWishlist