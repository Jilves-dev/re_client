import { useEffect, useState } from "react";
import axios from "axios";
import UserCard from "../components/cards/UserCard";
import Spinner from "../components/Spinner";
/*const PageHeader = ({ title }) => (
  <div className="mx-auto w-full text-align:left pb-16 pt-20 bg-[#51829B]">
    <h1 className="pl-10 text-6xl sm:text-7xl font-bold text-[#F5F5F5]">
      {title}
    </h1>
  </div>
);*/

const PageHeader = ({ title }) => (
  <div className="w-full text-align:left pb-12 pt-14 xl:pb-16 xl:pt-20 bg-[#90AEAD]">
    <div className="flex items-center pl-10">
      <h1 className="font-Castoro text-align:left text-6xl md:text-7xl xl:text-8xl text-[#244855] font-normal">
        {title}
      </h1>
      {/*<img src={artNouveau} alt="Art Nouveau" className="h-[6em] w-auto ml-4 bg-[#51829B]" />*/}
    </div>
  </div>
);


export default function Agents() {
  // state
  const [agents, setAgents] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      const { data } = await axios.get("/agents");
      setAgents(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div name='home' className='max-w-screen w-full pb-10'>
                {/*<div name="header" className="w-full">
                  <PageHeader title="our Space realization Dealers"/>
                </div>*/}
                <Spinner message="Loading properties..." />
              </div>
    );
  }

  return (
    <div className='max-w-screen w-full pb-10'>
      <div className="container_bg">
      </div>
      <div name="agents" className="w-full">
      <PageHeader title="our Space realization Dealers"/>
      </div>
      <br></br>
      <div className="grid grid-cols-1 
        sm:grid-cols-1 
        md:grid-cols-2 
        xl:grid-cols-3   
        justify-center mb-10 gap-y-10 place-items-center px-4 sm:px-8 py-10 bg-[#FBE9D0] animate-fadeIn">
        {agents?.map((agent, index) => (
          <UserCard 
            user={agent} 
            key={agent._id} 
            /*className={index % 3 === 0 ? 'justify-self-end' :
                       index % 3 === 1 ? '' :
                       'justify-self-start'}*/
            />
        ))}
      </div>
    </div>
  );
}


 {/*<div
        className="d-flex justify-content-center align-items-center vh-100"
        style={{ marginTop: "-10%" }}
      >
        <div className="display-1 font-floral text-[#90AEAD]">Loading ...</div>
      </div>*/}