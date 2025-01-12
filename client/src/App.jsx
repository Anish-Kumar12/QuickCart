import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import { useDispatch } from "react-redux";
import fetchUserDetails from "./utils/fetchUserDetails.js";
import { setUserDetails } from "./store/UserSlice.js";
import {
  setAllCategory,
  setAllSubCategory,
  setLoadingCategory,
} from "./store/productSlice.js";
import Axios from "./utils/Axios.js";
import SummaryApi from "./common/SummaryApi.js";
import GlobalProvider from "./provider/GlobalProvider.jsx";
import { Toaster } from "react-hot-toast";
import CartMobileLink from "./components/CartMobile.jsx";

function App() {
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  const location = useLocation();

  const fetchUser = async () => {
    const userData = await fetchUserDetails();
    dispatch(setUserDetails(userData.data));
  };
  const fetchCategory = async () => {
    try {
      dispatch(setLoadingCategory(true));
      const response = await Axios({
        ...SummaryApi.getCategory,
      });
      const { data: responseData } = response;

      if (responseData.success) {
        dispatch(
          setAllCategory(
            responseData.data.sort((a, b) => a.name.localeCompare(b.name))
          )
        );
      }
    } catch (error) {
    } finally {
      dispatch(setLoadingCategory(false));
    }
  };
  const fetchSubCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getSubCategory,
      });
      const { data: responseData } = response;

      if (responseData.success) {
        dispatch(
          setAllSubCategory(
            responseData.data.sort((a, b) => a.name.localeCompare(b.name))
          )
        );
      }
    } catch (error) {}
  };
  useEffect(() => {
    fetchUser();
    fetchCategory();
    fetchSubCategory();
  }, []);

  return (
    <GlobalProvider> 
      <Header/>
      <main className='min-h-[78vh]'>
          <Outlet/>
      </main>
      <Footer/>
      <Toaster/>
      {
        location.pathname !== '/checkout' && (
          <CartMobileLink/>
        )
      }
    </GlobalProvider>
  );
}

export default App;
