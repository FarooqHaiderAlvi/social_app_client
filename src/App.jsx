import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./Components/Home";
import ProtectedRoute from "./Components/ProtectedRoute";
function App() {
  const user = useSelector((state) => state.auth.user);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
