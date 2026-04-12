import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayINRCurrency from '../helpers/displayCurrency'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { Link, useNavigate } from 'react-router-dom'
import addToCart from '../helpers/addToCart'
import Context from '../context'

const VerticalCardProduct = ({ category, heading }) => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const loadingList = new Array(8).fill(null)

    const scrollElement = useRef()
    const navigate = useNavigate()
    const { fetchUserAddToCart } = useContext(Context)

    // ✅ Modal States
    const [showModal, setShowModal] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [selectedSize, setSelectedSize] = useState(null)
    const [quantity, setQuantity] = useState(1)

    const fetchData = async () => {
        setLoading(true)
        const categoryProduct = await fetchCategoryWiseProduct(category)
        setData(categoryProduct?.data)
        setLoading(false)
    }

    useEffect(() => {
        fetchData()
    }, [])

    const scrollRight = () => {
        scrollElement.current.scrollLeft += 300
    }

    const scrollLeft = () => {
        scrollElement.current.scrollLeft -= 300
    }

    // ✅ ADD TO CART
    const handleAddToCart = async (e, id) => {
        e.preventDefault()
        e.stopPropagation()

        await addToCart(e, id)
        fetchUserAddToCart()
    }

    // ✅ BUY NOW → OPEN MODAL
    const handleBuy = (e, product) => {
        e.preventDefault()
        e.stopPropagation()

        setSelectedProduct(product)
        // setSelectedSize(null)
        setQuantity(1)
         navigate("/checkout", {
            state: {
                product: selectedProduct,
                size: selectedSize,
                quantity: quantity
            }
        })
        // setShowModal(true)
    }

    // ✅ CONFIRM → REDIRECT
    const handleConfirm = () => {
        if (!selectedSize) return

        setShowModal(false)

        navigate("/checkout", {
            state: {
                product: selectedProduct,
                size: selectedSize,
                quantity: quantity
            }
        })
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
                            <div key={index} className='w-[280px] h-[350px] bg-slate-200 animate-pulse rounded'></div>
                        ))
                    ) : (
                        data.map((product) => (

                            <Link
                                key={product._id}
                                to={"/product/" + product._id}
                                className='w-[280px] bg-white rounded shadow'
                            >

                                <div className='h-48 bg-slate-200 flex justify-center items-center'>
                                    <img
                                        src={product.productImage[0]}
                                        className='h-full object-contain hover:scale-110 transition'
                                    />
                                </div>

                                <div className='p-4 space-y-2'>
                                    <h2 className='font-medium line-clamp-1'>
                                        {product.productName}
                                    </h2>

                                    <p className='text-slate-500'>
                                        {product.category}
                                    </p>

                                    <div className='flex gap-2'>
                                        <p className='text-red-600'>
                                            {displayINRCurrency(product.sellingPrice)}
                                        </p>
                                        <p className='line-through text-slate-500'>
                                            {displayINRCurrency(product.price)}
                                        </p>
                                    </div>

                                    {/* ✅ BUTTONS */}
                                    <div className='flex gap-2 mt-2'>

                                        <button
                                            onClick={(e) => handleAddToCart(e, product._id)}
                                            className='w-full bg-red-600 text-white py-1 rounded'
                                        >
                                            Add to Cart
                                        </button>

                                        <button
                                            onClick={(e) => handleBuy(e, product)}
                                            className='w-full bg-purple-600 text-white py-1 rounded'
                                        >
                                            Buy Now
                                        </button>

                                    </div>

                                </div>

                            </Link>
                        ))
                    )
                }
            </div>

            {/* ✅ MODAL */}
            

        </div>
    )
}

export default VerticalCardProduct