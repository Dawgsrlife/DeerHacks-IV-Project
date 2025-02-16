import React, { useState } from "react";
import Card from "components/card";
import { BsUpload } from "react-icons/bs";

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [aiTags, setAiTags] = useState([]); // Store AI-generated tags

  // Handle File Selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file && ["image/png", "image/jpg", "image/jpeg"].includes(file.type)) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      alert("Invalid file format! Please upload a PNG, JPG, or JPEG.");
    }
  };

  // Handle Upload
  const handleUpload = async () => {
    if (!selectedFile || !description.trim()) {
      alert("Please select a file and enter a description.");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("description", description);

    try {
      const response = await fetch("http://127.0.0.1:5000/upload_with_tag", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        alert("Upload successful!");
        setAiTags(result.memory.tags || []); // Store AI tags
        setSelectedFile(null);
        setPreviewUrl(null);
        setDescription("");
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      alert("Upload failed. Please try again.");
    }

    setUploading(false);
  };

  return (
      <Card extra={"w-full h-full p-4"}>
        <div className="mb-auto flex flex-col items-center justify-center">
          <div className="mt-2 flex items-center justify-center rounded-full bg-lightPrimary p-[26px] text-5xl font-bold text-brand-500 dark:!bg-navy-700 dark:text-white">
            <BsUpload />
          </div>
          <h4 className="mb-px mt-3 text-2xl font-bold text-navy-700 dark:text-white">
            Upload AI Memory
          </h4>
          <p className="px-5 text-center text-base font-normal text-gray-600 md:!px-0 xl:!px-8">
            Upload images (PNG, JPG, JPEG) for AI processing and memory tagging.
          </p>
        </div>

        {/* File Upload Section */}
        <div className="flex flex-col items-center">
          <input
              type="file"
              accept="image/png, image/jpg, image/jpeg"
              className="hidden"
              id="fileInput"
              onChange={handleFileChange}
          />
          <label
              htmlFor="fileInput"
              className="cursor-pointer rounded-lg bg-brand-500 px-4 py-2 text-white hover:bg-brand-600"
          >
            Choose File
          </label>

          {previewUrl && (
              <div className="mt-4">
                <img
                    src={previewUrl}
                    alt="Preview"
                    className="h-32 w-32 rounded-lg object-cover"
                />
              </div>
          )}

          {/* Description Input */}
          <input
              type="text"
              placeholder="Enter a short description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-4 p-2 w-full border rounded-md text-gray-800 dark:text-white dark:bg-navy-900"
          />

          <button
              onClick={handleUpload}
              disabled={uploading}
              className="mt-4 rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600 disabled:bg-gray-400"
          >
            {uploading ? "Uploading..." : "Upload Image"}
          </button>
        </div>

        {/* Display AI Tags */}
        {aiTags.length > 0 && (
            <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
              <h3 className="text-lg font-bold text-navy-700 dark:text-white">AI-Generated Tags:</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {aiTags.map((tag, index) => (
                    <span key={index} className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg">
                {tag}
              </span>
                ))}
              </div>
            </div>
        )}
      </Card>
  );
};

export default Upload;
