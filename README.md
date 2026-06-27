# ReSell Hub – Second-Hand Marketplace Platform

## Project Name
ReSell Hub – Second-Hand Marketplace Platform

## Project Purpose
ReSell Hub is a modern online marketplace where users can buy and sell pre-owned products safely and efficiently. The platform helps reduce waste, promote sustainable consumption, and give sellers a simple way to earn from unused items while helping buyers find affordable products.

## Live URL
- Live Site: TBD
- Client Repository: TBD
- Server Repository: TBD

## Admin Credentials
- Admin Email: admin@example.com
- Admin Password: admin123456

## Key Features
- User authentication with email/password and Google login
- Secure logout and JWT-based protected routes
- Role-based dashboards for Buyer, Seller, and Admin
- Product listing, browsing, searching, sorting, and pagination
- Product details page with seller information
- Wishlist, orders, and payment history
- Stripe-based secure checkout and payment success flow
- Admin moderation for users, products, orders, and transactions
- Responsive marketplace UI with modern layout and animations
- Loading states, skeletons, and custom error/404 pages

## Main Pages
### Public Pages
- Home
- All Products
- Product Details
- Categories
- About Us
- Contact Us
- Login / Register

### Private Pages
- Buyer Dashboard
- Seller Dashboard
- Admin Dashboard
- Add Product
- My Products
- My Orders
- Wishlist
- Profile Settings

## Role-Based Features
### Buyer
- View dashboard overview
- Manage orders
- Add/remove products from wishlist
- View payment history
- Update profile information

### Seller
- Manage products with CRUD operations
- Add new product listings with images, category, condition, price, and stock
- Review incoming orders
- Accept/reject orders and update delivery status
- View sales analytics

### Admin
- Manage all users, products, orders, and payments
- Approve/reject products
- Block/unblock users
- Monitor platform analytics and transaction activity

## Authentication System
- Registration using username, email, and password
- Google sign-in support
- Secure login/logout
- JWT authentication for private routes and APIs
- Token verification on protected backend endpoints

## Payment System
- Stripe payment gateway integration
- Secure checkout process
- Order creation after successful payment
- Payment records stored in the database
- Buyer payment history with transaction ID, amount, status, and date

## Challenge Requirements Covered
- Advanced search and sorting by name/category and price
- Pagination on the products page
- JWT token verification for protected APIs
- Role-based authorization

## UI / Design Requirements
- Modern and professional marketplace design
- Consistent heading, spacing, and button styles
- Responsive layout for mobile, tablet, and desktop
- Full-width dashboard UI with responsive sidebar
- Charts and analytics pages with a consistent theme
- Framer Motion / Motion animations used in hero, cards, statistics, and extra sections

## Optional Features Included
- Dark / Light Theme Toggle
- Recently Viewed Products
- Seller Verification Badge
- Product Comparison Feature

## Tech Stack
- Next.js 16
- React 19
- Tailwind CSS
- Better Auth
- MongoDB
- Stripe
- Motion (Framer Motion)
- HeroUI
- React Hook Form
- React Hot Toast
- React Icons

## NPM Packages Used
- better-auth
- @better-auth/mongo-adapter
- mongodb
- motion
- next
- react
- react-dom
- react-hook-form
- react-hot-toast
- react-icons
- stripe
- @stripe/stripe-js
- @heroui/react
- @heroui/styles
- tailwindcss

## Security Requirements
The project uses environment variables for sensitive credentials, including:
- Better Auth keys
- MongoDB credentials
- JWT secret key
- Stripe secret keys

## Environment Variables
Create a .env.local file and configure the following values:

```env
BETTER_AUTH_SECRET=your_secret_key
BETTER_AUTH_URL=http://localhost:3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```

## Installation
```bash
pnpm install
pnpm dev
```

## Build and Run
```bash
pnpm build
pnpm start
```

## Deployment Notes
- Ensure CORS is configured properly
- Avoid 404 and 504 issues by verifying all routes and API endpoints
- Ensure private routes remain logged in after reload
- Use secure environment variables in production
- Deploy the frontend and backend with correct domain configuration for authentication and Stripe callbacks

## Project Structure Overview
- Client: Next.js frontend with app router
- API routes: Authentication, checkout, product, and dashboard related logic
- Database: MongoDB collections for users, products, orders, reviews, payments

## Future Improvements
- Add real-time notifications
- Implement report management for suspicious listings
- Expand analytics and reporting dashboards
- Add advanced filtering and seller public profile enhancements
