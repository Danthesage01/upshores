import React from "react";

function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-20 bg-gray-50"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-16">
          How It Works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              step: "1",
              title: "Register on UpShore",
              description:
                "Sign up in minutes, providing key details about your company and the roles you need to fill.",
            },
            {
              step: "2",
              title: "Subscribe for Full Access",
              description:
                "For $200/month, unlock our diverse database of remote professionals—no hidden fees or long-term contracts.",
            },
            {
              step: "3",
              title: "Browse & Connect",
              description:
                "Use our advanced filters to find the perfect professional for your needs.",
            },
            {
              step: "4",
              title: "Interview & Hire",
              description:
                "Communicate directly with candidates, schedule interviews, and finalize contracts.",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="bg-white p-8 rounded-xl shadow-sm"
            >
              <div className="text-blue-600 text-4xl font-bold mb-4">
                {item.step}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
