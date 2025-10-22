import { useLocation } from "react-router-dom";

export default function Spinner({ message = "Loading..." }) {
  const location = useLocation();
  
  // Tarkista, onko käyttäjä dashboard-alueella tai agent-sivulla
  const isDashboard = location.pathname.startsWith('/dashboard') || 
                      location.pathname.startsWith('/ad/create') ||
                      location.pathname.startsWith('/user/');

  // Dynaamiset värit
  const spinnerColor = isDashboard ? 'border-[#874F41]' : 'border-[#90AEAD]';
  const textColor = isDashboard ? 'text-[#874F41]' : 'text-[#244855]';

  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className={`w-24 h-24 border-2 ${spinnerColor} border-t-transparent rounded-full animate-spin mb-4`}></div>
      <p className={`font-castoro ${textColor} text-lg`}>{message}</p>
    </div>
  );
}




/*export default function Spinner({ message = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-24 h-24 border-2 border-[#90AEAD] border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="font-castoro text-[#244855] text-lg">{message}</p>
    </div>
  );
}*/

