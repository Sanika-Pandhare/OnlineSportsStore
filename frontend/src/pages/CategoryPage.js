import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import SummaryApi from "../common"
import VerticalCard from "../components/VerticalCard"

const CategoryPage = () => {

    const { categoryName } = useParams()

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    // 🔥 FETCH CATEGORY PRODUCTS
    const fetchCategoryProducts = async () => {
        try {
            setLoading(true)
            setError(null)

            const response = await fetch(SummaryApi.categoryWiseProduct.url, {
                method: SummaryApi.categoryWiseProduct.method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    category: categoryName   // 🔥 IMPORTANT
                })
            })

            const result = await response.json()

            if (result.success) {
                setData(result.data)
            } else {
                setError(result.message || "Failed to fetch products")
            }

        } catch (err) {
            console.log(err)
            setError("Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (categoryName) {
            fetchCategoryProducts()
        }
    }, [categoryName])

    return (
        <div className="container mx-auto px-4 py-6">

            {/* HEADER */}
            <h1 className="text-2xl font-semibold mb-4 capitalize">
                {categoryName} ({data.length})
            </h1>

            {/* ERROR */}
            {error && (
                <p className="text-red-500 mb-4">{error}</p>
            )}

            {/* PRODUCTS */}
            <VerticalCard
                loading={loading}
                data={data}
            />

        </div>
    )
}

export default CategoryPage