import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import useMobile from "../hooks/UseMobile.jsx";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";


const Search = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isSearchPage, setIsSearchPage] = useState(false);
    const [ isMobile ] = useMobile()
    const params = useLocation()
    const searchText = params.search.slice(3)


    useEffect(() => {
        const isSearch = location.pathname === "/search";
        setIsSearchPage(isSearch);
    }, [location]);

    const redirectToSearch = () => {
        navigate("/search");
    };

    const handleOnChange = (e) => {
        const value = e.target.value;
        const url = `/search?q=${value}`;
        navigate(url);
    };

    return (
        <div className="w-full min-w-[300px] lg:min-w-[420px] h-12 rounded-lg overflow-hidden flex items-center border text-neutral-600 bg-slate-50 group-focus">
        <div>
            {
                (isMobile && isSearchPage ) ? (
                    <Link to={"/"} className='flex justify-center items-center h-full p-2 m-1 group-focus-within:text-primary-200 bg-white rounded-full shadow-md'>
                        <FaArrowLeft size={20}/>
                    </Link>
                ) :(
                    <button className='flex justify-center items-center h-full p-3 group-focus-within:text-primary-200' onClick={redirectToSearch}>
                        <IoSearch size={22}/>
                    </button>
                )
            }
        </div>
            <div className="flex-grow">
                {!isSearchPage ? (
                    <div onClick={redirectToSearch} className="w-full h-full flex items-center">
                        <TypeAnimation
                            sequence={[
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
                                1000,
                            ]}
                            wrapper="span"
                            speed={50}
                            repeat={Infinity}
                        />
                    </div>
                ) : (
                    <div className="w-full h-full">
                        <input
                            type="text"
                            placeholder="Search for products"
                            autoFocus
                            defaultValue={searchText}
                            className="w-full h-full bg-transparent focus:outline-none"
                            onChange={handleOnChange}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Search;
