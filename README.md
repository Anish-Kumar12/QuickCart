# QuickCart

QuickCart is a comprehensive e-commerce platform designed to enhance the online shopping experience. This project leverages modern web technologies to provide a seamless and efficient shopping experience for users.

![QuickCart Thumbnail](thumb.png?raw=true "QuickCart")

## Features 🚀

- **User-Friendly Interface**: A seamless and intuitive interface for both desktop and mobile users. 📱💻
- **Secure Authentication**: Robust user authentication with JWT and secure password management. 🔒
- **Product Management**: Easy-to-use admin panel for managing products, categories, and subcategories. 🛠️
- **Shopping Cart & Checkout**: Efficient cart management with real-time updates and multiple payment options, including cash on delivery and Stripe integration. 🛒💳
- **Order Tracking**: Users can track their orders and view order history effortlessly. 📦
- **Responsive Design**: Built with React and Tailwind CSS for a responsive and modern look. 🌐
- **Backend Powered by Node.js & Express**: Ensuring fast and reliable server-side operations. 🚀
- **MongoDB Database**: For scalable and flexible data management. 🗄️
- **Image Management with Cloudinary**: Efficiently manage and optimize images using Cloudinary for seamless uploads and deletions. 📸
- **Docker Integration**: Simplified setup and deployment using Docker containers. 🐳
- **Redis Caching**: Enhanced performance with Redis for optimized data caching. ⚡

## Tech Stack 🛠️

- **Frontend**: React, Redux, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **Payment Integration**: Stripe
- **Image Management**: Cloudinary
- **Containerization**: Docker
- **Caching**: Redis

## Installation 🧑‍💻

### Prerequisites ✅

- Docker installed on your system.
- Docker Compose installed (optional, but recommended).

### Clone the Repository 📂

```bash
git clone https://github.com/yourusername/QuickCart.git
cd QuickCart
```

### Using Docker 🐳

1. **Build and Run the Containers**:
   - Navigate to the root of the project:
     ```bash
     docker-compose up --build
     ```

   This command will:
   - Build the frontend and backend Docker images.
   - Start the MongoDB and Redis containers.
   - Link the services together.

2. **Access the Application**:
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:3000`

### Without Docker ⚙️

1. **Install Dependencies**:
   - For the server:
     ```bash
     cd server
     npm install
     ```
   - For the client:
     ```bash
     cd client
     npm install
     ```

2. **Environment Variables**:
   - Create a `.env` file in the `server` directory and add your environment variables as shown in `.env.example`.

3. **Run the Application**:
   - Start the server:
     ```bash
     cd server
     npm run dev
     ```
   - Start the client:
     ```bash
     cd client
     npm run dev
     ```

4. **Access the Application**:
   - Open your browser and go to `http://localhost:3000` for the client.

## Docker Compose Configuration 🐳

The `docker-compose.yml` file sets up the following services:

- **Frontend**:
  - React application served via a development server.
- **Backend**:
  - Node.js API server.
- **Database**:
  - MongoDB container for data storage.
- **Caching**:
  - Redis container for performance optimization.

## Contributing 🤝

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

## License 📜

This project is licensed under the MIT License.

## Contact 📧

For any inquiries or feedback, please contact [anishkumar344567@gmail.com].

