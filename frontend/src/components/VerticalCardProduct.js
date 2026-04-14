import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { FaHeart } from "react-icons/fa"
import { FiHeart } from "react-icons/fi"
import { Link } from 'react-router-dom'
import Context from '../context'
import toggleWishlist from '../helpers/toggleWishlist'
import getWishlist from '../helpers/getWishlist'

const VerticalCardProduct = ({ category, heading }) => {

    const [data, setData] = useState([])
    const { fetchWishlistCount } = useContext(Context)
    const [loading, setLoading] = useState(true)
    const loadingList = new Array(8).fill(null)
    const [wishlistIds, setWishlistIds] = useState([])

    const scrollElement = useRef()

    const fetchData = async () => {
        setLoading(true)
        const categoryProduct = await fetchCategoryWiseProduct(category)
        setData(categoryProduct?.data || [])
        setLoading(false)
    }

    useEffect(() => {
        fetchData()
    }, [category])

    // 🔥 FETCH WISHLIST
    const fetchWishlist = async () => {
        try{
            const res = await getWishlist()
            const ids = res?.data?.map(item => item?.productId?._id) || []
            setWishlistIds(ids)
        }catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        fetchWishlist()
    }, [])

    const scrollRight = () => {
        scrollElement.current.scrollLeft += 300
    }

    const scrollLeft = () => {
        scrollElement.current.scrollLeft -= 300
    }

    return (
        <div className='container mx-auto px-4 my-6 relative'>

            <h2 className='text-2xl font-semibold py-4'>{heading}</h2>

            <div className='flex items-center gap-4 overflow-x-scroll scrollbar-none' ref={scrollElement}>

                <button className='absolute left-0 bg-white p-1 shadow hidden md:block' onClick={scrollLeft}>
                    <FaAngleLeft />
                </button>

                <button className='absolute right-0 bg-white p-1 shadow hidden md:block' onClick={scrollRight}>
                    <FaAngleRight />
                </button>

                {
                    loading ? (
                        loadingList.map((_, index) => (
                            <div key={index} className='w-[180px] h-[250px] bg-gray-200 rounded'></div>
                        ))
                    ) : (
                        data.map((product) => {

                            const isLiked = wishlistIds.includes(product._id)

                            return (
                                <Link
                                    key={product._id}
                                    to={"/product/" + product._id}
                                    className='w-[180px] min-w-[180px] bg-white rounded-md shadow-sm overflow-hidden'
                                >

                                    {/* IMAGE */}
                                    <div className='relative h-[200px] w-full bg-gray-100'>

                                        {/* ❤️ MEESHO STYLE BUTTON */}
                                        <button
                                            onClick={async (e) => {
                                                e.preventDefault()
                                                e.stopPropagation()

                                                const res = await toggleWishlist(product._id)

                                                if(res?.success){
                                                    setWishlistIds((prev)=>{
                                                        if(prev.includes(product._id)){
                                                            return prev.filter(id => id !== product._id)
                                                        }else{
                                                            return [...prev, product._id]
                                                        }
                                                    })
                                                }
                                            }}
                                            style={{
                                                position: "absolute",
                                                top: "8px",
                                                right: "8px",
                                                width: "28px",
                                                height: "28px",
                                                borderRadius: "50%",
                                                backgroundColor: "rgba(255,255,255,0.75)", // ✅ Meesho
                                                border: "none",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                boxShadow: "0 1px 2px rgba(0,0,0,0.12)",
                                                cursor: "pointer",
                                                padding: 0
                                            }}
                                        >
                                            {isLiked ? (
                                                <FaHeart size={12} color="#ff3f6c" />
                                            ) : (
                                                <FiHeart size={14} color="#282c3f" />
                                            )}
                                        </button>

                                        <img
                                            src={product.productImage[0]}
                                            className='w-full h-full object-cover'
                                            alt="product"
                                        />
                                    </div>

                                    {/* DETAILS */}
                                    <div className='p-2'>

                                        <p className='text-sm font-medium truncate'>
                                            {product.productName}
                                        </p>

                                        <div className='flex items-center gap-2 text-sm mt-1'>
                                            <span className='font-semibold'>
                                                ₹{product.sellingPrice}
                                            </span>

                                            <span className='line-through text-gray-400 text-xs'>
                                                ₹{product.price}
                                            </span>

                                            <span className='text-green-600 text-xs'>
                                                {Math.round(
                                                    ((product.price - product.sellingPrice) / product.price) * 100
                                                )}% off
                                            </span>
                                        </div>

                                        <div className='flex items-center gap-1 mt-2'>
                                            <span className='bg-green-600 text-white text-xs px-2 py-[2px] rounded'>
                                                4.1 ★
                                            </span>
                                            <span className='text-xs text-gray-500'>(3,324)</span>
                                        </div>

                                    </div>

                                </Link>
                            )
                        })
                    )
                }

            </div>
        </div>
    )
}

export default VerticalCardProduct