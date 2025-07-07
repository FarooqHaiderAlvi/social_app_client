import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, Outlet } from "react-router-dom";
const Icons = {
  Home: ({ active }) => (
    <svg
      aria-label="Home"
      className={`w-6 h-6 ${active ? "text-white" : "text-gray-400"}`}
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d={
          active
            ? "M22 23h-6.001a1 1 0 0 1-1-1v-5.455a2.997 2.997 0 1 0-5.993 0V22a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V11.543a1.002 1.002 0 0 1 .31-.724l10-9.543a1.001 1.001 0 0 1 1.38 0l10 9.543a1.002 1.002 0 0 1 .31.724V22a1 1 0 0 1-1 1Z"
            : "M9.005 16.545a2.997 2.997 0 0 1 2.997-2.997h0A2.997 2.997 0 0 1 15 16.545V22h7V11.543L12 2 2 11.543V22h7.005Z"
        }
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"
      ></path>
    </svg>
  ),
  Search: ({ active }) => (
    <svg
      aria-label="Search"
      className={`w-6 h-6 ${active ? "text-white" : "text-gray-400"}`}
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      ></path>
      <line
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        x1="16.511"
        x2="22"
        y1="16.511"
        y2="22"
      ></line>
    </svg>
  ),
  Messages: ({ active }) => (
    <svg
      aria-label="Direct"
      className={`w-6 h-6 ${active ? "text-white" : "text-gray-400"}`}
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d={
          active
            ? "M22.5 2.5h-21a1 1 0 0 0-1 1v18a1 1 0 0 0 1 1h21a1 1 0 0 0 1-1v-18a1 1 0 0 0-1-1ZM12 7.5a4.5 4.5 0 1 1-4.5 4.5A4.5 4.5 0 0 1 12 7.5Z"
            : "M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"
        }
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"
      ></path>
    </svg>
  ),
  Create: () => (
    <svg
      aria-label="New post"
      className="w-6 h-6 text-gray-400"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      ></path>
      <line
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        x1="6.545"
        x2="17.455"
        y1="12.001"
        y2="12.001"
      ></line>
      <line
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        x1="12.003"
        x2="12.003"
        y1="6.545"
        y2="17.455"
      ></line>
    </svg>
  ),
  Profile: () => (
    <svg
      aria-label="Profile"
      className="w-6 h-6 text-gray-400"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <circle
        cx="12"
        cy="12"
        fill="none"
        r="11"
        stroke="currentColor"
        strokeWidth="2"
      ></circle>
      <path
        d="M17.5 17.5A6.5 6.5 0 0 0 12 11a6.5 6.5 0 0 0-5.5 6.5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      ></path>
      <circle
        cx="12"
        cy="8"
        fill="none"
        r="3"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      ></circle>
    </svg>
  ),
};
export default function Layout() {
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      <div
        className="w-64 fixed h-full border-r border-gray-900 p-4 hidden md:block"
        style={{ backgroundColor: "rgb(0, 0, 0)" }}
      >
        <div className="flex items-center p-2 mb-8">
          <svg
            aria-label="Instagram"
            className="w-8 h-8 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"></path>
          </svg>
          <span className="ml-2 text-xl font-semibold text-white">
            Instagram
          </span>
        </div>

        <nav>
          <Link
            to="/"
            className={`flex items-center p-3 rounded-lg ${
              location.pathname === "/" ? "text-white" : "text-gray-400"
            }`}
          >
            <Icons.Home active={location.pathname === "/"} />
            <span className="ml-3">Home</span>
          </Link>
          <Link
            to="/search"
            className={`flex items-center p-3 rounded-lg ${
              location.pathname === "/search" ? "text-white" : "text-gray-400"
            }`}
          >
            <Icons.Search active={location.pathname === "/search"} />
            <span className="ml-3">Search</span>
          </Link>
          <Link
            to="/inbox"
            className={`flex items-center p-3 rounded-lg ${
              location.pathname === "/messages" ? "text-white" : "text-gray-400"
            }`}
          >
            <Icons.Messages active={location.pathname === "/messages"} />
            <span className="ml-3">Messages</span>
          </Link>
          <Link
            to="/create"
            className="flex items-center p-3 rounded-lg text-gray-400"
          >
            <Icons.Create />
            <span className="ml-3">Create</span>
          </Link>
          <Link
            to="/profile"
            className="flex items-center p-3 rounded-lg text-gray-400"
          >
            <Icons.Profile />
            <span className="ml-3">Profile</span>
          </Link>
        </nav>

        {user && (
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center p-3 rounded-lg text-gray-400">
              <img
                src={
                  user.profilePicture ||
                  "https://randomuser.me/api/portraits/men/1.jpg"
                }
                alt="Profile"
                className="w-6 h-6 rounded-full"
              />
              <span className="ml-3">{user.username}</span>
            </div>
          </div>
        )}
      </div>

      <main className="flex-1 md:ml-64 pb-16 md:pb-0 overflow-y-auto">
        <Outlet /> {/* 👈 This is crucial! */}
      </main>
      {/* Mobile Bottom Navigation - Pure Black */}
      <div
        className="md:hidden fixed bottom-0 left-0 right-0 border-t border-gray-900 flex justify-around py-3"
        style={{ backgroundColor: "rgb(0, 0, 0)" }}
      >
        <Link to="/" className="p-2">
          <Icons.Home active={location.pathname === "/"} />
        </Link>
        <Link to="/search" className="p-2">
          <Icons.Search active={location.pathname === "/search"} />
        </Link>
        <Link to="/create" className="p-2">
          <Icons.Create />
        </Link>
        <Link to="/messages" className="p-2">
          <Icons.Messages active={location.pathname === "/messages"} />
        </Link>
        <Link to="/profile" className="p-2">
          <Icons.Profile />
        </Link>
      </div>
    </>
  );
}
