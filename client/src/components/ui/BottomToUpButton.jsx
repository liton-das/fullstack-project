import React, { useState } from "react";
import { FaArrowUp } from "react-icons/fa";
const BottomToUpButton = () => {
  // show button after scroll down 300px
  const [showButton, setShowButton] = useState(false);
  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  // Add event listener to the button
  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* Botton to up animated button */}
      <div className="fixed bottom-18 right-4">
        {showButton && (
          <button
            onClick={scrollToTop}
            className="cursor-pointer animate-bounce p-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-opacity duration-300 opacity-80 hover:opacity-100 z-50"
          >
            <FaArrowUp />
          </button>
        )}
      </div>
    </>
  );
};

export default BottomToUpButton;
