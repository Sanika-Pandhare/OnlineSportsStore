import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayINRCurrency from '../helpers/displayCurrency'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { Link, useNavigate } from 'react-router-dom'
import addToCart from '../helpers/addToCart'
import Context from '../context'

const HorizontalCardProduct = ({category, heading}) => {

    const [data,setData] = useState([])
    const [loading,setLoading] = useState(true)
    const loadingList = new Array(13).fill(null)

    const [scroll,setScroll] = useState(0)
    const scrollElement = useRef()

    const navigate = useNavigate()

    const { fetchUserAddToCart } = useContext(Context)

    // ✅ NEW STATES (ADDED)
    const [showModal, setShowModal] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [selectedSize, setSelectedSize] = useState(null)

    // ✅ Add to Cart
    const handleAddToCart = async(e,id)=>{
       e.stopPropagation()
       e.preventDefault()

       await addToCart(e,id)
       fetchUserAddToCart()
    }

    // ✅ Buy Now → OPEN MODAL (UPDATED)
    const handleBuyNow = (e, product) => {
        e.stopPropagation()
        e.preventDefault()

        setSelectedProduct(product)
        setShowModal(true)
    }

    // ✅ CONFIRM BUY
    const handleConfirmBuy = () => {
        if(!selectedSize) return

        setShowModal(false)

        navigate("/checkout", {
            state: { product: selectedProduct, size: selectedSize }
        })
    }

    const fetchData = async() =>{
        setLoading(true)
        const categoryProduct = await fetchCategoryWiseProduct(category)
        setLoading(false)
        setData(categoryProduct?.data)
    }

    useEffect(()=>{
        fetchData()
    },[])

    const scrollRight = () =>{
        scrollElement.current.scrollLeft += 300
    }

    const scrollLeft = () =>{
        scrollElement.current.scrollLeft -= 300
    }

  return (
    <div className='container mx-auto px-4 my-6 relative'>

        <h2 className='text-2xl font-semibold py-4'>{heading}</h2>

        <div className='flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all' ref={scrollElement}>

            <button className='bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block' onClick={scrollLeft}>
                <FaAngleLeft/>
            </button>

            <button className='bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block' onClick={scrollRight}>
                <FaAngleRight/>
            </button> 

            {
                loading ? (
                    loadingList.map((_,index)=>(
                        <div key={index} className='w-full min-w-[280px] h-36 bg-white rounded-sm shadow flex'></div>
                    ))
                ) : (
                    data.map((product,index)=>(
                        <Link 
                            key={index}
                            to={"product/"+product?._id} 
                            className='w-full min-w-[280px] h-36 bg-white rounded-sm shadow flex'
                        >

                            <div className='bg-slate-200 h-full p-4 min-w-[120px]'>
                                <img src={product.productImage[0]} className='object-scale-down h-full'/>
                            </div>

                            <div className='p-4 grid w-full'>

                                <h2 className='font-medium'>{product?.productName}</h2>
                                <p className='text-slate-500'>{product?.category}</p>

                                <div className='flex gap-3'>
                                    <p className='text-red-600'>{displayINRCurrency(product?.sellingPrice)}</p>
                                    <p className='line-through'>{displayINRCurrency(product?.price)}</p>
                                </div>

                                <div className='flex gap-2'>

                                    <button 
                                        className='text-sm bg-red-600 text-white px-3 py-1 rounded-full'
                                        onClick={(e)=>handleAddToCart(e,product?._id)}
                                    >
                                        Add to Cart
                                    </button>

                                    <button 
                                        className='text-sm bg-green-600 text-white px-3 py-1 rounded-full'
                                        onClick={(e)=>handleBuyNow(e,product)}
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

        {/* ✅ MODAL (BOTTOM SHEET ADDED) */}
        {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-end justify-center z-50">

                <div className="bg-white w-full p-4 rounded-t-2xl">

                    <div className="flex justify-between items-center">
                        <h2 className="font-semibold">Select Preferences</h2>
                        <button onClick={()=>setShowModal(false)}>X</button>
                    </div>

                    <div className="mt-4">
                        <p>Select Size</p>

                        <div className="flex gap-2 mt-2">
                            {[26,28,30,32,34,36].map((size)=>(
                                <button
                                    key={size}
                                    onClick={()=>setSelectedSize(size)}
                                    className={`border px-3 py-1 rounded ${
                                        selectedSize === size ? "bg-black text-white" : ""
                                    }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-between mt-4">
                        <p>Total Price</p>
                        <p>₹{selectedProduct?.sellingPrice}</p>
                    </div>

                    <button
                        onClick={handleConfirmBuy}
                        disabled={!selectedSize}
                        className="w-full mt-4 bg-purple-600 text-white py-2 rounded"
                    >
                        Buy Now
                    </button>

                </div>
            </div>
        )}

    </div>
  )
}

export default HorizontalCardProduct