
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { Avatar } from "antd";

export default function ImageUpload({ ad, setAd }) {
  const handleUpload = async (e) => {
    try {
      let files = e.target.files;
      files = [...files];
      if (files?.length) {
        // console.log(files);
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
  
 /* return (
<div className="flex items-center space-x-4 mt-4">
<div className="flex mb-0">
  {ad.photos?.map((file, index) => (
    <Avatar
      key={index}
      src={file?.Location}
      shape="square"
      style={{ width: "120px", height: "120px" }}
            className="border-2 border-[#cbc385]"
     // size="46"
      onClick={() => handleDelete(file)}
    />
  ))}
</div>
  <label className={`bg-[#FFFAFA] hover:bg-[#cbc385] 
    border-2 border-[#cbc385] text-[#879c7d] px-4 py-4 
    rounded cursor-pointer`}>
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
    );*/

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
  }


  {/*<div className="flex flex-wrap bg-[#FBE9D0]"> 
        {ad.photos?.map((file, index) => (
          <div key={index} className="mb-4"> 
            <Avatar
              src={file?.Location}
              shape="square"
              style={{ width: "120px", height: "120px" }}
              className="border-2 border-[#90AEAD] cursor-pointer"
              onClick={() => handleDelete(file)}
            />
          </div>
        ))}
        <label className={`bg-[#FBE9D0] hover:bg-[#cbc385] border-2 border-[#874F41] text-[#E64833] px-4 py-4 rounded cursor-pointer mt-4`}> 
          {ad.uploading ? "Processing..." : "Upload photos"}
          <input
            onChange={handleUpload}
            type="file"
            accept="image/*"
            multiple
            hidden
          />
        </label>*/}

    {/*</label> <button
            onClick={handleDelete}
            className="!bg-[#FBE9D0] hover:bg-[#90AEAD] 
            border-2 !border-[#874F41] !text-[#E64833] 
            w-16 h-16 rounded-full flex items-center justify-center ml-4"
          >
            <span className="text-sm">Delete</span>
          </button>
        </div>
      )}

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
      </div>*/}

      {/*const handleDelete = async (file) => {
    const answer = window.confirm("are you sure you want to delete this image?");
    if (!answer) return;
    setAd({ ...ad, uploading: true });
    try {
      const { data } = await axios.post("/remove-image", file);
      if (data?.ok) {
        setAd((prev) => ({
          ...prev,
          photos: prev.photos.filter((p) => p.Key !== file.Key),
          uploading: false,
        }));
      }
    } catch (err) {
      console.log(err);
      setAd({ ...ad, uploading: false });
    }
  };*/}