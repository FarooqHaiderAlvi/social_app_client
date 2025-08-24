import { useState, useRef } from "react";
import { X } from "lucide-react";
import Cropper from "react-easy-crop";
import { createPost } from "../api/posts";

export default function CreatePostModal({ onClose }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [aspect, setAspect] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const createImage = (url) =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener("load", () => resolve(image));
      image.addEventListener("error", (error) => reject(error));
      image.setAttribute("crossOrigin", "anonymous");
      image.src = url;
    });

  const getCroppedImg = async (imageSrc, crop) => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = crop.width;
    canvas.height = crop.height;

    ctx.drawImage(
      image,
      crop.x,
      crop.y,
      crop.width,
      crop.height,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => {
          resolve(blob);
        },
        "image/jpeg",
        0.9
      );
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    setIsUploading(true);
    try {
      const formData = new FormData();

      let fileToUpload = selectedFile;
      if (croppedAreaPixels) {
        fileToUpload = await getCroppedImg(
          URL.createObjectURL(selectedFile),
          croppedAreaPixels
        );
      }

      formData.append("attachment", fileToUpload);
      formData.append("description", caption);

      await createPost(formData);
      onClose();
    } catch (error) {
      console.error("Error uploading post:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-70 z-40"
        onClick={onClose}
      />

      <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
        <div
          className="bg-black rounded-lg w-[736px] h-[550px] border border-gray-800 overflow-hidden pointer-events-auto flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center p-4 border-b border-gray-800 bg-black z-10">
            <button
              onClick={onClose}
              className="text-white hover:text-gray-300"
            >
              <X size={24} />
            </button>
            <h2 className="text-white font-semibold text-lg">
              Create new post
            </h2>
            <button
              onClick={handleSubmit}
              className={`text-blue-500 font-semibold ${
                isUploading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:text-blue-400"
              }`}
              disabled={isUploading}
            >
              {isUploading ? "Sharing..." : "Share"}
            </button>
          </div>

          <div className="flex-1 p-4 flex flex-col gap-3 overflow-y-auto">
            {!selectedFile ? (
              <div
                className="border-2 border-dashed border-gray-700 rounded-lg flex-1 flex flex-col justify-center items-center text-center cursor-pointer hover:border-gray-600 transition-colors"
                onClick={() => fileInputRef.current.click()}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*,video/*"
                  className="hidden"
                />
                <svg
                  className="w-12 h-12 text-gray-400 mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p className="text-white font-semibold">
                  Drag photos and videos here
                </p>
                <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded text-sm font-semibold transition-colors">
                  Select from computer
                </button>
              </div>
            ) : (
              <>
                <div className="relative w-full h-[250px] bg-black">
                  <Cropper
                    image={URL.createObjectURL(selectedFile)}
                    crop={crop}
                    zoom={zoom}
                    aspect={aspect}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                    objectFit="contain"
                  />
                </div>

                <div className="flex justify-center gap-2 py-1">
                  {[
                    { label: "1:1", value: 1 },
                    { label: "4:5", value: 4 / 5 },
                    { label: "16:9", value: 16 / 9 },
                  ].map((item) => (
                    <button
                      key={item.label}
                      onClick={() => setAspect(item.value)}
                      className={`text-white text-xs px-2 py-1 border rounded hover:bg-gray-700 ${
                        aspect === item.value ? "bg-gray-700" : ""
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-white">Zoom</span>
                  <input
                    type="range"
                    min={1}
                    max={3}
                    step={0.1}
                    value={zoom}
                    onChange={(e) => setZoom(parseFloat(e.target.value))}
                    className="flex-1"
                  />
                </div>

                <div className="flex-1 flex flex-col min-h-[100px]">
                  <label className="block text-white text-sm font-medium mb-1">
                    Caption
                  </label>
                  <textarea
                    placeholder="Write a caption..."
                    className="bg-black text-white border border-gray-700 rounded p-2 w-full flex-1 resize-none focus:outline-none focus:border-gray-500 min-h-[80px]"
                    rows="3"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
