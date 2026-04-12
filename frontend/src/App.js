// import logo from './logo.svg';
// import './App.css';
// import { Outlet } from 'react-router-dom';
// import Header from './components/Header';
// // import Navbar  from './components/Navbar/Navbar';
// import Footer from './components/Footer';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useEffect, useState } from 'react';
// import SummaryApi from './common';
// import Context from './context';
// import { useDispatch } from 'react-redux';
// import { setUserDetails } from './store/userSlice';
// import Checkout from "./pages/Checkout"


// function App() {
//   const dispatch = useDispatch()
//   const [cartProductCount,setCartProductCount] = useState(0)

//   const fetchUserDetails = async()=>{
//       const dataResponse = await fetch(SummaryApi.current_user.url,{
//         method : SummaryApi.current_user.method,
//         credentials : 'include'
//       })

//       const dataApi = await dataResponse.json()

//       if(dataApi.success){
//         dispatch(setUserDetails(dataApi.data))
//       }
//   }

//   const fetchUserAddToCart = async()=>{
//     const dataResponse = await fetch(SummaryApi.addToCartProductCount.url,{
//       method : SummaryApi.addToCartProductCount.method,
//       credentials : 'include'
//     })

//     const dataApi = await dataResponse.json()

//     setCartProductCount(dataApi?.data?.count)
//   }

//   useEffect(()=>{
//     /**user Details */
//     fetchUserDetails()
//     /**user Details cart product */
//     fetchUserAddToCart()

//   },[])
//   return (
//     <>
//       <Context.Provider value={{
//           fetchUserDetails, // user detail fetch 
//           cartProductCount, // current user add to cart product count,
//           fetchUserAddToCart
//       }}>
//         <ToastContainer 
//           position='top-center'
//         />
        
//         <Header/>
//         {/* <Navbar/> */}
      

//         <main className='min-h-[calc(100vh-120px)] pt-16'>
//           <Outlet/>
//         </main>
//         <Footer/>
//       </Context.Provider>
//     </>
//   );
// }

// export default App;


// import logo from './logo.svg';
// import './App.css';
// import { Outlet, Routes, Route } from 'react-router-dom'; // ✅ added Routes, Route
// import Header from './components/Header';
// // import Navbar  from './components/Navbar/Navbar';
// import Footer from './components/Footer';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useEffect, useState } from 'react';
// import SummaryApi from './common';
// import Context from './context';
// import { useDispatch } from 'react-redux';
// import { setUserDetails } from './store/userSlice';
// import Checkout from "./pages/Checkout"; // ✅ already you added


// function App() {
//   const dispatch = useDispatch()
//   const [cartProductCount,setCartProductCount] = useState(0)

//   const fetchUserDetails = async()=>{
//       const dataResponse = await fetch(SummaryApi.current_user.url,{
//         method : SummaryApi.current_user.method,
//         credentials : 'include'
//       })

//       const dataApi = await dataResponse.json()

//       if(dataApi.success){
//         dispatch(setUserDetails(dataApi.data))
//       }
//   }

//   const fetchUserAddToCart = async()=>{
//     const dataResponse = await fetch(SummaryApi.addToCartProductCount.url,{
//       method : SummaryApi.addToCartProductCount.method,
//       credentials : 'include'
//     })

//     const dataApi = await dataResponse.json()

//     setCartProductCount(dataApi?.data?.count)
//   }

//   useEffect(()=>{
//     fetchUserDetails()
//     fetchUserAddToCart()
//   },[])

//   return (
//     <>
//       <Context.Provider value={{
//           fetchUserDetails,
//           cartProductCount,
//           fetchUserAddToCart
//       }}>
//         <ToastContainer position='top-center'/>
        
//         <Header/>
//         {/* <Navbar/> */}

//         <main className='min-h-[calc(100vh-120px)] pt-16'>

//           {/* ✅ THIS IS THE ONLY ADDITION */}
//           <Routes>
//             <Route path="/checkout" element={<Checkout />} />
//           </Routes>

//           {/* existing outlet */}
//           <Outlet/>

//         </main>

//         <Footer/>
//       </Context.Provider>
//     </>
//   );
// }

// export default App;



import './App.css';
import { Outlet } from 'react-router-dom';  // ✅ only Outlet
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import SummaryApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';

function App() {
  const dispatch = useDispatch()
  const [cartProductCount,setCartProductCount] = useState(0)

  const fetchUserDetails = async()=>{
      const dataResponse = await fetch(SummaryApi.current_user.url,{
        method : SummaryApi.current_user.method,
        credentials : 'include'
      })

      const dataApi = await dataResponse.json()

      if(dataApi.success){
        dispatch(setUserDetails(dataApi.data))
      }
  }

  const fetchUserAddToCart = async()=>{
    const dataResponse = await fetch(SummaryApi.addToCartProductCount.url,{
      method : SummaryApi.addToCartProductCount.method,
      credentials : 'include'
    })

    const dataApi = await dataResponse.json()

    setCartProductCount(dataApi?.data?.count)
  }

  useEffect(()=>{
    fetchUserDetails()
    fetchUserAddToCart()
  },[])

  return (
    <Context.Provider value={{
        fetchUserDetails,
        cartProductCount,
        fetchUserAddToCart
    }}>
      <ToastContainer position='top-center'/>
      
      <Header/>

      <main className='min-h-[calc(100vh-120px)] pt-16'>
        <Outlet/>   {/* ✅ THIS renders all pages */}
      </main>

      <Footer/>
    </Context.Provider>
  );
}

export default App;