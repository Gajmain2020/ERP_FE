/* eslint-disable @typescript-eslint/no-unused-vars */
import { SetStateAction, useState } from "react";
import axios from "axios";

const UploadForm = () => {
  const [pdf, setPdf] = useState(null);
  const [image, setImage] = useState(null);
  const [pdfTitle, setPdfTitle] = useState("");
  const [imageTitle, setImageTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle PDF input change
  const handlePdfChange = (e: {
    target: { files: SetStateAction<null>[] };
  }) => {
    setPdf(e.target.files[0]);
  };

  // Handle Image input change
  const handleImageChange = (e: {
    target: { files: SetStateAction<null>[] };
  }) => {
    setImage(e.target.files[0]);
  };

  // Handle PDF title input change
  const handlePdfTitleChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setPdfTitle(e.target.value);
  };

  // Handle Image title input change
  const handleImageTitleChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setImageTitle(e.target.value);
  };

  // Handle PDF upload submission
  const handlePdfSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!pdf || !pdfTitle) {
      setMessage("Please provide both the title and select a PDF.");
      return;
    }

    const formData = new FormData();
    formData.append("pdf", pdf);
    formData.append("title", pdfTitle);

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5500/api/upload/pdf",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Error uploading PDF.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Image upload submission
  const handleImageSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!image || !imageTitle) {
      setMessage("Please provide both the title and select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", imageTitle);

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5500/api/upload/image",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Error uploading image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Upload Your Files</h2>

      {/* PDF Upload Card */}
      <div className="max-w-md mx-auto bg-white shadow-md p-8 rounded-md">
        <h3>Upload PDF</h3>
        <form onSubmit={handlePdfSubmit}>
          <input
            type="text"
            placeholder="Title for PDF"
            value={pdfTitle}
            onChange={handlePdfTitleChange}
            className="w-full mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
          <input
            type="file"
            accept="application/pdf"
            onChange={handlePdfChange}
            className="w-full mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />

          <button type="submit" disabled={loading}>
            {loading ? "Uploading..." : "Upload PDF"}
          </button>
        </form>
      </div>

      {/* Image Upload Card */}
      <div className="max-w-md mx-auto bg-white shadow-md p-8 rounded-md mb-10">
        <h3 className="text-center text-xl">Upload Image</h3>
        <form onSubmit={handleImageSubmit}>
          <input
            type="text"
            placeholder="Title for Image"
            value={imageTitle}
            onChange={handleImageTitleChange}
            className="w-full mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
          <button type="submit" disabled={loading}>
            {loading ? "Uploading..." : "Upload Image"}
          </button>
        </form>
      </div>

      {message && <p>{message}</p>}
    </div>
  );
};

export default UploadForm;
