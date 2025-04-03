import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import Products from "./components/Products";
import { ProductProvider } from "./components/ProductContext";
import Cart from "./components/Cart";
import Contact from "./Base/Contact";
import Orders from "./components/Orders";
import Payment from "./components/Payment";
import Credits from "./Base/Credits";
import { UserProvider } from "./components/userContext";
import { Toaster } from "react-hot-toast";
import Dash from "./admin/Dash";
import UserDetails from "./admin/UserDetails";
import EditProducts from "./admin/EditProducts";
import ViewOrders from "./admin/ViewOrders";
import SideDash from "./admin/SideDash";
import { AnimatePresence } from "framer-motion";
import AddProduct from "./admin/AddProduct";
import LoginSignup from "./components/Auth/LoginSignup";
// import Auth from "./components/Auth";

function App() {
  return (
    <AnimatePresence exitBeforeEnter>
    <UserProvider>
      <ProductProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signUp" element={<SignUp />} />
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="contact" element={<Contact />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/credit" element={<Credits />} />
          <Route path="/dash" element={<Dash />} />
          <Route path="/sideDash" element={<SideDash/>}/>
          <Route path="/userDetails" element={<UserDetails/>}/>
          <Route path="/viewOrders" element={<ViewOrders/>}/>
          <Route path="/editProducts" element={<EditProducts/>}/>
          <Route path="/addProducts" element={<AddProduct/>}/>
          <Route path="/login" element={<LoginSignup/>}/>
          {/* <Route path="/auth" element={<Auth/>}/> */}

        </Routes>
        <Toaster position="top-center" reverseOrder={false} />
      </ProductProvider>
    </UserProvider>
    </AnimatePresence>
  );
}

export default App;
