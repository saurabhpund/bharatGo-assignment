# React E-commerce App

A modern e-commerce web application built with **React**, featuring dynamic product categories, user authentication, and shopping cart functionality. This project uses **TailwindCSS**, **React Router**, **Axios** for API calls, and **Supabase** for Authentication.

---

## Features

- **Dynamic Categories**: Fetches categories and products from [Fake Store API](https://api.escuelajs.co/api/v1/).  
- **Product Listing**: Displays all products or products by selected category.  
- **Search Functionality**: Filter products by name.  
- **User Authentication**: Login and Sign Up (authentication handled externally with Supabase; this project stores user info in localStorage).  
- **Account Page**: Displays logged-in user information.  
- **Shopping Cart**: Add/remove products and view cart summary.  
- **Responsive Design**: Works on mobile, tablet, and desktop screens.  
- **Mobile Drawer Navigation**: Collapsible menu for mobile devices.  
- **Order Pages**: View past orders and order details.  

---

## Packages Used

- [React](https://reactjs.org/) – Frontend library  
- [React Router DOM](https://reactrouter.com/) – Routing  
- [Axios](https://axios-http.com/) – API requests  
- [TailwindCSS](https://tailwindcss.com/) – Styling  
- [React Icons](https://react-icons.github.io/react-icons/) – Icons  
- [React Context API](https://reactjs.org/docs/context.html) – Global state management for products, cart, and authentication  

---

## Installation

1. **Clone the repository**
```bash
git clone https://github.com/saurabhpund/bharatGo-assignment.git
cd bharatGo-assignment
```
2. **Install dependencies**
```
npm install
```

3. **Run the development server**
```
npm run dev
```
Open http://localhost:5173
 to view the app in your browser.

**Project Structure**
```
├─ public/
│  └─ index.html                 # HTML entry point
├─ src/
│  ├─ components/                # Reusable React components
│  │  ├─ Header.jsx
│  │  ├─ Home.jsx
│  │  ├─ ProductList.jsx
│  │  ├─ CartModal.jsx
│  │  ├─ Account.jsx
│  │  ├─ Login.jsx
│  │  ├─ Signup.jsx
│  │  ├─ Order.jsx
│  │  └─ OrderItem.jsx
│  ├─ context/                   # React Context providers
│  │  ├─ authContext.jsx
│  │  ├─ cartContext.jsx
│  │  └─ productContext.jsx
│  ├─ supabase/                  # Supabase configuration
│  │  └─ supabaseConfig.js
│  ├─ App.jsx                     # Main app with routes
│  └─ main.jsx                    # React entry point
├─ .eslintrc.js                  # ESLint config
├─ package.json
├─ package-lock.json
├─ README.md
└─ vite.config.js     
```

