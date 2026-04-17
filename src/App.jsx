// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Navbar from "./components/Navbar";
// import Toast from "./components/Toast";

// import Home from "./pages/Home";
// import Cart from "./pages/Card";
// import Wishlist from "./pages/Wishlist";
// import Dashboard from "./pages/Dashboard";

// import { CartProvider } from "./context/CardContext";
// import { WishlistProvider } from "./context/WishlistContext";
// import { ThemeProvider } from "./context/ThemeContext";
// import { SearchProvider } from "./context/SearchContext";

// export default function App() {
//   return (
//     <ThemeProvider>
//       <CartProvider>
//         <WishlistProvider>
//           <SearchProvider>

//             <BrowserRouter>
//               <Navbar />
//               <Toast />

//               <Routes>
//                 <Route path="/" element={<Home />} />
//                 <Route path="/cart" element={<Cart />} />
//                 <Route path="/wishlist" element={<Wishlist />} />
//                 <Route path="/dashboard" element={<Dashboard />} />
//               </Routes>
//             </BrowserRouter>

//           </SearchProvider>
//         </WishlistProvider>
//       </CartProvider>
//     </ThemeProvider>
//   );
// }

































import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Toast from "./components/Toast";
import Footer from "./components/Footer"; // CHANGED: import new Footer

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Dashboard from "./pages/Dashboard";

import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { ThemeProvider } from "./context/ThemeContext";
import { SearchProvider } from "./context/SearchContext";

export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <WishlistProvider>
          <SearchProvider>
            <BrowserRouter>
              <Navbar />
              <Toast />

              {/* CHANGED: min-h so footer stays at bottom on short pages */}
              <main className="min-h-screen">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
              </main>

              {/* CHANGED: Footer added here — shows on all pages */}
              <Footer />

            </BrowserRouter>
          </SearchProvider>
        </WishlistProvider>
      </CartProvider>
    </ThemeProvider>
  );
}