import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";

const Search = () => {
  const navigate = useNavigate();
  const Location = useLocation();
  const [isSearchPage, setIsSearchPage] = useState(false);

  useEffect(() => {
    const isSearch = Location.pathname === "/search";
    setIsSearchPage(isSearch);
  }, [Location]);

  const redirecttoSearch = () => {
    navigate("/search");
  };
  return (
    <div className="w-full min-w-[300px] lg:min-w-[420px] h-12 rounded-lg overflow-hidden flex items-center border text-neutral-600 bg-slate-50 group-focus ">
      <button className="flex justify-center items-center h-full p-3">
        <IoSearch size={22} />
      </button>
      <div>
        {!isSearchPage ? (
          <div onClick={redirecttoSearch}>
            <TypeAnimation
              sequence={[
                'Search "milk"',
                1000,
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
        ) : (
          <div className="w-full">
            <input
              type="text"
              placeholder="Search for products"
              autoFocus
              className="w-full h-full bg-transparent focus:outline-none"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
