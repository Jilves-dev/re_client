//import SearchForm from "../components/forms/SearchForm";
//import SearchFormzz from "../components/forms/SearchFormzz";
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
        <div className="row">
          {search.results?.length > 0 ? (
            <div className="col-md-12 text-center font-castoro p-5">
              found {search.results?.length} results
            </div>
          ) : (
            <div className="col-md-12 text-center font-castoro p-5">no properties found yet</div>
          )}
        </div>

        {/*<div className="grid grid-cols-1 md:grid-cols-3 
        justify-center gap-0 gap-y-10 
        place-items-center px-20 py-10 bg-[#F5F5F5]">
          {search.results?.map((item, index) => (
            <AdCard 
              ad={item} 
              key={item._id} 
              className={index % 3 === 0 ? 'justify-self-end' :
                         index % 3 === 1 ? '' :
                         'justify-self-start'}
              />
          ))}
        </div>*/}

            <div className="grid grid-cols-1 
                sm:grid-cols-1 
                md:grid-cols-2 
                xl:grid-cols-3   
                justify-center mb-10 gap-y-10 
                place-items-center 
                px-4 sm:px-8 
                py-10 bg-[#FBE9D0]">
                  {search.results?.map((item, index) => (
                    <AdCard 
                    ad={item} 
                    key={item._id} />
                  ))}
                </div>

      </div>
    </div>
  );
}