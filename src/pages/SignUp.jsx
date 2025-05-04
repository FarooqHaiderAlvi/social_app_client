import React from "react";

export default function SignUp() {
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
        <form className="space-y-3">
          <input
            type="text"
            placeholder="Mobile Number or Email"
            className="w-full px-2 py-1.5 border border-gray-600 bg-black text-white text-sm rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-2 py-1.5 border border-gray-600 bg-black text-white text-sm rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Username"
            className="w-full px-2 py-1.5 border border-gray-600 bg-black text-white text-sm rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
          />
          <input
            type="password"
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
            className="w-full bg-blue-500 text-white py-1.5 text-sm rounded-md hover:bg-blue-600 transition"
          >
            Sign Up
          </button>
        </form>
      </div>

      {/* Footer - Log In link */}
      <div className="max-w-sm w-full text-center text-sm text-gray-400 mt-4 border border-gray-700 p-4 rounded-md">
        Have an account?{" "}
        <a href="#" className="text-blue-400 font-semibold">
          Log in
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
