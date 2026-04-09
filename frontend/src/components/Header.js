import React, { useContext, useState, useEffect, useRef } from 'react'
import Logo from './Logo'
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify'
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';
import Context from '../context';

const Header = () => {
  const user = useSelector(state => state?.user?.user)
  const dispatch = useDispatch()
  const [menuDisplay,setMenuDisplay] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false)
  const context = useContext(Context)
  const navigate = useNavigate()
  const searchInput = useLocation()
  const URLSearch = new URLSearchParams(searchInput?.search)
  const searchQuery = URLSearch.getAll("q")
  const [search,setSearch] = useState(searchQuery)

  const menuRef = useRef()

  // 🔥 Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (!menuRef.current?.contains(e.target)) {
        setMenuDisplay(false)
      }
    }

    document.addEventListener("mousedown", handler)

    return () => {
      document.removeEventListener("mousedown", handler)
    }
  }, [])

  const handleLogout = async() => {
    const fetchData = await fetch(SummaryApi.logout_user.url,{
      method : SummaryApi.logout_user.method,
      credentials : 'include'
    })
    const data = await fetchData.json()

    if(data.success){
      toast.success(data.message)
      dispatch(setUserDetails(null))
      navigate("/")
    }

    if(data.error){
      toast.error(data.message)
    }
  }

  const handleSearch = (e)=>{
    const { value } = e.target
    setSearch(value)

    if(value){
      navigate(`/search?q=${value}`)
    }else{
      navigate("/search")
    }
  }

  return (
   <div className="fixed top-0 left-0 w-full z-50" >
    <header className='h-16 shadow-md bg-white fixed w-full z-50'>
      <div className='h-full container mx-auto flex items-center px-4 justify-between'>
        
        {/* Logo */}
        <div>
            <Link to={"/"}>
                <Logo w={90} h={50}/>
            </Link>
        </div>

        {/* Desktop Search */}
        <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2'>
            <input 
              type='text' 
              placeholder='Search product here...' 
              className='w-full outline-none' 
              onChange={handleSearch} 
              value={search}
            />
            <div className='text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white'>
              <GrSearch />
            </div>
        </div>

        {/* Desktop Navigation */}
        <div className='hidden lg:flex items-center gap-6'>
          <Link to="/aboutus" className='hover:text-red-600'>About Us</Link>
          <Link to="/contact" className='hover:text-red-600'>Contact</Link>
        </div>

        {/* User & Cart */}
        <div className='flex items-center gap-4 lg:gap-7'>

          {/* Mobile Hamburger */}
          <div className='lg:hidden text-2xl cursor-pointer' onClick={()=>setMobileMenu(prev => !prev)}>
            { mobileMenu ? <FaTimes/> : <FaBars/> }
          </div>

          {/* User Profile */}
          {user?._id && (
            <div ref={menuRef} className='relative flex justify-center'>
              <div 
                className='text-3xl cursor-pointer relative flex justify-center' 
                onClick={()=>setMenuDisplay(prev => !prev)}
              >
                {user?.profilePic ? (
                  <img src={user?.profilePic} className='w-10 h-10 rounded-full' alt={user?.name} />
                ) : <FaRegCircleUser />}
              </div>

              {menuDisplay && (
                <div className='absolute bg-white top-12 right-0 h-fit p-2 shadow-lg rounded w-44'>
                  <nav className='flex flex-col'>

                    {/* 👤 Profile for ALL users */}
                    <Link 
                      to={"/profile"} 
                      className='hover:bg-slate-100 p-2 rounded'
                      onClick={()=>setMenuDisplay(false)}
                    >
                      My Profile
                    </Link>

                    {/* 🛠 Admin only */}
                    {user?.role === ROLE.ADMIN && (
                      <Link 
                        to={"/admin-panel/all-products"} 
                        className='hover:bg-slate-100 p-2 rounded'
                        onClick={()=>setMenuDisplay(false)}
                      >
                        Admin Panel
                      </Link>
                    )}

                    {/* 🔓 Logout inside dropdown (better UX) */}
                    <button 
                      onClick={handleLogout}
                      className='text-left hover:bg-red-100 p-2 rounded text-red-600'
                    >
                      Logout
                    </button>

                  </nav>
                </div>
              )}
            </div>
          )}

          {/* Cart */}
          {user?._id && (
            <Link to={"/cart"} className='text-2xl relative'>
              <FaShoppingCart/>
              <div className='bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
                  <p className='text-sm'>{context?.cartProductCount}</p>
              </div>
            </Link>
          )}

          {/* Login button (only if not logged in) */}
          {!user?._id && (
            <Link to={"/login"} className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700'>
              Login
            </Link>
          )}

        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className='lg:hidden bg-white w-full shadow-md absolute top-16 left-0 z-40 flex flex-col p-4 gap-4'>
          <Link to="/aboutus" className='hover:text-red-600' onClick={()=>setMobileMenu(false)}>About Us</Link>
          <Link to="/contact" className='hover:text-red-600' onClick={()=>setMobileMenu(false)}>Contact</Link>
        </div>
      )}
    </header>
   </div>
  )
}

export default Header