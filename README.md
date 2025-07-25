# 3legant - Modern E-commerce Store

A sleek and responsive e-commerce application built with Next.js 14, TypeScript, and Tailwind CSS. This project showcases a complete shopping experience with product browsing, detailed product views, and cart management functionality.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38B2AC?style=flat-square&logo=tailwind-css)
![Zustand](https://img.shields.io/badge/Zustand-State%20Management-orange?style=flat-square)

## ✨ Features

### 🛍️ **Core E-commerce Functionality**
- **Product Catalog** - Browse products with beautiful card layouts
- **Category Filtering** - Filter products by categories (men's clothing, women's clothing, electronics, jewelry)
- **Product Details** - Comprehensive product pages with image galleries and specifications
- **Shopping Cart** - Add, remove, and manage cart items with quantity controls
- **Responsive Design** - Seamless experience across desktop, tablet, and mobile devices

### ⭐ **Advanced Features**
- **Dynamic Star Ratings** - Accurate rating display based on API data (e.g., 3.9 shows 3 full + 1 partial star)
- **Real-time Cart Updates** - Live cart badge and totals
- **Loading States** - Skeleton loaders and loading indicators for better UX
- **Error Handling** - Comprehensive error boundaries with retry functionality
- **Image Optimization** - Next.js Image component with lazy loading
- **State Persistence** - Cart state maintained across page navigation

### 🎨 **Design & UX**
- **Modern UI** - Clean, minimalist design inspired by premium e-commerce sites
- **Smooth Animations** - Hover effects, transitions, and micro-interactions
- **Professional Typography** - Inter font for excellent readability
- **Accessibility** - Proper ARIA labels and keyboard navigation support

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18.17 or later
- **npm**, **yarn**, or **pnpm** package manager

### Installation

1. **Clone the repository**
```bash
git clone [<your-repository-url>](https://github.com/Ajstudy10/Frontend_Assesment_Ebra)
cd ecommerce-store
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Start the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000) to see the application in action.

## 🏗️ Project Structure

```
├── app/                    # Next.js 14 App Router
│   ├── globals.css        # Global styles and Tailwind imports
│   ├── layout.tsx         # Root layout with header
│   ├── page.tsx           # Home page (Product listing)
│   ├── product/[id]/      # Dynamic product detail pages
│   │   └── page.tsx       # Product detail page
│   └── cart/              # Shopping cart
│       └── page.tsx       # Cart management page
├── components/            # Reusable React components
│   ├── Header.tsx         # Navigation header with cart badge
│   ├── ProductCard.tsx    # Product card with ratings
│   ├── Loading.tsx        # Loading states and skeletons
│   └── ErrorMessage.tsx   # Error handling component
├── store/                 # State management
│   └── cartStore.ts       # Zustand cart store
├── services/              # External API integration
│   └── api.ts             # Fake Store API service
├── types/                 # TypeScript definitions
│   └── index.ts           # Global type definitions
├── public/                # Static assets
└── Configuration files    # Next.js, TypeScript, Tailwind configs
```

## 🔧 Tech Stack

### **Frontend Framework**
- **Next.js 14** - React framework with App Router
- **React 18** - UI library with modern hooks
- **TypeScript** - Type-safe JavaScript

### **Styling & UI**
- **Tailwind CSS** - Utility-first CSS framework
- **CSS Modules** - Scoped styling
- **Inter Font** - Modern typography

### **State Management**
- **Zustand** - Lightweight state management
- **React Hooks** - Built-in state management

### **Data & API**
- **Fake Store API** - Product data source
- **Native Fetch** - HTTP client
- **Error Boundaries** - Error handling

### **Development Tools**
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Type checking

## 📡 API Integration

The application integrates with the [Fake Store API](https://fakestoreapi.com/docs):

```typescript
// Fetch all products
GET https://fakestoreapi.com/products

// Fetch single product
GET https://fakestoreapi.com/products/{id}

// Fetch categories
GET https://fakestoreapi.com/products/categories
```

### **API Features**
- **Error Handling** - Network failures and 404 responses
- **Loading States** - Progressive loading indicators
- **Retry Logic** - Automatic retry on failures
- **Type Safety** - Full TypeScript interfaces

## 🛒 Cart Management

The shopping cart uses Zustand for state management:

```typescript
// Cart operations
addItem(product)           // Add product to cart
removeItem(id)            // Remove item completely
updateQuantity(id, qty)   // Update item quantity
getTotalPrice()           // Calculate total price
getTotalItems()           // Get total item count
clearCart()              // Empty the cart
```

### **Cart Features**
- **Quantity Management** - Increase/decrease item quantities
- **Duplicate Handling** - Smart quantity updates for existing items
- **Price Calculations** - Real-time total calculations
- **Persistence** - Cart state maintained across navigation

## 🎨 Component Library

### **ProductCard**
- Displays product image, title, price, and rating
- Hover effects and animations
- Responsive design
- Dynamic star ratings

### **Header**
- Navigation menu
- Cart badge with item count
- Search and user icons
- Mobile-responsive

### **Loading Components**
- Skeleton loaders for products
- Loading spinners
- Progressive loading states

## 📱 Responsive Design

The application is fully responsive with breakpoints:

- **Mobile** - 320px and up
- **Tablet** - 768px and up
- **Desktop** - 1024px and up
- **Large Desktop** - 1280px and up

### **Mobile Features**
- Touch-friendly interactions
- Optimized layouts
- Fast loading times
- Smooth scrolling

## 🔍 SEO & Performance

### **Next.js Optimizations**
- **Image Optimization** - Automatic WebP conversion and lazy loading
- **Code Splitting** - Automatic bundle splitting
- **Static Generation** - Fast page loads
- **Metadata** - Proper SEO tags

### **Performance Features**
- **Lazy Loading** - Images and components
- **Efficient Re-renders** - Optimized React components
- **Bundle Optimization** - Tree shaking and minification

## 🚀 Deployment

### **Build for Production**
```bash
npm run build
npm run start
```

### **Environment Variables**
No environment variables required - uses public Fake Store API.

## 🧪 Testing

```bash
# Run ESLint
npm run lint

# Type checking
npx tsc --noEmit

# Build test
npm run build
```

## 🐛 Known Issues & Limitations

- **API Dependency** - Relies on external Fake Store API availability
- **Image Loading** - Product images may load slowly from external sources
- **Limited Products** - Constrained to Fake Store API product catalog
- **No Authentication** - Currently no user login/registration

*This project demonstrates modern React development practices and serves as a showcase for full-stack web development skills.*
