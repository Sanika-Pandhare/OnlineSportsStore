const getWishlist = async () => {
    const response = await fetch("http://localhost:5000/api/wishlist", {
        method: "GET",
        credentials: "include"
    })

    const data = await response.json()
    return data
}

export default getWishlist