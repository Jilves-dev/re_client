import { useEffect, useState } from 'react';
import axios from 'axios';
import UserCard from '../components/cards/UserCard';
import Spinner from '../components/Spinner';

const PageHeader = ({ title }) => (
  <div className="w-full text-align:left pb-10 pt-12 sm:pb-12 pt-14 xl:pb-12 xl:pt-20 bg-[#90AEAD]">
    <div className="flex items-center pl-3 sm:pl-8">
      <h1 className="font-decomang text-align:left text-6xl md:text-7xl xl:text-8xl text-[#244855] font-normal">
        {title}
      </h1>
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
      const { data } = await axios.get('/agents');
      setAgents(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div name="home" className="max-w-screen w-full pb-10 font-poiretOne">
        <Spinner message="Loading properties..." />
      </div>
    );
  }

  return (
    <div className="max-w-screen w-full pb-10">
      <div className="container_bg"></div>
      <div name="agents" className="w-full">
        <PageHeader title="Space realization Dealers" />
      </div>
      <br></br>
      <div
        className="grid grid-cols-1 
        sm:grid-cols-1 
        md:grid-cols-2 
        xl:grid-cols-3   
        justify-center mb-10 gap-y-10 place-items-center px-4 sm:px-8 py-10 bg-[#FBE9D0] animate-fadeIn"
      >
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
