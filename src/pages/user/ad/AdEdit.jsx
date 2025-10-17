import { useState, useEffect } from "react";
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

  /*  const handleClick = async () => {
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
  };*/

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

  /*const handleDelete = async () => {
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
  };*/

  /*const customStyles = {
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
  };*/

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
              </button>*/}
              {/*<div className="d-grid gap-2">
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
            </div>*/}

            <div className="d-grid gap-2">
              {/*<button
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
              </button>*/}

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
}
