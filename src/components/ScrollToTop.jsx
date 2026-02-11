import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Välitön skrollaus ilman animaatiota
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    // Varmistus-skrollaus pienen viiveen jälkeen
    // (kun asynkroniset komponentit kuten MapCard ovat latautuneet)
    const timeoutId = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, 100);

    // Toinen varmistus hieman pidemmän viiveen jälkeen
    // (kun kuvat ja kartta ovat renderöityneet)
    const secondTimeoutId = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, 300);

    // Cleanup
    return () => {
      clearTimeout(timeoutId);
      clearTimeout(secondTimeoutId);
    };
  }, [pathname]);

  return null;
}

/*import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}*/
