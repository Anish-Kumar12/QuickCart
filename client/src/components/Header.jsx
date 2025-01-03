import React from "react";
import logo from "../assets/logo.png";
import Search from "../components/Search";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";
import usemobile from "../hooks/UseMobile";
import { BsCart4 } from "react-icons/bs";
import { useSelector } from "react-redux";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";

function Header() {
  const [isMobile] = usemobile();
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const redirecttologin = () => {
    navigate("/login");
  };

  const isSearchPage = location.pathname === "/search";

  return (
    <header className="h-24 lg:h-20 lg:shadow-md sticky top-0 z-40 flex flex-col justify-center gap-1 bg-white">
      {!(isSearchPage && isMobile) && (
        <div className="container mx-auto flex items-center h-full px-2 justify-between">
          {/**logo */}
          <div className="h-full">
            <Link to={"/"} className="h-full flex justify-center items-center">
              <img
                src={logo}
                width={170}
                height={60}
                alt="logo"
                className="hidden lg:block"
              />
              <img
                src={logo}
                width={120}
                height={60}
                alt="logo"
                className="lg:hidden "
              />
            </Link>
          </div>
          {/**search bar */}
          <div className="hidden lg:block">
            <Search />
          </div>
          {/* Login and my cart */}
          <div className="">
            <button className="text-neutral-600 lg:hidden">
              <FaRegCircleUser size={26} />
            </button>
            <div className="hidden lg:flex  items-center gap-10">
              {user?._id ? (
                <div>
                  <div className="flex items-center gap-2">
                    <p>Account</p>
                    <GoTriangleDown />
                  </div>
                </div>
              ) : (
                <button onClick={redirecttologin} className="text-lg px-2">
                  Login
                </button>
              )}

              <button className="flex items-center gap-2 bg-green-800 hover:bg-green-700 px-3 py-2 rounded text-white">
                <div className="hover:animate-bounce">
                  <BsCart4 size={26} />
                </div>
                <div className="font-semibold text-sm">
                  <p>MY CART</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-2 lg:hidden">
        <Search />
      </div>
    </header>
  );
}

export default Header;
