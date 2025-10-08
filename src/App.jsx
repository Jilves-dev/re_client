import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/auth";
import { SearchProvider } from "./context/search";
import Main from "./components/nav/Main";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AccountActivate from "./pages/auth/AccountActivate";
import ForgotPassword from "./pages/auth/ForgotPassword";
import AccessAccount from "./pages/auth/AccessAccount";
import Dashboard from "./pages/user/Dashboard";
import AdCreate from "./pages/user/ad/AdCreate";
import PrivateRoute from "./components/routes/PrivateRoute";
import SellHouse from "./pages/user/ad/SellHouse";
import SellLand from "./pages/user/ad/SellLand";
import RentHouse from "./pages/user/ad/RentHouse";
import RentLand from "./pages/user/ad/RentLand";
import AdView from "./pages/AdView";
import Footer from "./components/nav/Footer";
import Profile from "./pages/user/Profile";
import Settings from "./pages/user/Settings";
import AdEdit from "./pages/user/ad/AdEdit";
import Wishlist from "./pages/user/Wishlist";
import Enquiries from "./pages/user/Enquiries";
import Agents from "./pages/Agents";
import Agent from "./pages/Agent";
import Buy from "./pages/Buy";
import Rent from "./pages/Rent";
import Search from "./pages/Search";
import ScrollToTop from "./components/ScrollToTop";
import ArrowDown from "./assets/arrow-down.svg";
import { API } from './config';
import axios from "axios";
import toast from 'react-hot-toast';

// Page not found component
/*const PageNotFound = () => (
  <div className="text-center p-5">SORRY BUT ERROR MEANS THAT THE PAGE YOU ARE LOOKING FOR DOES NOT EXIST!!!</div>
);*/

const PageNotFound = () => (
  <div className="text-center p-5">
    <h2 className="mb-4">404 - Page Not Found</h2>
    <p>Sorry, the page you are looking for does not exist.</p>
    <Link to="/" className="btn btn-primary mt-3">
      Go to Home
    </Link>
  </div>
);

