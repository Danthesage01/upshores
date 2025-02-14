import React from "react";

function CTA() {
  return (
    <section
      id="pricing"
      className="py-20 bg-blue-600"
    >
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-6">
          Take the Next Step with UpShore
        </h2>
        <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
          Stop overpaying for remote talent or settling for subpar work. UpShore
          gives you the best of both worlds: exceptional skills and cost
          savings.
        </p>
        <div className="flex flex-col items-center justify-center space-y-6">
          <a
            href="/register"
            className="bg-white text-blue-600 px-4 text-[14px] md:px-8 py-3  rounded-full hover:bg-blue-50 inline-flex items-center md:text-lg font-bold"
          >
            Sign Up Now – Unlock Top Global Talent
            <i className="fa-solid fa-arrow-right ml-2"></i>
          </a>
          <p className="text-blue-100">
            Questions?{" "}
            <a
              href="/contact"
              className="text-white underline"
            >
              Contact Support
            </a>{" "}
            or{" "}
            <a
              href="/demo"
              className="text-white underline"
            >
              Book a Demo
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

export default CTA;
