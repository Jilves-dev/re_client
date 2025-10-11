export default function Spinner({ message = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-20 h-20 border-4 border-[#90AEAD] border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="font-castoro text-[#244855] text-lg">{message}</p>
    </div>
  );
}