import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { fetchLoggedInUser } from "../store/features/auth/authThunk";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const { user, isLoadingUser } = useSelector((state) => state.auth);

  useEffect(() => {
    console.log("useEffect triggered"); // Debugging line
    if (user === null) {
      dispatch(fetchLoggedInUser());
    }
  }, []);

  if (isLoadingUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }
  console.log("User in ProtectedRoute:", user); // Debugging line
  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
