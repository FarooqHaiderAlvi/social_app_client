export const Icons = {
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
      aria-label="inbox"
      className={`w-6 h-6 ${active ? "text-white" : "text-gray-400"}`}
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d={"M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"}
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"
      ></path>
    </svg>
  ),
  // Update the Notifications icon in your Icons object
  Notifications: ({ active, unreadCount }) => (
    <div className="relative">
      <svg
        aria-label="Notifications"
        className={`w-6 h-6 ${active ? "text-white" : "text-gray-400"}`}
        fill="currentColor"
        height="24"
        role="img"
        viewBox="0 0 24 24"
        width="24"
      >
        <title>Notifications</title>
        <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
      </svg>
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
          {unreadCount}
        </span>
      )}
    </div>
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
