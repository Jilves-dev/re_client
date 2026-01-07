import SearchMain from "../components/forms/SearchMain";
import { useSearch } from "../context/search";
import AdCard from "../components/cards/AdCard";


export default function Search() {
  const [search, setSearch] = useSearch();

  return (
    <div className='w-full pb-10'>
      <br></br>
     <div className="flex justify-center py-10 mx-auto">
      <SearchMain />
      </div>
      <div name="search">
        {/*</div><div className="row">
          {search.results?.length > 0 ? (
            <div className="col-md-12 text-center font-castoro p-5">
              found {search.results?.length} results
            </div>
          ) : (
            <div className="col-md-12 text-center font-castoro p-5">no properties found yet</div>
          )}
        </div>
            <div className="grid grid-cols-1 
                sm:grid-cols-1 
                md:grid-cols-2 
                xl:grid-cols-3   
                justify-center mb-10 gap-y-10 
                place-items-center 
                px-4 sm:px-8 
                py-10 bg-[#FBE9D0] animate-fadeIn">
                  {search.results?.map((item, index) => (
                    <AdCard 
                    ad={item} 
                    key={item._id} />
                  ))}
                </div>*/}

                {search.loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-24 h-24 border-2 border-[#90AEAD] border-t-transparent rounded-full animate-spin mb-4"></div>
          </div>
        ) : (
          <>
            <div className="row">
              {search.results?.length > 0 ? (
                <div className="col-md-12 text-center font-decomang text-[#244855] text-2xl p-5 sm:p-5">
                  found {search.results?.length} results
                </div>
              ) : (
                <div className="col-md-12 text-center font-decomang text-[#244855] text-2xl p-2 sm:p-5">no properties found</div>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-center mb-10 gap-y-10 place-items-center px-4 sm:px-8 py-10 bg-[#FBE9D0] animate-fadeIn">
              {search.results?.map((item) => (
                <AdCard ad={item} key={item._id} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}