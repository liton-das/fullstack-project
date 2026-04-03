import React from "react";

const teamMembers = [
  {
    name: "John Doe",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=200",
  },
  {
    name: "Sarah Lee",
    role: "UI/UX Designer",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200",
  },
  {
    name: "Michael Smith",
    role: "Backend Developer",
    image: "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?w=200",
  },
];

const About = () => {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* HERO */}
      <section className="bg-blue-600 text-white py-16 text-center px-6">
        <h1 className="text-4xl font-bold">About Us</h1>
        <p className="mt-4 max-w-2xl mx-auto text-blue-100">
          We are passionate about building modern web experiences that are fast,
          scalable, and user-friendly.
        </p>
      </section>

      {/* ABOUT CONTENT */}
      <section className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-10 items-center">
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800"
          alt="Team working"
          className="rounded-2xl shadow-lg w-full h-87.5 object-cover"
        />

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Who We Are</h2>
          <p className="text-gray-600">
            We are a team of developers, designers, and creators focused on
            delivering high-quality digital products.
          </p>
          <p className="text-gray-600">
            From web development to UI/UX design, we combine creativity and
            technical expertise.
          </p>
        </div>
      </section>

      {/* TEAM */}
      <section className="max-w-6xl mx-auto px-6 py-12 text-center">
        <h2 className="text-2xl font-semibold mb-8">Meet Our Team</h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 mx-auto rounded-full object-cover"
              />
              <h3 className="mt-4 font-semibold">{member.name}</h3>
              <p className="text-sm text-gray-500">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default About;