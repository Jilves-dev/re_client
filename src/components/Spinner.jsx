import { useLocation } from 'react-router-dom';

export default function Spinner({ message = 'Loading...' }) {
  const location = useLocation();

  // Tarkista, onko käyttäjä dashboard-alueella tai agent-sivulla
  const isDashboard =
    location.pathname.startsWith('/dashboard') ||
    location.pathname.startsWith('/ad/create') ||
    location.pathname.startsWith('/user/');

  // Dynaamiset värit
  const spinnerColor = isDashboard ? 'border-[#90AEAD]' : 'border-[#90AEAD]';
  const textColor = isDashboard ? 'text-[#90AEAD]' : 'text-[#244855]';

  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div
        className={`w-24 h-24 border-2 ${spinnerColor} border-t-transparent rounded-full animate-spin mb-4`}
      ></div>
      <p className={`font-poiretOne text-center ${textColor} text-lg`}>
        {message}
      </p>
    </div>
  );
}
