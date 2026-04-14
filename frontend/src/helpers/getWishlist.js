const getWishlist = async () => {
    try {
        const response = await fetch("http://localhost:8080/api/wishlist", {
            method: "GET",
            credentials: "include"
        })

        const data = await response.json()
        return data

    } catch (err) {
        console.log(err)
        return { data: [] }
    }
}

export default getWishlist