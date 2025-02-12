import React from "react";
import {
  Benefits,
  Challenge,
  CTA,
  Footer,
  Hero,
  HowItWorks,
  Navbar,
  Solution,
  Testimonials,
} from "../components/HomeLayout";

export const LandingPage = () => {
  return (
    <div className="h-full ">
      <div
        id="landing-page"
        className="w-full bg-white"
      >
        <Navbar />
        <Hero />
        <Challenge />
        <Solution />
        <HowItWorks />
        <Benefits />
        <Testimonials />
        <CTA />
        <Footer />
      </div>
    </div>
  );
};
