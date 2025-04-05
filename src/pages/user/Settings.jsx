import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Sidebar from "../../components/nav/Sidebar";
//import oldDam2 from "../../assets/old_dam2.jpg"; 

const PageHeader = ({ title }) => (
  <div className="w-full text-align:left pb-12 pt-14 xl:pb-16 xl:pt-20 bg-[#874F41]">
    <div className="flex items-center pl-8">
      <h1 className="font-castoro text-align:left text-6xl md:text-6xl xl:text-7xl text-[#E64833]">
        {title}
      </h1>
    </div>
  </div>
);

/*const PageHeader = ({ title }) => (
  <div
    className="w-full text-align:left pb-12 pt-14 xl:pb-16 xl:pt-20"
    style={{
      backgroundImage: `url(${oldDam2})`,
      backgroundSize: "cover", // Varmistetaan että kuva peittää koko taustan
      backgroundPosition: "center", // Keskitetään kuva
      backgroundRepeat: "no-repeat", // Estetään kuvan toistuminen
    }}
  >
    <div className="flex items-center pl-6">
      <h1 className="font-castoro text-align:left text-6xl md:text-6xl xl:text-7xl text-[#E64833] relative z-10">
        {title}
      </h1>
    </div>
    <div className="absolute inset-0 bg-black opacity-30"></div>
  </div>
);*/


export default function Settings() {
  // state
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.put("/update-password", {
        password,
      });
      if (data?.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        setLoading(false);
        toast.success("Password updated");
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <>
    <div name='settings'> 
        <PageHeader title="Update password"/>
        </div>
        <Sidebar />
        <div className="container mt-2">
          <br></br> <br></br>
          <div className="row w-full">
            <div className="col-lg-8 offset-lg-2 mt-2 text-[#90AEAD]">
              <form onSubmit={handleSubmit}>
                <input
                  type="password"
                  placeholder="enter new password"
                  className="form-control mb-4"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  className="font-castoro !bg-[#FBE9D0] hover:bg-[#cf8c60] !border-2 !border-[#874F41] !text-[#E64833] py-2 px-4 rounded col-12"
                  disabled={loading}
                >
                  {loading ? "Processing" : "Update password"}
                </button>

                {/*<button
                onClick={handleClick}
                    className="!bg-[#FBE9D0] hover:bg-[#cf8c60] !text-[#E64833] font-castoro py-2 px-4 rounded !border-2 !border-[#874F41] col-12"
                      >
                      {ad.loading ? "Saving..." : "Submit"}
              </button>*/}
              </form>
            </div>
          </div>
      </div>
    </>
  );
}