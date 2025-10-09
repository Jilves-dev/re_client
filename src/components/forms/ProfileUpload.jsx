/*import Resizer from "react-image-file-resizer";
import axios from "axios";
import { Avatar } from "antd";
import { useAuth } from "../../context/auth";

export default function ProfileUpload({
  photo,
  setPhoto,
  uploading,
  setUploading,
}) {
  const [auth, setAuth] = useAuth();

  const handleUpload = async (e) => {
    try {
      let file = e.target.files[0];

      if (file) {
        setUploading(true);

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
                const { data } = await axios.post("/upload-image", {
                  image: uri,
                });
                setPhoto(data);
                setUploading(false);
              } catch (err) {
                console.log(err);
                setUploading(false);
              }
            },
            "base64"
          );
        });
      }
    } catch (err) {
      console.log(err);
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    const answer = window.confirm("Delete image?");
    if (!answer) return;
    setUploading(true);
    try {
      const { data } = await axios.post("/remove-image",
        {
          Key: photo.key || photo.Key,
          Bucket: photo.bucket || photo.Bucket || 'emarket24'
        }
      );
      if (data?.ok) {
        setPhoto(null);
        setUploading(false);
      }
    } catch (err) {
      console.log(err);
      setUploading(false);
    }
  };

  return (*/


  import Resizer from "react-image-file-resizer";
  import axios from "axios";
  import { Avatar } from "antd";
  import { useAuth } from "../../context/auth";
  
  export default function ProfileUpload({
    photo,
    setPhoto,
    uploading,
    setUploading,
  }) {
    const [auth, setAuth] = useAuth();
  
    const handleUpload = async (e) => {
      try {
        let file = e.target.files[0];
  
        if (file) {
          console.log("=== PROFILE IMAGE UPLOAD ===");
          console.log("File:", file.name, file.size, "bytes");
          setUploading(true);
  
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
                  console.log("Image resized, uploading...");
                  console.log("URI length:", uri.length);
                  const { data } = await axios.post("/upload-image", {
                    image: uri,
                  });
                  console.log("✅ Upload response:", data);
                   if (data.error) {
                console.error("Upload error:", data.error);
                toast.error(data.error);
              } else {
                  setPhoto(data);
                   toast.success("Image uploaded successfully!");
              }
                  setUploading(false);
                } catch (err) {
                    console.error("❌ Upload request failed:", err);
              console.error("Error response:", err.response?.data);
              toast.error(err.response?.data?.error || "Upload failed");
                  setUploading(false);
                }
              },
              "base64"
            );
          });
        }
      } catch (err) {
        console.error("❌ File processing error:", err);
        toast.error("Failed to process image");
        setUploading(false);
      }
    };
  
    const handleDelete = async () => {
      const answer = window.confirm("Delete image?");
      if (!answer) return;
      setUploading(true);
      try {
        const { data } = await axios.post("/remove-image",
          {
            Key: photo.key || photo.Key,
            Bucket: photo.bucket || photo.Bucket || 'emarket24'
          }
        );
        if (data?.ok) {
          setPhoto(null);
          setUploading(false);
        }
      } catch (err) {
        console.log(err);
        setUploading(false);
      }
    };
    return (
      <>
        <div className="mt-4">
          {photo?.Location && (
            <div className="flex items-center">
              <Avatar
                src={photo.Location}
                shape="square"
                style={{ width: "120px", height: "120px" }}
                className="border-2 border-[#874F41]"
              />
              {/* Spacer between Avatar and Upload button */}
              <div className="w-5"/> 
              <div
                className={`${
                  uploading
                    ? "bg-[#FBE9D0]"
                    : "bg-[#FBE9D0] hover:bg-[#cbc385] text-[#E64833] border-2 border-[#874F41]"
                } text-[#879c7d] w-20 h-20 rounded-full flex items-center justify-center cursor-pointer relative`}
              >
                <span className="text-sm">{uploading ? "..." : "Upload"}</span>
                <input
                  onChange={handleUpload}
                  type="file"
                  accept="image/*"
                  hidden
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            </div>
          )}
          {/* Show upload button if no photo */}
          {!photo?.Location && (
            <div className="flex items-center">
              <div
                className={`${
                  uploading
                    ? "bg-[#FBE9D0]"
                    : "bg-[#FBE9D0] hover:bg-[#cbc385] text-[#E64833] border-2 border-[#874F41]"
                } text-[#879c7d] w-20 h-20 rounded-full flex items-center justify-center cursor-pointer relative`}
              >
                <span className="text-sm">{uploading ? "..." : "Upload"}</span>
                <input
                  onChange={handleUpload}
                  type="file"
                  accept="image/*"
                  hidden
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            </div>
          )}
        </div>
    
        <div className="pt-4 w-full">
          <button
            onClick={handleDelete}
            className="!bg-[#FBE9D0] hover:bg-[#90AEAD] 
                  !text-[#E64833] font-castoro py-2 px-4 rounded
                  !border 2px !border-[#874F41] w-full"
          >
            <span className="text-sm">Delete</span>
          </button>
        </div>
      </>
    );
    
  
    /*return (
      <>
      <div className="flex items-center space-x-4 mt-4">
        {photo?.Location && (
          <div className="flex items-center">
            <Avatar
              src={photo.Location}
              shape="square"
              style={{ width: "120px", height: "120px" }}
              className="border-2 border-[#874F41]"
            />
  
            <div className={`${
                  uploading ? "bg-[#FBE9D0]" : "bg-[#FBE9D0] hover:bg-[#cbc385] text-[#E64833] border-2 border-[#874F41]"
                } text-[#879c7d] w-20 h-20 rounded-full flex items-center justify-center cursor-pointer relative`}>
                <span className="text-sm">{uploading ? "..." : "Upload"}</span>
                <input
                  onChange={handleUpload}
                  type="file"
                  accept="image/*"
                  hidden
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
                </div>
        )}
        </div>
  
        <div className="flex items-center pt-4">
        <button
              onClick={handleDelete}
              className="!bg-[#FBE9D0] hover:bg-[#90AEAD] 
              !text-[#E64833] font-castoro py-2 px-4 rounded
              !border 2px !border-[#874F41] col-12"
            >
              <span className="text-sm">Delete</span>
            </button>
      </div>
      </>
    );*/
  }

  /*
                <button
      className="!bg-[#FBE9D0] hover:bg-[#cf8c60] 
      !text-[#E64833] font-castoro py-2 px-4 rounded 
      !border 2px !border-[#874F41] col-12"
                >
                  {loading ? "processing" : "update profile"}
                </button>*/
  
  
  
  
  
  
  
  /*import Resizer from "react-image-file-resizer";
  import axios from "axios";
  import { Avatar } from "antd";
  import { useAuth } from "../../context/auth";
  
  export default function ProfileUpload({
    photo,
    setPhoto,
    uploading,
    setUploading,
  }) {
    const [auth, setAuth] = useAuth();
  
    const handleUpload = async (e) => {
      try {
        let file = e.target.files[0];
  
        if (file) {
          setUploading(true);
  
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
                  const { data } = await axios.post("/upload-image", {
                    image: uri,
                  });
                  setPhoto(data);
                  setUploading(false);
                } catch (err) {
                  console.log(err);
                  setUploading(false);
                }
              },
              "base64"
            );
          });
        }
      } catch (err) {
        console.log(err);
        setUploading(false);
      }
    };
  
    const handleDelete = async () => {
      const answer = window.confirm("Delete image?");
      if (!answer) return;
      setUploading(true);
      try {
        const { data } = await axios.post("/remove-image",
          {
            Key: photo.key || photo.Key,
            Bucket: photo.bucket || photo.Bucket || 'emarket24'
          }
        );
        if (data?.ok) {
          setPhoto(null);
          setUploading(false);
        }
      } catch (err) {
        console.log(err);
        setUploading(false);
      }
    };
  
    return (
      <div className="flex items-center space-x-4 mt-4">
        {photo?.Location && (
          <div className="flex items-center">
            <Avatar
              src={photo.Location}
              shape="square"
              style={{ width: "120px", height: "120px" }}
              className="border-2 border-[#90AEAD]"
            />
  
            <button
              onClick={handleDelete}
              className="!bg-[#FBE9D0] hover:bg-[#90AEAD] 
              border-2 !border-[#874F41] !text-[#E64833] 
              w-12 h-16 !rounded-full flex items-center justify-center ml-4"
            >
              <span className="text-sm !p-4">Delete</span>
            </button>
          </div>
        )}
  
        <label
          className={`${
            uploading ? "bg-[#FBE9D0]" : "bg-[#FBE9D0] hover:bg-[#cbc385] text-[#E64833] border-2 border-[#874F41]"
          } text-[#879c7d] w-16 h-16 rounded-full flex items-center justify-center cursor-pointer`}
        >
          <span className="text-sm !p-4">{uploading ? "..." : "Upload"}</span>
          <input
            onChange={handleUpload}
            type="file"
            accept="image/*"
            hidden
          />
        </label>
      </div>
    );
  }*/
  
  
  
  
  
  
  
  
  /*import Resizer from "react-image-file-resizer";
  import axios from "axios";
  import { Avatar } from "antd";
  import { useAuth } from "../../context/auth";
  
  export default function ProfileUpload({
    photo,
    setPhoto,
    uploading,
    setUploading,
  }) {
    const [auth, setAuth] = useAuth();
  
    const handleUpload = async (e) => {
      try {
        let file = e.target.files[0];
  
        if (file) {
          setUploading(true);
  
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
                  const { data } = await axios.post("/upload-image", {
                    image: uri,
                  });
                  setPhoto(data);
                  setUploading(false);
                } catch (err) {
                  console.log(err);
                  setUploading(false);
                }
              },
              "base64"
            );
          });
        }
      } catch (err) {
        console.log(err);
        setUploading(false);
      }
    };
  
    const handleDelete = async () => {
      const answer = window.confirm("Delete image?");
      if (!answer) return;
      setUploading(true);
      try {
        const { data } = await axios.post("/remove-image",
          {
            Key: photo.key || photo.Key,
            Bucket: photo.bucket || photo.Bucket || 'emarket24'
          }
        );
        if (data?.ok) {
          setPhoto(null);
          setUploading(false);
        }
      } catch (err) {
        console.log(err);
        setUploading(false);
      }
    };
  
    return (
      <div className="flex items-center space-x-4 mt-4">
        {photo?.Location && (
          <>
            <Avatar
              src={photo.Location}
              shape="square"
              style={{ width: "120px", height: "120px" }}
              className="border-2 border-[#90AEAD]"
            />
  
            <button
              onClick={handleDelete}
              className="!bg-[#FBE9D0] hover:bg-[#90AEAD] 
              border-2 !border-[#874F41] !text-[#E64833] px-4 py-4 rounded"
            >
              Delete Photo
            </button>
          </>
        )}
  
        <label
          className={`${
            uploading ? "bg-[#FBE9D0]" : "bg-[#FBE9D0] hover:bg-[#cbc385] text-[#E64833] border-2 border-[#874F41] px-4 py-4 rounded"
          } text-[#879c7d] px-4 rounded cursor-pointer`}
        >
          {uploading ? "Processing..." : "Upload Photo"}
          <input
            onChange={handleUpload}
            type="file"
            accept="image/*"
            hidden
          />
        </label>
      </div>
    );
  }*/
  
  
  
  
  
  
  /*060125import Resizer from "react-image-file-resizer";
  import axios from "axios";
  import { Avatar } from "antd";
  import { useAuth } from "../../context/auth";
  
  export default function ProfileUpload({
    photo,
    setPhoto,
    uploading,
    setUploading,
  }) {
    // context
    const [auth, setAuth] = useAuth();
  
    const handleUpload = async (e) => {
      try {
        let file = e.target.files[0];
  
        if (file) {
          setUploading(true);
  
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
                  const { data } = await axios.post("/upload-image", {
                    image: uri,
                  });
                  setPhoto(data);
                  setUploading(false);
                } catch (err) {
                  console.log(err);
                  setUploading(false);
                }
              },
              "base64"
            );
          });
        }
      } catch (err) {
        console.log(err);
        setUploading(false);
      }
    };
  
    const handleDelete = async () => {
      const answer = window.confirm("Delete image?");
      if (!answer) return;
      setUploading(true);
      try {
        const { data } = await axios.post("/remove-image", photo);
        if (data?.ok) {
          setPhoto(null);
          setUploading(false);
        }
      } catch (err) {
        console.log(err);
        setUploading(false);
      }
    };
  
    return (
      <div className="grid-row: 1; mt-4">
        <label
          className={`${
            uploading ? "bg-gray-300" : "bg-[#cbc385] hover:bg-[#cf8c60]"
          } text-[#879c7d] py-2 px-4 rounded cursor-pointer`}
        >
          {uploading ? "Processing..." : "Upload Photo"}
          <input
            onChange={handleUpload}
            type="file"
            accept="image/*"
            hidden
          />
        </label>
        {photo?.Location && (
          <div className="mt-4">
            <Avatar
              src={photo.Location}
              shape="square"
              size="100"
              className="mb-0 mx-4"
            />
            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-[#879c7d] py-2 px-4 rounded"
            >
              Delete Photo
            </button>
          </div>
        )}
      </div>
    );
  }*/
  
  
  
  
  /*import Resizer from "react-image-file-resizer";
  import axios from "axios";
  import { Avatar } from "antd";
  import { useAuth } from "../../context/auth";
  
  export default function ProfileUpload({
    photo,
    setPhoto,
    uploading,
    setUploading,
  }) {
    // context
    const [auth, setAuth] = useAuth();
  
    const handleUpload = async (e) => {
      try {
        let file = e.target.files[0];
  
        if (file) {
          // console.log(files);
          setUploading(true);
  
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
                  const { data } = await axios.post("/upload-image", {
                    image: uri,
                  });
                  setPhoto(data);
                  setUploading(false);
                } catch (err) {
                  console.log(err);
                  setUploading(false);
                }
              },
              "base64"
            );
          });
        }
      } catch (err) {
        console.log(err);
        setUploading(false);
      }
    };
  
    const handleDelete = async (file) => {
      const answer = window.confirm("Delete image?");
      if (!answer) return;
      setUploading(true);
      try {
        const { data } = await axios.post("/remove-image", photo);
        if (data?.ok) {
          setPhoto(null);
          setUploading(false);
        }
      } catch (err) {
        console.log(err);
        setUploading(false);
      }
    };
  
    return (
      <>
        <label className="btn btn-secondary mb-4 mt-4">
          {uploading ? "Processing..." : "Upload photos"}
          <input
            onChange={handleUpload}
            type="file"
            accept="image/*"
            // multiple
            hidden
          />
        </label>
        {photo?.Location ? (
          <Avatar
            src={photo.Location}
            shape="square"
            size="46"
            className="ml-2 mb-4 mt-4"
            onClick={() => handleDelete()}
          />
        ) : (
          ""
        )}
      </>
    );
  }*/