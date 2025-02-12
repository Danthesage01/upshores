import React from "react";

function Hero() {
  return (
    <section
      id="hero"
      className="pt-28 pb-20 bg-gradient-to-b from-primary-50 to-white"
    >
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl font-bold text-tertiary-900 leading-tight">
              Scale Your Business with Top Global Talent at a Fraction of the
              Cost
            </h1>
            <p className="text-xl text-tertiary-600">
              Access a curated network of skilled professionals from emerging
              markets—Bangladesh, Nigeria, and more—without sacrificing quality
              or breaking the bank.
            </p>
            <div className="flex space-x-4">
              <a
                href="/register"
                className="bg-primary-600 text-white px-8 py-3 rounded-full hover:bg-primary-700 inline-flex items-center"
              >
                Start Hiring <i className="fa-solid fa-arrow-right ml-2"></i>
              </a>
              <a
                href="#how-it-works"
                className="bg-white border border-tertiary-200 text-tertiary-700 px-8 py-3 rounded-full hover:bg-tertiary-50"
              >
                Learn More
              </a>
            </div>
          </div>
          <div className="relative">
            <img
              className="rounded-lg shadow-2xl"
              src="https://storage.googleapis.com/uxpilot-auth.appspot.com/35a6607488-a6ed2022253236b10782.png"
              alt="professional diverse team working remotely"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
