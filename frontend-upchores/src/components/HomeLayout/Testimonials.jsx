import React from "react";

function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-20 bg-gray-50"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-16">
          What Our Clients Say
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              name: "Sarah L.",
              role: "Startup Founder",
              quote:
                "Using UpShore, we onboarded a full-stack developer from Bangladesh who delivered top-quality work at a fraction of our usual costs. Highly recommended!",
              image:
                "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg",
            },
            {
              name: "James W.",
              role: "Agency Director",
              quote:
                "Our agency needed an AI specialist ASAP. UpShore had us interviewing candidates within 48 hours—saved us time and money!",
              image:
                "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg",
            },
          ].map((item) => (
            <div
              key={item.name}
              className="bg-white p-8 rounded-xl shadow-sm"
            >
              <p className="text-gray-600 mb-6">{item.quote}</p>
              <div className="flex items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <div className="font-bold text-gray-900">{item.name}</div>
                  <div className="text-gray-600">{item.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
