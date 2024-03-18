<h1>Food Delivery Web Application with Admin Panel and Payment Option..!</h1>
<b>This project is a full-stack web application for food delivery, featuring both user and admin functionalities, payment processing via Stripe, and image upload capabilities using Cloudinary.
  Users can register, login, browse menus, add items to their cart, and place orders. Admins can manage food items, track orders, and update profiles.</b>

<h3>Features</h3>
<b>User Authentication:</b> Users can register and login to their accounts securely.
<b>User Profile:</b> Users can update their profiles, including profile pictures uploaded to Cloudinary.
<b>Menu Viewing:</b> Users can browse available food items and view details.
<b>Shopping Cart:</b> Users can add items to their cart, view cart contents, and proceed to checkout.
<b>Payment Processing:</b> Secure payment processing is handled using Stripe integration.
<b>Order Tracking:</b> Users can track their order status and view past orders.

<b>Admin Panel:</b> Admins can login, register, and perform CRUD operations on food items.
<b>Order Management:</b> Admins can track all orders, update order status, and view order details.
<b>Payment Tracking:</b> Payment details are recorded and tracked using Stripe integration.

<h3>Technologies Used</h3>
<h2>Frontend:</h2> React.js, React Router, Axios, Tailwind CSS
</h2>Backend:</h2> Node.js, Express.js, MongoDB
</h2>Authentication:</h2> JSON Web Tokens (JWT)
</h2>Payment Processing:</h2> Stripe API
</h2>Image Upload:</h2> Cloudinary API
Usage
Clone the repository:

bash
Copy code
git clone https://github.com/Kanchana224/food-delivery-web-app.git
Navigate to the project directory:

bash
Copy code
cd food-delivery-web-app
Install dependencies for both frontend and backend:

bash
Copy code
cd frontend
npm install
cd ../backend
npm install
Set up environment variables:

Create a .env file in the backend directory and add necessary environment variables for MongoDB connection, Cloudinary API key, Stripe API key, etc.
Run the development servers:

bash
Copy code
cd frontend
npm start
cd ../backend
npm start
Access the web application at http://localhost:3000/ for the frontend and http://localhost:8000/ for the backend.

<h3>Deployment</h3>

Frontend: Deployed on Netlify
Backend: Deployed on Render.com
Contributors
<h4>Kanchana224</h4>
Collaborator Name
License
This project is licensed under the MIT License - see the LICENSE file for details.