// Error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("App error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center p-5 bg-[#E64833] rounded-lg m-4">
          <h2 className="text-xl font-bold text-[#874F41] mb-2">Something went wrong</h2>
          <p className="mb-4">The application encountered an unexpected error. Try refreshing the page.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-[#E64833] text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Refresh Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [showBottomScrollButton, setShowBottomScrollButton] = useState(false);
  const [apiConnected, setApiConnected] = useState(true);
  
  // Verify API connection on startup
  useEffect(() => {
    const checkApiConnection = async () => {
      try {
        await axios.get(`${API}/test`);
        setApiConnected(true);
      } catch (error) {
        console.error("API connection failed:", error);
        setApiConnected(false);
        toast.error("Connection to server failed. Some features may not work properly.");
      }
    };
    
    checkApiConnection();
  }, []);
  
  useEffect(() => {
    const handleScroll = () => {
      // Determine when to show scroll buttons
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollPosition = window.scrollY;
      const distanceFromBottom = documentHeight - (scrollPosition + windowHeight);
      
      // Show bottom scroll button when near footer but not at the very bottom
      const showBottom = distanceFromBottom < 100 && distanceFromBottom > 10;
      setShowBottomScrollButton(showBottom);
      
      // Show top scroll button when scrolled down and not near footer
      const isNearFooter = distanceFromBottom < 100;
      if (window.scrollY > 300 && !isNearFooter) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <ErrorBoundary>
      <BrowserRouter>
      <ScrollToTop /> 
        <AuthProvider>
          <SearchProvider>
            <div className="flex flex-col min-h-screen w-full bg-[#FBE9D0]">
              <Main />
              {/*<Toaster position="top-center" />*/}

              <Toaster 
                position="top-center"
                toastOptions={{
                  style: {
                    marginTop: '85px', // Lisää marginaalia navbariin
                    zIndex: 100001, // Varmista että toast näkyy navbarin päällä
                  },
                  success: {
                    duration: 3000,
                    iconTheme: {
                      primary: '#90AEAD',
                      secondary: '#FBE9D0',
                    },
                  },
                  error: {
                    duration: 5000,
                    iconTheme: {
                      primary: '#E64833',
                      secondary: '#FBE9D0',
                    },
                  },
                }}
              />
              
              {!apiConnected && (
                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4 mx-4">
                  <p className="font-bold">Connection Warning</p>
                  <p>Unable to connect to the server. Some features may not work properly.</p>
                </div>
              )}
              
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/auth/account-activate/:token"
                  element={<AccountActivate />}
                />
                <Route path="/auth/forgot-password" element={<ForgotPassword />} />
                <Route
                  path="/auth/access-account/:token"
                  element={<AccessAccount />}
                />

                <Route path="/" element={<PrivateRoute />}>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="ad/create" element={<AdCreate />} />
                  <Route path="ad/create/sell/house" element={<SellHouse />} />
                  <Route path="ad/create/sell/land" element={<SellLand />} />
                  <Route path="ad/create/rent/house" element={<RentHouse />} />
                  <Route path="ad/create/rent/land" element={<RentLand />} />
                  <Route path="user/profile" element={<Profile />} />
                  <Route path="user/settings" element={<Settings />} />
                  <Route path="user/ad/:slug" element={<AdEdit />} />
                  <Route path="user/wishlist" element={<Wishlist />} />
                  <Route path="user/enquiries" element={<Enquiries />} />
                </Route>

                <Route path="/ad/:slug" element={<AdView />} />
                <Route path="/agents" element={<Agents />} />
                <Route path="/agent/:username" element={<Agent />} />
                <Route path="/buy" element={<Buy />} />
                <Route path="/rent" element={<Rent />} />
                <Route path="/search" element={<Search />} />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </div>
    
            {/* Scroll to top button */}
            {(showScrollButton || showBottomScrollButton) && (
              <img 
                src={ArrowDown} 
                alt="Scroll to top" 
                className="fixed right-8 bottom-11 w-15 h-15 z-30 cursor-pointer transition-all duration-300 hover:opacity-80"
                onClick={handleScrollToTop}
                style={{
                  outline: 'none',
                  filter: 'drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.3))',
                  backgroundColor: 'transparent',
                  border: 'none',
                  padding: '0',
                  transform: showBottomScrollButton ? 'rotate(180deg)' : 'none',
                }}
              />
            )}
          
            <Footer />
          </SearchProvider>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;




/*import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { AuthProvider } from "./context/auth";
import { SearchProvider } from "./context/search";
import Main from "./components/nav/Main";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AccountActivate from "./pages/auth/AccountActivate";
import ForgotPassword from "./pages/auth/ForgotPassword";
import AccessAccount from "./pages/auth/AccessAccount";
import Dashboard from "./pages/user/Dashboard";
import AdCreate from "./pages/user/ad/AdCreate";
import PrivateRoute from "./components/routes/PrivateRoute";
import SellHouse from "./pages/user/ad/SellHouse";
import SellLand from "./pages/user/ad/SellLand";
import RentHouse from "./pages/user/ad/RentHouse";
import RentLand from "./pages/user/ad/RentLand";
import AdView from "./pages/AdView";
import Footer from "./components/nav/Footer";
import Profile from "./pages/user/Profile";
import Settings from "./pages/user/Settings";
import AdEdit from "./pages/user/ad/AdEdit";
import Wishlist from "./pages/user/Wishlist";
import Enquiries from "./pages/user/Enquiries";
import Agents from "./pages/Agents";
import Agent from "./pages/Agent";
import Buy from "./pages/Buy";
import Rent from "./pages/Rent";
import Search from "./pages/Search";
import ArrowDown from "./assets/arrow-down.svg";

const PageNotFound = () => (
  <div className="text-center p-5">SORRY BUT ERROR MEANS THAT THE PAGE YOU ARE LOOKING FOR DOES NOT EXIST!!!</div>
);

        function App() {
          const [showScrollButton, setShowScrollButton] = useState(false);
          const [showBottomScrollButton, setShowBottomScrollButton] = useState(false);
          
          useEffect(() => {
            const handleScroll = () => {
              // Määritä ensin footerin läheisyys
              const windowHeight = window.innerHeight;
              const documentHeight = document.documentElement.scrollHeight;
              const scrollPosition = window.scrollY;
              const distanceFromBottom = documentHeight - (scrollPosition + windowHeight);
              
              // Määritä milloin alanappi näkyy
              const showBottom = distanceFromBottom < 100 && distanceFromBottom > 10;
              setShowBottomScrollButton(showBottom);
              
              // Näytä ylänappi vain kun käyttäjä on skrollannut alas, mutta ei ole lähellä footeria
              // Käytä isNearFooter-muuttujaa, joka on true, kun ollaan missä tahansa footerin lähellä
              const isNearFooter = distanceFromBottom < 100;
              
              if (window.scrollY > 300 && !isNearFooter) {
                setShowScrollButton(true);
              } else {
                setShowScrollButton(false);
              }
            };
            
            window.addEventListener('scroll', handleScroll);
            return () => {
              window.removeEventListener('scroll', handleScroll);
            };
          }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        <SearchProvider>
          <div className="flex flex-col min-h-screen w-full bg-[#FBE9D0]">
          <Main />
          <Toaster />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/auth/account-activate/:token"
              element={<AccountActivate />}
            />
            <Route path="/auth/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/auth/access-account/:token"
              element={<AccessAccount />}
            />

            <Route path="/" element={<PrivateRoute />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="ad/create" element={<AdCreate />} />
              <Route path="ad/create/sell/house" element={<SellHouse />} />
              <Route path="ad/create/sell/land" element={<SellLand />} />
              <Route path="ad/create/rent/house" element={<RentHouse />} />
              <Route path="ad/create/rent/land" element={<RentLand />} />
              <Route path="user/profile" element={<Profile />} />
              <Route path="user/settings" element={<Settings />} />
              <Route path="user/ad/:slug" element={<AdEdit />} />
              <Route path="user/wishlist" element={<Wishlist />} />
              <Route path="user/enquiries" element={<Enquiries />} />
            </Route>

            <Route path="/ad/:slug" element={<AdView />} />
            <Route path="/agents" element={<Agents />} />
            <Route path="/agent/:username" element={<Agent />} />

            <Route path="/buy" element={<Buy />} />
            <Route path="/rent" element={<Rent />} />
            <Route path="/search" element={<Search />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          </div>*/
  
      {/* Ylänappi */}
      /*{showScrollButton && (
            <img 
              src={ArrowDown} 
              alt="Scroll to top" 
              className="fixed right-8 bottom-11 w-15 h-15 z-30 cursor-pointer transition-all duration-300 hover:opacity-80"
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth'
                });
              }}
              style={{
                outline: 'none',
                filter: 'drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.3))',
                backgroundColor: 'transparent',
                border: 'none',
                padding: '0',
              }}
            />
          )}*/

          {/* Alanappi */}
          /*{showBottomScrollButton && (
            <img 
              src={ArrowDown} 
              alt="Scroll to top" 
              className="fixed right-8 bottom-11 w-15 h-15 z-30 cursor-pointer transition-all duration-300 hover:opacity-80"
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth'
                });
              }}
              style={{
                outline: 'none',
                filter: 'drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.3))',
                backgroundColor: 'transparent',
                border: 'none',
                padding: '0',
                //transform: 'rotate(180deg)', // Käännä nuoli ylöspäin
              }}
            />
          )}
        
          <Footer />
        </SearchProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;*/






