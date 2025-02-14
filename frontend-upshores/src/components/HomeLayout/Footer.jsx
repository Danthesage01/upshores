import React from "react";

function Footer() {
  return (
    <footer
      id="footer"
      className="bg-gray-900 text-gray-400 py-12"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center mb-4 sm:mb-0">
            <i className="fa-solid fa-ship text-white text-2xl mr-2"></i>
            <span className="text-white font-bold">UpShore</span>
          </div>
          <div className="text-center sm:text-right text-sm">
            UpShore – Bridging the Distance, Elevating Your Business
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
