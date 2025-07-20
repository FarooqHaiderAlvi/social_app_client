import React from "react";

export default function Stories() {
  return (
    <>
      <div className="border border-gray-900 rounded-lg p-4 mb-4 overflow-x-auto">
        <div className="flex space-x-4">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full border-2 border-pink-500 p-0.5">
                <img
                  src={`https://randomuser.me/api/portraits/${
                    i % 2 === 0 ? "women" : "men"
                  }/${i + 10}.jpg`}
                  alt="Story"
                  className="w-full h-full rounded-full"
                />
              </div>
              <span className="text-xs mt-1 truncate w-16 text-center text-gray-300">
                user{i}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
