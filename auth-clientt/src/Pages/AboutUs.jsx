import React from 'react'
import { Link } from 'react-router-dom'

const AboutUs = () => {
  return (
    <div className="responsive-container-block bigContainer">
  <div className="responsive-container-block Container">
    <img className="mainImg" src="https://c4.wallpaperflare.com/wallpaper/234/543/684/food-pizza-wallpaper-preview.jpg"/>
    <div className="allText aboveText">
      <p className="text-blk mt-20">
       <spa className="text-red-600 text-3xl font-bold mt-5">Welcome to Food Hub..🥪</spa>
      </p>
      <p className="text-blk text-2xl font-bold mt-4">
       At our hotel, taste meets excellence, creating unforgettable dining experiences for our valued guests.
      </p>
      <p className="text-blk  mb-4 text-lg">
      <span className="text-red-500 font-bold">Our Story:</span>
      Discover the origins of Food Hub, where passion for exceptional cuisine meets unparalleled hospitality. Founded by a team of culinary experts and hospitality enthusiasts, Food Hub has quickly become a renowned destination for food lovers seeking memorable dining experiences.<br/>
      <span className="text-red-500 font-bold"> Our Cuisine:</span>
   
    Indulge in a diverse menu that celebrates the essence of global cuisines. From savory classics to innovative creations, our culinary offerings promise to tantalize your taste buds. Try our signature dishes like the aromatic "Hub Special Biryani" or savor the exquisite flavors of our "Grilled Seafood Platter.<br/>
    <span className="text-red-500 font-bold"> Our Experience:</span><br/>
    
    Step into our elegant dining space and immerse yourself in an ambiance of warmth and sophistication. Whether you're celebrating a special occasion or enjoying a meal with loved ones, our attentive staff is dedicated to ensuring a seamless dining experience that exceeds your expectations.<br/>
      </p>
      <Link to="/">
      <button className="bg-[#f54748] active:scale-90 transition duration-500 transform hover:shadow-xl shadow-md rounded-full px-8 py-2 text-xl font-medium text-white mt-4">
        GoTo Home Here..
      </button>
      </Link>
    </div>
  </div>
  <div className="responsive-container-block Container bottomContainer">
    <img className="mainImg" src="https://wallpapercave.com/wp/wp7029319.jpg"/>
    <div className="allText aboveText">
      <p className="text-blk headingText">
       <spa className="text-red-600 text-3xl font-bold">Our Location and Opening Times..🥪</spa>
      </p>
      <p className="text-blk text-2xl font-bold mt-4">
       At our hotel, taste meets excellence, creating unforgettable dining experiences for our valued guests.
      </p>
      <p className="text-blk  mb-4 text-lg">
      <span className="text-red-500 font-bold"> Location and Hours:</span>
     
Conveniently situated in the heart of the city, Food Hub invites you to embark on a culinary journey like no other. Visit us at  <span className="text-green-500">Food-hub-chennai</span>  and enjoy our delectable offerings. We are open <span className="text-green-500">Mrng 8.00 AM - Night 10.00 PM</span> to serve you with the finest food and hospitality.<br/>
<span className="text-red-500 font-bold">Contact Us:</span><br/>

For inquiries or reservations, please contact us at [Insert Contact Information Here]. Our friendly team is always available to assist you and ensure that your dining experience at Food Hub is nothing short of extraordinary.<br/>
      </p>
      <Link to="/">
      <button className="bg-[#f54748] active:scale-90 transition duration-500 transform hover:shadow-xl shadow-md rounded-full px-8 py-2 text-xl font-medium text-white mt-4">
        GoTo Home Here..
      </button>
      </Link>
    </div>
  </div>
</div>
  )
}

export default AboutUs