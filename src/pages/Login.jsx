import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../store/features/auth/authThunk";
import { useDispatch, useSelector } from "react-redux";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const handleOnChange = (e) => {
    switch (e.target.id) {
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleLogIn = async (e) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(loginUser({ email, password }));

      // Check if login succeeded
      if (loginUser.fulfilled.match(resultAction)) {
        navigate("/"); // redirect to home
      } else {
        console.error("Login failed:", resultAction.payload);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

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

        {/* Login Form */}
        <form className="space-y-3" onSubmit={handleLogIn}>
          <input
            type="text"
            id="email"
            onChange={handleOnChange}
            placeholder="Username or Email"
            className="w-full px-2 py-1.5 border border-gray-600 bg-black text-white text-sm rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
          />
          <input
            type="password"
            id="password"
            onChange={handleOnChange}
            placeholder="Password"
            className="w-full px-2 py-1.5 border border-gray-600 bg-black text-white text-sm rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-1.5 text-sm rounded-md hover:bg-blue-600 transition"
          >
            Log In
          </button>
        </form>

        {/* Forgot Password */}
        <div className="text-center">
          <a href="#" className="text-xs text-blue-400">
            Forgot password?
          </a>
        </div>
      </div>

      {/* Footer - Sign Up link */}
      <div className="max-w-sm w-full text-center text-sm text-gray-400 mt-4 border border-gray-700 p-4 rounded-md">
        Don't have an account?{" "}
        <a href="#" className="text-blue-400 font-semibold">
          Sign up
        </a>
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
