import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./Components/Home";
import Inbox from "./Components/Inbox";
import ProtectedRoute from "./Components/ProtectedRoute";
import Layout from "./Components/Layout";
function App() {
  const user = useSelector((state) => state.auth.user);

  return (
    <BrowserRouter>
      <Routes>
        {/* No Layout for login/signup */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Layout with ProtectedRoute for everything else */}
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/inbox" element={<Inbox />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
