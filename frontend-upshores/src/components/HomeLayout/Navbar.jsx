import React, { useState, useEffect } from "react";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    // Enable smooth scrolling in CSS
    document.documentElement.style.scrollBehavior = "smooth";

    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries.find((entry) => entry.isIntersecting);
        if (visibleSection) {
          setActiveSection(visibleSection.target.id);
        }
      },
      { threshold: 0.5 } // Adjust threshold for visibility
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const handleMenuItemClick = (e, id) => {
    e.preventDefault(); // Prevent default anchor behavior
    setIsMenuOpen(false);

    // Scroll smoothly to the section
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      id="header"
      className="fixed w-full bg-white/95 backdrop-blur-sm border-b border-tertiary-100 z-50"
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <a
          href="#hero"
          className="flex items-center"
        >
          <i className="fa-solid fa-ship text-primary-600 text-3xl mr-2"></i>
          <span className="text-2xl font-bold text-tertiary-800">UpShore</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {["how-it-works", "benefits", "pricing"].map((id) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => handleMenuItemClick(e, id)}
              className={`${
                activeSection === id ? "text-blue-500" : "text-tertiary-600"
              } hover:text-primary-600`}
            >
              {id.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
            </a>
          ))}
        </nav>

        {/* Desktop Login and Get Started */}
        <div className="hidden md:flex items-center space-x-4">
          <a
            href="/login"
            className="text-tertiary-600 hover:text-primary-600"
          >
            Login
          </a>
          <a
            href="/register"
            className="bg-primary-600 text-white px-6 py-2 rounded-full hover:bg-primary-700"
          >
            Get Started
          </a>
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-tertiary-600 focus:outline-none"
          >
            <i
              className={`fa-solid ${
                isMenuOpen ? "fa-xmark" : "fa-bars"
              } text-2xl`}
            ></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden ${
          isMenuOpen ? "block" : "hidden"
        } bg-white py-4 px-4`}
      >
        <nav className="space-y-4">
          {["how-it-works", "benefits", "pricing"].map((id) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => handleMenuItemClick(e, id)}
              className={`block ${
                activeSection === id ? "text-blue-500" : "text-tertiary-600"
              } hover:text-primary-600`}
            >
              {id.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
            </a>
          ))}
          <a
            href="/login"
            className="block text-tertiary-600 hover:text-primary-600"
          >
            Login
          </a>
          <a
            href="/register"
            className="block bg-primary-600 text-white px-6 py-2 rounded-full hover:bg-primary-700 text-center"
          >
            Get Started
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;

// import React, { useState } from "react";

// function Navbar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const handleMenuItemClick = () => {
//     setIsMenuOpen(false);
//   };
//   return (
//     <header
//       id="header"
//       className="fixed w-full bg-white/95 backdrop-blur-sm border-b border-tertiary-100 z-50"
//     >
//       <div className="container mx-auto px-4 py-4 flex justify-between items-center">
//         <div className="flex items-center">
//           <i className="fa-solid fa-ship text-primary-600 text-3xl mr-2"></i>
//           <span className="text-2xl font-bold text-tertiary-800">UpShore</span>
//         </div>

//         {/* Desktop Navigation */}
//         <nav className="hidden md:flex space-x-8">
//           <a
//             href="#how-it-works"
//             className="text-tertiary-600 hover:text-primary-600"
//           >
//             How It Works
//           </a>
//           <a
//             href="#benefits"
//             className="text-tertiary-600 hover:text-primary-600"
//           >
//             Benefits
//           </a>
//           <a
//             href="#pricing"
//             className="text-tertiary-600 hover:text-primary-600"
//           >
//             Pricing
//           </a>
//         </nav>

//         {/* Desktop Login and Get Started */}
//         <div className="hidden md:flex items-center space-x-4">
//           <a
//             href="/login"
//             className="text-tertiary-600 hover:text-primary-600"
//           >
//             Login
//           </a>
//           <a
//             href="/register"
//             className="bg-primary-600 text-white px-6 py-2 rounded-full hover:bg-primary-700"
//           >
//             Get Started
//           </a>
//         </div>

//         {/* Hamburger Icon for Mobile */}
//         <div className="md:hidden flex items-center">
//           <button
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//             className="text-tertiary-600 focus:outline-none"
//           >
//             <i
//               className={`fa-solid ${
//                 isMenuOpen ? "fa-xmark" : "fa-bars"
//               } text-2xl`}
//             ></i>
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       <div
//         className={`md:hidden ${
//           isMenuOpen ? "block" : "hidden"
//         } bg-white py-4 px-4`}
//       >
//         <nav className="space-y-4">
//           <a
//             href="#how-it-works"
//             onClick={handleMenuItemClick}
//             className="block text-tertiary-600 hover:text-primary-600"
//           >
//             How It Works
//           </a>
//           <a
//             href="#benefits"
//             onClick={handleMenuItemClick}
//             className="block text-tertiary-600 hover:text-primary-600"
//           >
//             Benefits
//           </a>
//           <a
//             href="#pricing"
//             onClick={handleMenuItemClick}
//             className="block text-tertiary-600 hover:text-primary-600"
//           >
//             Pricing
//           </a>
//           {/* Mobile-specific Login and Get Started buttons */}
//           <a
//             href="/login"
//             onClick={handleMenuItemClick}
//             className="block text-tertiary-600 hover:text-primary-600"
//           >
//             Login
//           </a>
//           <a
//             href="/register"
//             onClick={handleMenuItemClick}
//             className="block bg-primary-600 text-white px-6 py-2 rounded-full hover:bg-primary-700 text-center"
//           >
//             Get Started
//           </a>
//         </nav>
//       </div>
//     </header>
//   );
// }

// export default Navbar;
