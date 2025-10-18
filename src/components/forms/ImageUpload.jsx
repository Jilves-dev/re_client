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

        // Process each file
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
                    
                    // ✅ Käytä oikeaa endpointtia
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
    console.log("=== DELETE IMAGE DEBUG ===");
    console.log("File object:", file);
    console.log("File.Key:", file.Key);
    console.log("File.key:", file.key);
    console.log("File.Location:", file.Location);

    console.log("=== DELETE IMAGE ===");
      console.log("File object:", file);

       const payload = {
        Key: file.Key || file.key, // Kokeile molempia
        Bucket: file.Bucket || "emarket24", // Fallback bucket
      };



      // ✅ Käytä file.Key (iso K)
      const { data } = await axios.post("/remove-image", file); // Lähetä koko file objekti

            console.log("Sending payload:", payload);
      
  
   if (data?.ok) {
        setAd((prev) => ({
          ...prev,
          photos: prev.photos.filter((p) => {
            // ✅ Vertaa oikealla Key kentällä
            const fileKey = file.Key || file.key;
            const photoKey = p.Key || p.key;
            return photoKey !== fileKey;
          }),
          uploading: false,
        }));
        toast.success("Image deleted successfully");
      }
    } catch (err) {
      console.error("Delete error:", err.response?.data || err);
      setAd({ ...ad, uploading: false });
      toast.error(err.response?.data?.error || "Failed to delete image");
    }
  };
      /*if (data?.ok) {
        setAd((prev) => ({
          ...prev,
          photos: prev.photos.filter((p) => p.Key !== file.Key),
          uploading: false,
        }));
        toast.success("Image deleted successfully");
      }
    } catch (err) {
      console.error("Delete error:", err.response?.data || err);
      setAd({ ...ad, uploading: false });
      toast.error("Failed to delete image");
    }
  };*/

  return (
    <div className="flex flex-wrap items-center gap-4 mt-4">
      {/* ✅ Lisää key prop */}
      {ad.photos?.map((file, index) => (
        <div key={file.Key || file.key || index} className="relative group">
          <Avatar
            src={file?.Location}
            shape="square"
            style={{ width: "120px", height: "120px" }}
            className="border-2 border-[#874F41] cursor-pointer hover:opacity-80 transition-opacity"
          />
          {/* Delete overlay */}
          <button
            type="button"
            onClick={() => handleDelete(file)}
            className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white w-6 h-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs"
          >
            ✕
          </button>
        </div>
      ))}

      <label
        className={`bg-[#FBE9D0] hover:bg-[#cbc385] border-2 border-[#874F41] 
          text-[#E64833] px-6 py-4 rounded cursor-pointer font-castoro transition-colors
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





/*import Resizer from "react-image-file-resizer";
import axios from "axios";
import { Avatar } from "antd";

export default function ImageUpload({ ad, setAd }) {
  const handleUpload = async (e) => {
    try {
      let files = e.target.files;
      files = [...files];
      if (files?.length) {
        setAd({ ...ad, uploading: true });

        files.map((file) => {
          new Promise(() => {
            Resizer.imageFileResizer(
              file,
              1080,
              720,
              "JPEG",
              100,
              0,
              async (uri) => {
                try {
                  // console.log("UPLOAD URI => ", uri);
                  const { data } = await axios.post("/upload-image", { image: uri });
                  //const { data } = await axios.post("https://greenserver.vercel.app/api/upload-image", { image: uri });
                  setAd((prev) => ({
                    ...prev,
                    photos: [data, ...prev.photos],
                    uploading: false,
                  }));
                } catch (err) {
                  console.log(err);
                  setAd({ ...ad, uploading: false });
                }
              },
              "base64"
            );
          });
        });
      }
    } catch (err) {
      console.log(err);
      setAd({ ...ad, uploading: false });
    }
  };

  const handleDelete = async (file) => {
    const answer = window.confirm("are you sure you want to delete this image?");
    if (!answer) return;
    setAd({ ...ad, uploading: true });
    try {
      console.log("deleting file: ", file);
      const { data } = await axios.post("/remove-image", { 
        Key: file.key, 
        Bucket: 'emarket24' 
      }); 
      if (data?.ok) {
        setAd((prev) => ({
          ...prev,
          photos: prev.photos.filter((p) => p.Key !== file.Key),
          uploading: false,
        }));
      }
    } catch (err) {
      console.error("Error deleting image:", err.response?.data || err); // Lisätty virheen loki
      setAd({ ...ad, uploading: false });
    }
  };
  
    return (
        <div className="flex items-center space-x-4 mt-4">
      {ad.photos?.map((file, index) => (
        <div key={index} className="mb-4">
          <Avatar
            src={file?.Location}
            shape="square"
            style={{ width: "120px", height: "120px" }}
            className="border-2 border-[#874F41] cursor-pointer"
            onClick={() => handleDelete(file)}
          />
        </div>
      ))}

            <label className={`bg-[#FBE9D0] hover:bg-[#cbc385] border-2 border-[#874F41] 
              text-[#E64833] px-4 py-4 rounded cursor-pointer mt-4`}> 
          {ad.uploading ? "Processing..." : "Upload photos"}
          <input
            onChange={handleUpload}
            type="file"
            accept="image/*"
            multiple
            hidden
          />
        </label>
        </div>
    );
  }*/