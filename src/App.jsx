import { Route, Routes } from "react-router-dom";
import AuthLogin from "./pages/auth/Login";
import AuthRegister from "./pages/auth/Register";
import AuthLayout from "./components/auth/layout";
import AdminLayout from "./components/admin-view/layout";
import AdminDashBoard from "./pages/admin-view/dashboard";
import AdminProducts from "./pages/admin-view/product";
import AdminOrders from "./pages/admin-view/orders";
import AdminFeatures from "./pages/admin-view/feature";
import ShoppingLayout from "./components/shopping-view/layout";
import NotFound from "./pages/not-found";
import ShoppingHome from "./pages/shopping-view/home";
import ShoppingList from "./pages/shopping-view/listing";
import ShoppingCheckout from "./pages/shopping-view/checkout";
import ShoppingAccount from "./pages/shopping-view/account";
import CheckAuth from "./components/common/checkauth";
import UnAuthPage from "./pages/unauth-page";

function App() {
  const isAuthenticted = true;
  const user = { name: "gnani", role: "user" };

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        {/* Auth related route */}
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticted={isAuthenticted} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>

        {/* Admin related Route */}
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticted={isAuthenticted} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashBoard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="features" element={<AdminFeatures />} />
        </Route>

        {/* Shopping Related Route */}
        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticted={isAuthenticted} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingList />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="account" element={<ShoppingAccount />} />
        </Route>

        {/* Route For Not Found */}
        <Route path="*" element={<NotFound />} />
        <Route path="/unauth-page" element={<UnAuthPage />} />
      </Routes>
    </div>
  );
}

export default App;
