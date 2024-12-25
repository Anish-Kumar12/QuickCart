import React, { useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";

const Search = () => {
    const navigate = useNavigate();
    const Location = useLocation();
    const [isSearchPage,setIsSearchPage] = React.useState(false);

    useEffect(() => {
        const isSearch = Location.pathname === "/search"
        setIsSearchPage(isSearch);
    }, [Location]);

    const redirecttoSearch = () => {
    // Redirect to search page
    navigate("/search");

    }
  return (
    <div className="w-full min-w-[300px] lg:min-w-[420px] h-12 rounded-lg overflow-hidden flex items-center border text-neutral-600 bg-slate-50 group-focus ">
      <button className="flex justify-center items-center h-full p-3" >
        <IoSearch size={22} />
      </button>
      <div>
        {
        !isSearchPage ?(
            //not in search page 
            <div onClick={redirecttoSearch}>
      <TypeAnimation
        sequence={[
          // Same substring at the start will only be typed out once, initially
          'Search "milk"',
          1000, // wait 1s before replacing "Mice" with "Hamsters"
          'Search "bread"',
          1000,
          'Search "sugar"',
          1000,
          'Search "panner"',
          1000,
          'Search "chocolate"',
          1000,
          'Search "curd"',
          1000,
          'Search "rice"',
          1000,
          'Search "egg"',
          1000,
          'Search "chips"',
        ]}
        wrapper="span"
        speed={50}
        repeat={Infinity}
      />
      </div>
        ):(
            <div className="w-full">
                <input
                type="text"
                placeholder="Search for products"
                autoFocus
                className="w-full h-full bg-transparent focus:outline-none"
                />
            </div>
        )
        }
      </div>

    </div>
  );
};

export default Search;
