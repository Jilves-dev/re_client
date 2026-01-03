import Resizer from "react-image-file-resizer";
import axios from "axios";
import { Avatar } from "antd";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ProfileUpload({ photo, setPhoto }) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      console.log("=== PROFILE UPLOAD START ===");

      await new Promise((resolve, reject) => {
        Resizer.imageFileResizer(
          file, 1080, 720, "JPEG", 100, 0,
          async (uri) => {
            try {
              const { data } = await axios.post("/image-upload", { image: uri });
              setPhoto(data);
              toast.success("Image uploaded successfully!");
              resolve();
            } catch (err) {
              console.error("Upload request failed:", err);
              toast.error("Upload failed. Please try again.");
              reject(err);
            }
          }, "base64"
        );
      });

    } catch (err) {
      console.error("File processing error:", err);
      toast.error("Failed to process image");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!photo) return;
    const answer = window.confirm("Are you sure you want to delete your profile image?");
    if (!answer) return;

    try {
      const payload = {
        Key: photo.Key || photo.key,
        Bucket: photo.Bucket || "emarket24",
      };

      const { data } = await axios.post("/remove-image", payload);

      if (data?.ok) {
        setPhoto(null);
        toast.success("Image deleted successfully!");
      }
    } catch (err) {
      console.error("Delete error:", err.response?.data || err);
      toast.error(err.response?.data?.error || "Failed to delete image");
    }
  };

   // Custom shadow style
  const customShadow = {
    boxShadow: '0 4px 6px -1px rgba(144, 174, 173, 0.5), 0 2px 4px -1px rgba(144, 174, 173, 0.3)'
  };

  return (
    <div className="flex flex-wrap items-center gap-4 mt-4">
      {photo?.Location && (
        <div className="relative">
          <Avatar
            src={photo.Location}
            shape="round"
            style={{ width: "120px", height: "120px", ...customShadow }}
            className="font-poiretOne border-2 border-[#E64833] cursor-pointer hover:opacity-70 transition-opacity"
            onClick={handleDelete}
            title="Click to delete image"
          />
        </div>
      )}

      <label
        style={customShadow}
        className={`bg-[#FBE9D0] hover:bg-[#cbc385] border-2 border-[#E64833]
          text-[#E64833] cursor-pointer font-poiretOne transition-colors
          flex items-center justify-center
          ${uploading ? 'opacity-50 cursor-not-allowed' : ''}
          ${photo?.Location ? 'rounded-full w-[120px] h-[120px] p-0' : 'rounded w-full px-6 py-4'}`}
      >
        <span className={photo?.Location ? 'font-poiretOne text-center text-sm' : ''}>
          {uploading ? "Processing..." : photo?.Location ? "Upload new img" : "Upload profile img"}
        </span>
        <input
          onChange={handleUpload}
          type="file"
          accept="image/*"
          hidden
          disabled={uploading}
        />
      </label>
    </div>
  );
}





{/*import Resizer from "react-image-file-resizer";
import axios from "axios";
import { Avatar } from "antd";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ProfileUpload({ photo, setPhoto }) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      console.log("=== PROFILE UPLOAD START ===");

      await new Promise((resolve, reject) => {
        Resizer.imageFileResizer(
          file, 1080, 720, "JPEG", 100, 0,
          async (uri) => {
            try {
              const { data } = await axios.post("/image-upload", { image: uri });
              setPhoto(data);
              toast.success("Image uploaded successfully!");
              resolve();
            } catch (err) {
              console.error("Upload request failed:", err);
              toast.error("Upload failed. Please try again.");
              reject(err);
            }
          }, "base64"
        );
      });

    } catch (err) {
      console.error("File processing error:", err);
      toast.error("Failed to process image");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!photo) return;
    const answer = window.confirm("Are you sure you want to delete your profile image?");
    if (!answer) return;

    try {
      const payload = {
        Key: photo.Key || photo.key,
        Bucket: photo.Bucket || "emarket24",
      };

      const { data } = await axios.post("/remove-image", payload);

      if (data?.ok) {
        setPhoto(null);
        toast.success("Image deleted successfully!");
      }
    } catch (err) {
      console.error("Delete error:", err.response?.data || err);
      toast.error(err.response?.data?.error || "Failed to delete image");
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-4 mt-4">
      {photo?.Location && (
        <div className="relative">
          <Avatar
            src={photo.Location}
            shape="round"
            style={{ width: "120px", height: "120px" }}
            className="border-2 border-[#874F41] border-radius-full cursor-pointer hover:opacity-70 transition-opacity"
            onClick={handleDelete}
            title="Click to delete image"
          />
        </div>
      )}

      <label
        className={`bg-[#FBE9D0] hover:bg-[#cbc385] border-2 border-[#874F41] 
          text-[#E64833] px-6 py-4 rounded cursor-pointer font-castoro transition-colors
          flex items-center justify-center
          ${uploading ? 'opacity-50 cursor-not-allowed' : ''}
          ${!photo?.Location ? 'w-full' : ''}`}
        style={{ height: photo?.Location ? '120px' : 'auto' }}
      >
        {uploading ? "Processing..." : photo?.Location ? "+ Upload New" : "+ Upload Photo"}
        <input
          onChange={handleUpload}
          type="file"
          accept="image/*"
          hidden
          disabled={uploading}
        />
      </label>
    </div>
  );
}*/}
