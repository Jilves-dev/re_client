import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/auth";
import axios from "axios";
import toast from "react-hot-toast";
import Sidebar from "../../../components/nav/Sidebar";
import Spinner from "../../../components/Spinner";
import ImageUpload from "../../../components/forms/ImageUpload";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { GOOGLE_PLACES_KEY } from "../../../config";
import CurrencyInput from "react-currency-input-field";

const PageHeader = ({ title }) => (
  <div className="w-full text-align:left pb-12 pt-14 xl:pb-16 xl:pt-20 bg-[#874F41]">
    <div className="flex items-center pl-8">
      <h1 className="font-castoro text-align:left text-6xl md:text-6xl xl:text-7xl text-[#E64833]">
        {title}
      </h1>
    </div>
  </div>
);

export default function AdEdit() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [auth] = useAuth();
  
  // Loading states
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  //const GOOGLE_PLACES_KEY = import.meta.env.VITE_GOOGLE_PLACES_KEY;

  // Form data
  const [ad, setAd] = useState({
    photos: [],
    uploading: false,
    price: "",
    address: "",
    bedrooms: "",
    bathrooms: "",
    carpark: "",
    landsize: "",
    type: "", // House tai Land
    action: "", // Sell tai Rent
    title: "",
    description: "",
    sold: false,
  });

  useEffect(() => {
    if (slug) {
      fetchAd();
    }
  }, [slug]);

  const fetchAd = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/ad/${slug}`);
      
      console.log("Fetched ad:", data);

      // Päivitä state olemassa olevilla arvoilla
      setAd({
        ...data.ad,
        photos: data.ad.photos || [],
        price: data.ad.price || "",
        address: data.ad.address || "",
        bedrooms: data.ad.bedrooms || "",
        bathrooms: data.ad.bathrooms || "",
        carpark: data.ad.carpark || "",
        landsize: data.ad.landsize || "",
        type: data.ad.type || "House",
        action: data.ad.action || "Sell",
        title: data.ad.title || "",
        description: data.ad.description || "",
        sold: data.ad.sold || false,
      });

      setLoading(false);
    } catch (err) {
      console.error("Fetch ad error:", err);
      toast.error("Failed to load property");
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    try {
      const files = e.target.files;
      if (!files || files.length === 0) return;

      setUploading(true);

      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("images", files[i]);
      }

      const { data } = await axios.post("/upload-images", formData);

      setAd({
        ...ad,
        photos: [...ad.photos, ...data],
      });

      toast.success("Images uploaded successfully");
      setUploading(false);
    } catch (err) {
      console.error("Image upload error:", err);
      toast.error("Failed to upload images");
      setUploading(false);
    }
  };

  const handleImageRemove = async (imageToRemove) => {
    try {
      setUploading(true);

      // Poista S3:sta
      await axios.post("/remove-image", imageToRemove);

      // Poista statesta
      setAd({
        ...ad,
        photos: ad.photos.filter((photo) => photo.Key !== imageToRemove.Key),
      });

      toast.success("Image removed");
      setUploading(false);
    } catch (err) {
      console.error("Remove image error:", err);
      toast.error("Failed to remove image");
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setUpdating(true);

    console.log("=== DEBUG UPDATE ===");
    console.log("Full ad state:", ad);
    console.log("ad._id:", ad._id);
    console.log("Type of _id:", typeof ad._id);
    console.log("Is undefined?", ad._id === undefined);

     if (!ad._id) {
      toast.error("Property ID is missing!");
      setUpdating(false);
      return;
    }

    const { data } = await axios.put(`/ad/${ad._id}`, ad);

    console.log("Update response:", data);

      toast.success("Property updated successfully!");
      setUpdating(false);
      navigate("/dashboard");
    } catch (err) {
       console.error("❌ Update error:", err);
       console.error("Error response:", err.response?.data);
       console.error("Error status:", err.response?.status);
       console.error("Request URL:", err.config?.url);

      toast.error(err.response?.data?.error || "Failed to update property");
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete "${ad.address}"? This action cannot be undone.`)) {
      return;
    }

    try {
      setDeleting(true);

      await axios.delete(`/ad/${ad._id}`);

      toast.success("Property deleted successfully");
      navigate("/dashboard");
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Failed to delete property");
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className='w-full min-h-screen pb-10'>
        <PageHeader title="Edit Property" />
        <Sidebar />
        <Spinner message="Loading property..." />
      </div>
    );
  }

  const isHouse = ad.type === "House";
  const isLand = ad.type === "Land";

  return (
    <div className='w-full min-h-screen pb-10 bg-[#FBE9D0]'>
      <PageHeader title="Edit Property" />
      <Sidebar />

      <div className="container mx-auto px-4 py-10 max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Property Type & Action - Read only */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-castoro text-xl text-[#244855] mb-4">Property Type</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <input
                  type="text"
                  value={ad.type}
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Action</label>
                <input
                  type="text"
                  value={ad.action}
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/* Photos */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-castoro text-xl text-[#244855] mb-4">Photos</h3>
            
            {/* Existing Photos */}
            {ad.photos?.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                {ad.photos.map((photo) => (
                  <div key={photo.Key} className="relative group">
                    <img
                      src={photo.Location}
                      alt="Property"
                      className="w-full h-40 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => handleImageRemove(photo)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      disabled={uploading}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Upload new photos */}
            <label className="block w-full px-4 py-3 border-2 border-dashed border-[#E64833] rounded-lg text-center cursor-pointer hover:border-[#d63d28] transition-colors">
              <span className="text-[#E64833] font-castoro">
                {uploading ? "Uploading..." : "+ Upload Photos"}
              </span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
                disabled={uploading}
              />
            </label>
          </div>

          {/* Address */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address *
            </label>
            <GooglePlacesAutocomplete
              apiKey={GOOGLE_PLACES_KEY}
              apiOptions="fi"
              selectProps={{
                defaultInputValue: ad.address,
                placeholder: "Search address...",
                onChange: ({ value }) => {
                  setAd({ ...ad, address: value.description });
                },
              }}
            />
          </div>

          {/* Price */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price (€) *
            </label>
            <CurrencyInput
              placeholder="Enter price"
              value={ad.price}
              onValueChange={(value) => setAd({ ...ad, price: value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#90AEAD] focus:border-transparent"
            />
          </div>

          {/* House specific fields */}
          {isHouse && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-castoro text-xl text-[#244855] mb-4">House Details</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bedrooms
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={ad.bedrooms}
                    onChange={(e) => setAd({ ...ad, bedrooms: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#90AEAD] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bathrooms
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={ad.bathrooms}
                    onChange={(e) => setAd({ ...ad, bathrooms: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#90AEAD] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Carpark
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={ad.carpark}
                    onChange={(e) => setAd({ ...ad, carpark: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#90AEAD] focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Land specific fields */}
          {isLand && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-castoro text-xl text-[#244855] mb-4">Land Details</h3>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Land Size
              </label>
              <input
                type="text"
                placeholder="e.g., 1000 m²"
                value={ad.landsize}
                onChange={(e) => setAd({ ...ad, landsize: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#90AEAD] focus:border-transparent"
              />
            </div>
          )}

          {/* Title */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              placeholder="Enter title"
              value={ad.title}
              onChange={(e) => setAd({ ...ad, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#90AEAD] focus:border-transparent"
            />
          </div>

          {/* Description */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              placeholder="Enter description"
              value={ad.description}
              onChange={(e) => setAd({ ...ad, description: e.target.value })}
              rows={5}
              maxLength={350}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#90AEAD] focus:border-transparent"
            />
            <p className="text-sm text-gray-500 mt-1">
              {ad.description?.length || 0} / 350 characters
            </p>
          </div>

          {/* Sold checkbox */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={ad.sold}
                onChange={(e) => setAd({ ...ad, sold: e.target.checked })}
                className="w-5 h-5 text-[#90AEAD] border-gray-300 rounded focus:ring-[#90AEAD]"
              />
              <span className="text-sm font-medium text-gray-700">
                Mark as Sold
              </span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            {/* Update Button */}
            <button
              type="submit"
              disabled={updating || uploading}
              className="w-full py-3 bg-[#90AEAD] hover:bg-[#7a9a99] text-white rounded-lg font-castoro text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {updating ? "Updating..." : "Update Property"}
            </button>

            {/* Delete Button */}
            <button
              type="button"
              onClick={handleDelete}
              disabled={deleting || updating || uploading}
              className="w-full py-3 bg-[#E64833] hover:bg-[#d63d28] text-white rounded-lg font-castoro text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {deleting ? "Deleting..." : "Delete Property"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}






{/*import { useState, useEffect } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import CurrencyInput from "react-currency-input-field";
import ImageUpload from "../../../components/forms/ImageUpload";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Sidebar from "../../../components/nav/Sidebar";
import { right } from "@popperjs/core";
import styles from './buttons.module.css';

const PageHeader = ({ title }) => (
  <div className="mx-auto w-full text-align:left pb-16 pt-20 bg-[#874F41]">
    <h1 className="pl-8 text-6xl sm:text-7xl font-castoro text-[#E64833]">
      {title}
    </h1>
  </div>
);

export default function AdEdit({ action, type }) {
  const [ad, setAd] = useState({
    _id: "",
    photos: [],
    uploading: false,
    price: "",
    address: "",
    bedrooms: "",
    bathrooms: "",
    carpark: "",
    landsize: "",
    title: "",
    description: "",
    loading: false,
    type,
    action,
  });
  const [loaded, setLoaded] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (params?.slug) {
      fetchAd();
    }
  }, [params?.slug]);

  const fetchAd = async () => {
    try {
      // Korjattu API-kutsu käyttämään oikeaa reittiä
      const { data } = await axios.get(`/ad/edit/${params.slug}`);
      // Oletetaan, että API palauttaa ilmoitusobjektin suoraan
      if (data) {
        setAd(data);
      } else {
        toast.error("Could not fetch ad data.");
      }
      setLoaded(true);
    } catch (err) {
      console.log(err);
    }
  }; 

  *  const handleClick = async () => {
    try {
      if (!ad.photos?.length) {
        toast.error("Photo is required");
        return;
      } else if (!ad.price) {
        toast.error("Price is required");
        return;
      } else if (!ad.description) {
        toast.error("Description is required");
        return;
      } else {
        setAd({ ...ad, loading: true });
        const { data } = await axios.put(`/ad/${ad._id}`, ad);
        if (data?.error) {
          toast.error(data.error);
          setAd({ ...ad, loading: false });
        } else {
          toast.success("Ad updated successfully");
          setAd({ ...ad, loading: false });
          navigate("/dashboard");
        }
      }
    } catch (err) {
      console.log(err);
      setAd({ ...ad, loading: false });
    }
  };

  const handleClick = async () => {
    try {
      if (!ad.photos?.length) {
        toast.error("Photo is required");
        return;
      } else if (!ad.price) {
        toast.error("Price is required");
        return;
      } else if (!ad.description) {
        toast.error("Description is required");
        return;
      } else {
        setUpdateLoading(true);
        const { data } = await axios.put(`/ad/${ad._id}`, ad);
        if (data?.error) {
          toast.error(data.error);
        } else {
          toast.success("Ad updated successfully");
          navigate("/dashboard");
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      setUpdateLoading(false);
    }
  };*

  const handleClick = async () => {
    try {
      if (!ad.photos?.length) {
        toast.error("Photo is required");
        return;
      } else if (!ad.price) {
        toast.error("Price is required");
        return;
      } else if (!ad.description) {
        toast.error("Description is required");
        return;
      } else {
        setUpdateLoading(true);
        const { data } = await axios.put(`/ad/${ad._id}`, ad);
        if (data?.error) {
          toast.error(data.error);
        } else {
          toast.success("Ad updated successfully");
          navigate("/dashboard");
        }
      }
    } catch (err) {
      console.log(err);
      toast.error("Update failed: " + (err.response?.data?.error || err.message));
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setDeleteLoading(true);
      const { data } = await axios.delete(`/ad/${ad._id}`);
      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success("Ad deleted successfully");
        navigate("/dashboard");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setDeleteLoading(false);
    }
  };

  *const handleDelete = async () => {
    try {
      setAd({ ...ad, loading: true });
      const { data } = await axios.delete(`/ad/${ad._id}`);
      if (data?.error) {
        toast.error(data.error);
        setAd({ ...ad, loading: false });
      } else {
        toast.success("Ad deleted successfully");
        setAd({ ...ad, loading: false });
        navigate("/dashboard");
      }
    } catch (err) {
      console.log(err);
      setAd({ ...ad, loading: false });
    }
  };*

  *const customStyles = {
    control: (provided, state) => ({
      ...provided,
      //backgroundColor: '#FBE9D0', // Vaihda taustaväriksi haluamasi
      border: '#90AEAD solid 1px', // Poista reunaviiva
      boxShadow: 'none', // Poista varjostus
      //padding: 0, // Poista sisäinen padding
      borderRadius: 4, // Poista pyöristetyt kulmat
      '&:hover': {
        border: '#874F41 solid 1px', // Poista reunaviiva hoverilla
      },
    }),
    container: (provided, state) => ({
      ...provided,
      padding: 0, // Poista ulkoinen padding
      margin: 0, // Poista ulkoinen marginaali
    }),
    input: (provided, state) => ({
      ...provided,
      color: 'inherit',
      background: '0px center',
      opacity: 1,
      width: '100%',
      gridArea: '1 / 2',
      font: 'inherit',
      minWidth: '2px',
      border: '0px',
      margin: '0px',
      outline: '0px',
      padding: '0px',
    }),
    valueContainer: (provided, state) => ({
      ...provided,
      padding: '6px 8px',
      overflow: 'hidden', // Lisätty overflow
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      padding: 'none',
    }),   
    placeholder: (provided, state) => ({
      ...provided,
      marginLeft: '8px', // Lisätty placeholderin vasen marginaali
    }),

    indicatorSeparator: (provided, state) => ({
      ...provided,
      display: 'none',
    }),
  };*

  return (
    <div>
      <div name="header">
        <PageHeader title="Edit post" />
      </div>
      <div className="container-fluid">
        <Sidebar />
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
          <br></br><br></br>
            <ImageUpload ad={ad} setAd={setAd} />
            <br></br>
            {loaded && (
              <GooglePlacesAutocomplete
                apiKey={import.meta.env.VITE_GOOGLE_PLACES_KEY}
                selectProps={{
                  defaultInputValue: ad?.address,
                  placeholder: " Search for address..",
                  onChange: ({ value }) => {
                    setAd({ ...ad, address: value.description });
                  },
                  className: "form-control mb-3",
                 // styles: customStyles,
                }}
              />
            )}
            {loaded && (
              <div className="mb-4">
              <label htmlFor="price" className="block text-[#879c7d] mb-2">
                Price
              </label>
              <CurrencyInput
                type="text"
                id="price"
                placeholder="Enter price"
                defaultValue={ad.price}
                className="form-control mb-3"
                onValueChange={(value) => setAd({ ...ad, price: value })}
              />
              </div>
            )}
            {ad.type === "House" && (
              <>
               <div className="mb-4">
                <label htmlFor="bedrooms" className="block text-[#879c7d] mb-2">
                  bedrooms
                </label>
                <input
                  type="number"
                  min="0"
                  className="form-control mb-3"
                  placeholder="Enter how many bedrooms"
                  value={ad.bedrooms}
                  onChange={(e) => setAd({ ...ad, bedrooms: e.target.value })}
                />
                </div>
                <div className="mb-4">
                <label htmlFor="bathrooms" className="block text-[#879c7d] mb-2">
                  bathrooms
                </label>
                <input
                  type="number"
                  min="0"
                  className="form-control mb-3"
                  placeholder="Enter how many bathrooms"
                  value={ad.bathrooms}
                  onChange={(e) => setAd({ ...ad, bathrooms: e.target.value })}
                />
                </div>
                <div className="mb-4">
                <label htmlFor="carpark" className="block text-[#879c7d] mb-2">
                  carpark
                </label>
                <input
                  type="number"
                  min="0"
                  className="form-control mb-3"
                  placeholder="Enter how many carpark"
                  value={ad.carpark}
                  onChange={(e) => setAd({ ...ad, carpark: e.target.value })}
                />
                </div>
              </>
            )}
            <div className="mb-4">
              <label htmlFor="landsize" className="block text-[#879c7d] mb-2">
                  landsize
                </label>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Size of land"
              value={ad.landsize}
              onChange={(e) => setAd({ ...ad, landsize: e.target.value })}
            />
            </div>
            <div className="mb-4">
            <label htmlFor="title" className="block text-[#879c7d] mb-2">
              Title
            </label>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Enter title"
              value={ad.title}
              onChange={(e) => setAd({ ...ad, title: e.target.value })}
            />
            </div>
            <div className="mb-4">
            <label htmlFor="description" className="block text-[#879c7d] mb-2">
              Description
            </label>            
            <textarea
              className="form-control mb-3"
              placeholder="Enter description"
              value={ad.description}
              onChange={(e) => setAd({ ...ad, description: e.target.value })}
            />
            </div>
        
              {/*<button
                onClick={handleClick}
                className="btn btn-block bg-[#cbc385] hover:bg-[#cf8c60] text-[#879c7d] py-2 px-4 mb-3 rounded-xl"
                disabled={ad.loading}
              >
                {ad.loading ? "Updating..." : "Update"}
              </button>
              <button
                onClick={handleDelete}
                className="btn btn-block bg-[#cbc385] hover:bg-[#cf8c60] text-[#879c7d] py-2 px-4"
                disabled={ad.loading}
              >
                {ad.loading ? "Deleting..." : "Delete"}
              </button>*
              *<div className="d-grid gap-2">
              <button
                  onClick={handleClick}
                  className="btn btn-block bg-[#cbc385] hover:bg-[#cf8c60] text-[#879c7d] py-2 px-4 mb-3 rounded-xl"
                  disabled={updateLoading}
                >
                  {updateLoading ? "Updating..." : "Update"}
                </button>
                <button
                  onClick={handleDelete}
                  className="btn btn-block bg-[#cbc385] hover:bg-[#cf8c60] text-[#879c7d] py-2 px-4"
                  disabled={deleteLoading}
                >
                  {deleteLoading ? "Deleting..." : "Delete"}
                </button>
            </div>*

            <div className="d-grid gap-2">
              *<button
                onClick={handleClick}
                className={`${styles.button} btn btn-block py-2 px-4 mb-3`} // Käytä styles.button-luokkaa
                disabled={updateLoading}
              >
                {updateLoading ? "Updating..." : "Update"}
              </button>
              <button
                onClick={handleDelete}
                className={`${styles.button} btn btn-block py-2 px-4`} // Käytä styles.button-luokkaa
                disabled={deleteLoading}
              >
                {deleteLoading ? "Deleting..." : "Delete"}
              </button>*

              <button
              onClick={handleClick}
              className={`bg-[#90AEAD] hover:bg-[#cf8c60] text-[#FFFFFF] py-2 px-4 rounded mb-5`}
              disabled={updateLoading}
            >
              {updateLoading ? "Updating..." : "Update"}
              </button>

              <button
              onClick={handleDelete}
              className={`bg-[#874F41] hover:bg-[#E64833] text-[#E64833] py-2 px-4 rounded mb-5`}
              disabled={deleteLoading}
            >
              {deleteLoading ? "Deleting..." : "Delete"}
              </button>

            </div>




            <br></br><br></br>
          </div>
        </div>
      </div>
    </div>
  );
}*/}
