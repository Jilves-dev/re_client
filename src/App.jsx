import React from "react";
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
  <div className="text-center p-5">SORRY BUT ERROR 404 PAGE YOU LOOKING FOR NOT FOUND!</div>
);

/*function App() {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [showBottomScrollButton, setShowBottomScrollButton] = useState(false);*/
 // const lastScrollPosition = React.useRef(0);

  /*useEffect(() => {
    const handleScroll = () => {
      // Näytä nuoli vasta kun on selattu 300px alaspäin
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);*/

 /* useEffect(() => {
    const handleScroll = () => {
      // Näytä ylänappi kun on selattu 300px alaspäin
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
      
      // Näytä alanappi kun käyttäjä on skrollannut footerista ylöspäin
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollPosition = window.scrollY;
      
      // Tarkista, onko käyttäjä footerin lähellä (esim. 300px päässä pohjasta)
      // ja skrollannut siitä ylöspäin
      const isNearBottom = documentHeight - (scrollPosition + windowHeight) < 300;
      const hasScrolledUp = scrollPosition < lastScrollPosition.current;
      
      if (isNearBottom && hasScrolledUp) {
        setShowBottomScrollButton(true);
      } else {
        setShowBottomScrollButton(false);
      }
      
      // Päivitä viimeisin skrollauspositio
      lastScrollPosition.current = scrollPosition;
    };
    
    // Tallenna viimeisin skrollauspositio useRef-hookilla
    //const lastScrollPosition = React.useRef(0);
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);*/


  /*function App() {
    const [showScrollButton, setShowScrollButton] = useState(false);
    const [showBottomScrollButton, setShowBottomScrollButton] = useState(false);
    
    useEffect(() => {
      const handleScroll = () => {
        // Näytä ylänappi kun on selattu 300px alaspäin
        if (window.scrollY > 300) {
          setShowScrollButton(true);
        } else {
          setShowScrollButton(false);
        }
        
        // Näytä alanappi kun käyttäjä on lähellä footeria
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollPosition = window.scrollY;
        
        // Käyttäjä on footerin lähellä, kun scrollY + viewport height on lähellä dokumentin kokonaiskorkeutta
        // esim. 100px päässä pohjasta
        const distanceFromBottom = documentHeight - (scrollPosition + windowHeight);
        
        if (distanceFromBottom < 100 && distanceFromBottom > 10) {
          setShowBottomScrollButton(true);
        } else {
          setShowBottomScrollButton(false);
        }
      };
      
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);*/

   /* function App() {
      const [showScrollButton, setShowScrollButton] = useState(false);
      const [showBottomScrollButton, setShowBottomScrollButton] = useState(false);
      
      useEffect(() => {
        const handleScroll = () => {
          // Näytä ylänappi kun on selattu 300px alaspäin
          if (window.scrollY > 300) {
            setShowScrollButton(true);
          } else {
            setShowScrollButton(false);
          }
          
          // Näytä alanappi kun käyttäjä on lähellä footeria
          const windowHeight = window.innerHeight;
          const documentHeight = document.documentElement.scrollHeight;
          const scrollPosition = window.scrollY;
          
          // Käyttäjä on footerin lähellä, kun scrollY + viewport height on lähellä dokumentin kokonaiskorkeutta
          const distanceFromBottom = documentHeight - (scrollPosition + windowHeight);
          
          if (distanceFromBottom < 100 && distanceFromBottom > 10) {
            setShowBottomScrollButton(true);
          } else {
            setShowBottomScrollButton(false);
          }
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);*/

      /*function App() {
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
            
            // Näytä ylänappi vain kun on selattu 300px alaspäin JA alanappi ei ole näkyvissä
            if (window.scrollY > 300 && !showBottom) {
              setShowScrollButton(true);
            } else {
              setShowScrollButton(false);
            }
          };
          
          window.addEventListener('scroll', handleScroll);
          return () => {
            window.removeEventListener('scroll', handleScroll);
          };
        }, []);*/


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
          </div>
  


      {/* Ylänappi */}
      {showScrollButton && (
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
          )}

          {/* Alanappi */}
          {showBottomScrollButton && (
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

export default App;






