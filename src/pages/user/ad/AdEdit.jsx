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

  // Form data
  const [ad, setAd] = useState({
    _id: "",
    photos: [],
    price: "",
    address: "",
    bedrooms: "",
    bathrooms: "",
    carpark: "",
    landsize: "",
    type: "",
    action: "",
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
      
      console.log("Fetched ad:", data.ad);
      console.log("Has _id?", !!data.ad._id);

      if (!data.ad) {
        toast.error("Property not found");
        navigate("/dashboard");
        return;
      }

      // ✅ Käytä spread operaattoria - kopioi kaikki kentät
      setAd({
        ...data.ad,
        photos: data.ad.photos || [],
      });

      setLoading(false);
    } catch (err) {
      console.error("Fetch ad error:", err);
      toast.error("Failed to load property");
      navigate("/dashboard");
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setUpdating(true);

      console.log("Updating ad:", ad._id);

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
      console.error("Update error:", err);
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
        <PageHeader title="Edit existing post" />
        <Sidebar />
        <Spinner message="Loading property..." />
      </div>
    );
  }

  const isHouse = ad.type === "House";
  const isLand = ad.type === "Land";

  return (
    <div className='w-full min-h-screen pb-10 bg-[#FBE9D0]'>
      <PageHeader title="Edit existing post" />
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

            <ImageUpload ad={ad} setAd={setAd} />
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