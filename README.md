# QuickCart

QuickCart is a comprehensive e-commerce platform designed to enhance the online shopping experience. This project leverages modern web technologies to provide a seamless and efficient shopping experience for users.

![Alt text](thumb.png?raw=true "Title")

## Features

- **User-Friendly Interface**: A seamless and intuitive interface for both desktop and mobile users.
- **Secure Authentication**: Robust user authentication with JWT and secure password management.
- **Product Management**: Easy-to-use admin panel for managing products, categories, and subcategories.
- **Shopping Cart & Checkout**: Efficient cart management with real-time updates and multiple payment options, including cash on delivery and Stripe integration.
- **Order Tracking**: Users can track their orders and view order history effortlessly.
- **Responsive Design**: Built with React and Tailwind CSS for a responsive and modern look.
- **Backend Powered by Node.js & Express**: Ensuring fast and reliable server-side operations.
- **MongoDB Database**: For scalable and flexible data management.
- **Image Management with Cloudinary**: Efficiently manage and optimize images using Cloudinary for seamless uploads and deletions.
- **Docker Integration**: Simplified setup and deployment using Docker containers.

## Tech Stack

- **Frontend**: React, Redux, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **Payment Integration**: Stripe
- **Image Management**: Cloudinary
- **Containerization**: Docker

## Installation

### Prerequisites

- Docker installed on your system.
- Docker Compose installed (optional, but recommended).

### Clone the Repository

```bash
git clone https://github.com/yourusername/QuickCart.git
cd QuickCart
```

### Using Docker

1. **Build and Run the Containers**:
   - Navigate to the root of the project:
     ```bash
     docker-compose up --build
     ```

   This command will:
   - Build the frontend and backend Docker images.
   - Start the MongoDB container.
   - Link the services together.

2. **Access the Application**:
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:5000`

### Without Docker

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

## Docker Compose Configuration

The `docker-compose.yml` file sets up the following services:

- **Frontend**:
  - React application served via a development server.
- **Backend**:
  - Node.js API server.
- **Database**:
  - MongoDB container for data storage.

### Example `docker-compose.yml`

```yaml
version: '3.8'
services:
  web:
    depends_on:
      - api
    build:
      context: ./client
      dockerfile: Dockerfile.dev
    ports:
      - "5173:5173"
    container_name: Quickcart-web
    env_file:
      - ./client/.env
    develop:
      watch:
        - path: ./client/package*.json
          action: rebuild
        - path: ./client
          target: /app
          action: sync

  api: 
    depends_on:
      - mongodb
      - redis
    build:
      context: ./server
      dockerfile: Dockerfile.dev
    container_name: Quickcart-api
    ports:
      - "3000:3000"
    env_file:
      - ./server/.env
    develop:
      watch:
        - path: ./server/package*.json
          action: rebuild
        - path: ./server
          target: /app
          action: sync
  
  mongodb:
    image: mongo
    container_name: mongodb
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db

  redis:
    image: redis/redis-stack
    container_name: redis
    ports:
      - "6379:6379"
      - "8001:8001"
    
volumes:
  mongodb_data:
    driver: local
volumes:
  mongo-data:
```

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.

## Contact

For any inquiries or feedback, please contact [your email].

