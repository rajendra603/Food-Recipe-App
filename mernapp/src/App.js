import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Screens/Home";
import Login from "./Screens/Login";
import Signup from "./Screens/Signup";
import { CartProvider } from "./Components/ContestReducer";
import Cart from "./Screens/Cart";
import About from "./Components/About";
import Contact from "./Components/Contact";
import MyOrders from "./Components/MyOrders";

function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/createuser" element={<Signup />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/myorders" element={<MyOrders />} />
      </Routes>
    </CartProvider>
  );
}

export default App;
