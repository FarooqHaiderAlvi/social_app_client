import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import spinner from "../assets/Spinner2.gif";
import { useNavigate } from "react-router-dom";
import {
  signupUser,
  fetchLoggedInUser,
} from "../store/features/auth/authThunk";
import { useSelector, useDispatch } from "react-redux";
export default function SignUp() {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { user, isLoadingUser } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      dispatch(fetchLoggedInUser());
    }
  }, []);

  useEffect(() => {
    if (user) {
      navigate("/"); // Redirect to home if logged in
    }
  }, [user, navigate]);

  const handleOnChange = (e) => {
    switch (e.target.id) {
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      case "fullName":
        setFullName(e.target.value);
        break;
      case "username":
        setUsername(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleSignUp = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const resultAction = dispatch(
        signupUser({ email, password, fullName, username })
      );

      // Check if login succeeded
      if (signupUser.fulfilled.match(resultAction)) {
        console.log("signup successful:", resultAction.payload);
        navigate("/"); // redirect to home
      } else {
        console.error("signup failed:", resultAction.payload);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (isLoadingUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <img
          src={spinner}
          style={{ height: "100px", width: "100px" }}
          alt="Loading..."
          className="h-10 w-10"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black py-12 px-4 text-white">
      <div className="max-w-sm w-full space-y-4 border border-gray-700 p-6 rounded-md shadow-sm">
        {/* Instagram Logo */}
        <div
          className="mx-auto mb-2"
          style={{
            backgroundImage:
              "url('https://static.cdninstagram.com/rsrc.php/v4/yB/r/E7m8ZCMOFDS.png')",
            backgroundPosition: "0px 0px",
            backgroundSize: "auto",
            backgroundRepeat: "no-repeat",
            width: "175px",
            height: "51px",
          }}
          role="img"
          aria-label="Instagram logo"
        ></div>

        {/* Subtitle */}
        <p className="text-center text-sm text-gray-400">
          Sign up to see photos and videos from your friends.
        </p>

        {/* Sign Up Form */}
        <form className="space-y-3" onSubmit={handleSignUp}>
          <input
            type="text"
            id="email"
            onChange={handleOnChange}
            placeholder="Email"
            className="w-full px-2 py-1.5 border border-gray-600 bg-black text-white text-sm rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
          />
          <input
            type="text"
            id="fullName"
            onChange={handleOnChange}
            placeholder="Full Name"
            className="w-full px-2 py-1.5 border border-gray-600 bg-black text-white text-sm rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
          />
          <input
            type="text"
            id="username"
            onChange={handleOnChange}
            placeholder="Username"
            className="w-full px-2 py-1.5 border border-gray-600 bg-black text-white text-sm rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
          />
          <input
            type="password"
            id="password"
            onChange={handleOnChange}
            placeholder="Password"
            className="w-full px-2 py-1.5 border border-gray-600 bg-black text-white text-sm rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
          />

          <p className="text-xs text-gray-400 text-center leading-snug px-2">
            By signing up, you agree to our{" "}
            <span className="text-blue-400 cursor-pointer">Terms</span>,{" "}
            <span className="text-blue-400 cursor-pointer">Privacy Policy</span>{" "}
            and{" "}
            <span className="text-blue-400 cursor-pointer">Cookies Policy</span>
            .
          </p>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-1.5 text-sm rounded-md hover:bg-blue-600 transition flex justify-center items-center h-[36px]"
            disabled={loading}
          >
            {loading ? (
              <img src={spinner} alt="Loading..." className="h-6 w-6" />
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
      </div>

      {/* Footer - Log In link */}
      <div className="max-w-sm w-full text-center text-sm text-gray-400 mt-4 border border-gray-700 p-4 rounded-md">
        Have an account?{" "}
        <Link to="/login" className="text-blue-400 font-semibold">
          Log in
        </Link>
      </div>

      {/* App Download Badges */}
      <div className="max-w-sm w-full flex justify-center gap-2 mt-6">
        <a
          href="https://play.google.com/store/apps/details?id=com.instagram.android"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src="https://static.cdninstagram.com/rsrc.php/v4/yz/r/c5Rp7Ym-Klz.png"
            alt="Get it on Google Play"
            className="h-10"
          />
        </a>
        <a
          href="ms-windows-store://pdp/?productid=9nblggh5l9xt"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src="https://static.cdninstagram.com/rsrc.php/v4/yu/r/EHY6QnZYdNX.png"
            alt="Get it from Microsoft"
            className="h-10"
          />
        </a>
      </div>
    </div>
  );
}
