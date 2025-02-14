import React from "react";

function Benefits() {
  return (
    <section
      id="benefits"
      className="py-20 bg-white"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-16">
          Key Benefits
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              icon: "fa-dollar-sign",
              title: "Cost-Effective Talent",
              description:
                "Reduce staffing expenses by leveraging global hiring markets while maintaining high-quality results.",
            },
            {
              icon: "fa-star",
              title: "Top-Tier Expertise",
              description:
                "Our meticulous vetting process ensures you're only seeing the best of the best.",
            },
            {
              icon: "fa-clock",
              title: "Time-Saving Platform",
              description:
                "Eliminate the hassle of juggling multiple job boards—manage everything from one central hub.",
            },
            {
              icon: "fa-arrows-up-down",
              title: "Scalable Workforce",
              description:
                "Need additional hands for a big project? Hire on-demand without the overhead costs.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="flex gap-4 p-6 border border-gray-100 rounded-xl"
            >
              <i
                className={`fa-solid ${item.icon} text-blue-600 text-2xl mt-1`}
              ></i>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Benefits;
