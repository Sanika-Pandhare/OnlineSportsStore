import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'
import Navbar from '../components/Navbar/Navbar'

const Home = () => {
  return (
    <div>
      <Navbar/>
      <CategoryList/>
      <BannerProduct/>

      <HorizontalCardProduct category={"Cricket"} heading={"Top's Cricket"}/>
      <HorizontalCardProduct category={"Athletics"} heading={"Popular's Athletics"}/>

      <VerticalCardProduct category={"Training"} heading={"Training"}/>
      <VerticalCardProduct category={"Boxing"} heading={"Boxing"}/>
      <VerticalCardProduct category={"Indoor Games"} heading={"Indoor Games"}/>
      <VerticalCardProduct category={"Fitness"} heading={"Fitness"}/>
      <VerticalCardProduct category={"Team Sports"} heading={"Team Sports"}/>
      <VerticalCardProduct category={"Accessories"} heading={"Accessories"}/>
       <VerticalCardProduct category={"Boys Shoes"} heading={"Boys Shoes"}/>
        <VerticalCardProduct category={"Boys Clothes"} heading={"Boys Clothes"}/>
         <VerticalCardProduct category={"Jersey"} heading={"Jersey"}/>

      {/* <VerticalCardProduct category={"refrigerator"} heading={"Refrigerator"}/>
      <VerticalCardProduct category={"trimmers"} heading={"Trimmers"}/> */}
    </div>
  )
}

export default Home