import React from 'react'
import Header from '../components/Header.jsx'
import RecommendedFood from '../components/RecommendedFood.jsx'
import Service from '../components/Service.jsx'
import NewFoods from '../components/NewFoods.jsx'
import Service2 from '../components/Service2.jsx'
import Special from '../components/Special.jsx'
import Footer from '../Shared/Footer'

const Home = () => {
  return (
    <div>
        <Header/>
        <RecommendedFood/>
        <Service/>
        <NewFoods/>
        <Service2/>
        <Special/>
    </div>
  )
}

export default Home;