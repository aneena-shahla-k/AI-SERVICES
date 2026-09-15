import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // പേജ് മാറുമ്പോൾ പെട്ടെന്ന് മുകളിലെത്താൻ instant ആണ് നല്ലത്
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;