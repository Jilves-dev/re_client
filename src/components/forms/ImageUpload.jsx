import Resizer from "react-image-file-resizer";
import axios from "axios";
import { Avatar } from "antd";
import toast from "react-hot-toast";

export default function ImageUpload({ ad, setAd }) {
  const handleUpload = async (e) => {
    try {
      let files = e.target.files;
      files = [...files];
      
      if (files?.length) {
        setAd({ ...ad, uploading: true });

        for (const file of files) {
          try {
            await new Promise((resolve, reject) => {
              Resizer.imageFileResizer(
                file,
                1080,
                720,
                "JPEG",
                100,
                0,
                async (uri) => {
                  try {
                    console.log("Uploading image...");
                    
                    const { data } = await axios.post("/image-upload", { 
                      image: uri 
                    });
                    
                    console.log("Upload response:", data);
                    
                    setAd((prev) => ({
                      ...prev,
                      photos: [data, ...prev.photos],
                    }));
                    
                    resolve();
                  } catch (err) {
                    console.error("Upload error:", err);
                    reject(err);
                  }
                },
                "base64"
              );
            });
          } catch (err) {
            console.error("Resize error:", err);
            toast.error("Failed to process image");
          }
        }

        setAd((prev) => ({ ...prev, uploading: false }));
        toast.success("Images uploaded successfully!");
      }
    } catch (err) {
      console.error("Upload handler error:", err);
      setAd({ ...ad, uploading: false });
      toast.error("Failed to upload images");
    }
  };

  const handleDelete = async (file) => {
    const answer = window.confirm("Are you sure you want to delete this image?");
    if (!answer) return;

    setAd({ ...ad, uploading: true });

    try {
      console.log("=== DELETE IMAGE ===");
      console.log("File to delete:", file);

      const payload = {
        Key: file.Key || file.key,
        Bucket: file.Bucket || "emarket24",
      };

      // 1️⃣ Poista S3:sta
      const { data } = await axios.post("/remove-image", payload);
      
      if (data?.ok) {
        // 2️⃣ Päivitä photos array
        const updatedPhotos = ad.photos.filter((p) => {
          const fileKey = file.Key || file.key;
          const photoKey = p.Key || p.key;
          return photoKey !== fileKey;
        });

        // 3️⃣ Tallenna tietokantaan HETI
        if (ad._id) {
          try {
            await axios.put(`/ad/${ad._id}`, { photos: updatedPhotos });
            console.log("✅ Photos saved to database");
          } catch (dbErr) {
            console.error("❌ Database update failed:", dbErr);
            toast.error("Image deleted from S3 but failed to update database");
            setAd({ ...ad, uploading: false });
            return;
          }
        }

        setAd((prev) => ({
          ...prev,
          photos: updatedPhotos,
          uploading: false,
        }));

        toast.success("Image deleted successfully!");
      }
    } catch (err) {
      console.error("Delete error:", err.response?.data || err);
      setAd({ ...ad, uploading: false });
      toast.error(err.response?.data?.error || "Failed to delete image");
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-4 mt-4">
      {/* ✅ Klikkaa kuvaa = poista */}
      {ad.photos?.map((file, index) => (
        <div key={file.Key || file.key || index} className="relative">
          <Avatar
            src={file?.Location}
            shape="square"
            style={{ width: "120px", height: "120px" }}
            className="border-2 border-[#E64833] cursor-pointer hover:opacity-70 transition-opacity"
            onClick={() => handleDelete(file)} // ✅ Klikkaa poistaaksesi
          />
        </div>
      ))}

      {/* Upload button */}
      <label
        className={`bg-[#FBE9D0] hover:bg-[#cbc385] border-2 border-[#874F41] 
          text-[#E64833] px-6 py-4 rounded cursor-pointer font-poiretOne transition-colors
          ${ad.uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {ad.uploading ? "Processing..." : "+ Upload Photos"}
        <input
          onChange={handleUpload}
          type="file"
          accept="image/*"
          multiple
          hidden
          disabled={ad.uploading}
        />
      </label>
    </div>
  );
}