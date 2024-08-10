import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default  function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    window.gtag('config', 'G-Q30SJ2KYLF', {
      page_path: location.pathname + location.search,
    });
  }, [location]);
}
