import { Route, Routes } from "react-router-dom";
import AuthLogin from "./pages/auth/Login";
import AuthRegister from "./pages/auth/Register";
import AuthLayout from "./components/auth/layout";

function App() {
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <h1>Header Component</h1>
      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
