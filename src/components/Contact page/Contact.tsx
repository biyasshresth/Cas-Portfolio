import React from "react";

const Contact: React.FC = () => {
  return (
    <section id="Contact" data-nav="light" className="relative w-full h-screen bg-white overflow-hidden py-16 px-6">
        <div className="absolute top-0 left-0 w-48 h-48 pointer-events-none" aria-hidden="true">
        <svg viewBox="0 0 192 192" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <circle cx="0" cy="0" r="160" stroke="#555" strokeWidth="28" fill="none" opacity="0.35" />
          <circle cx="0" cy="0" r="110" stroke="#888" strokeWidth="28" fill="none" opacity="0.25" />
          <circle cx="0" cy="0" r="60"  stroke="#aaa" strokeWidth="28" fill="none" opacity="0.2"  />
        </svg>
      </div>
      <div className="absolute top-0 right-0 w-48 h-48 pointer-events-none" aria-hidden="true">
        <svg viewBox="0 0 192 192" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <circle cx="192" cy="0" r="160" stroke="#aaa" strokeWidth="28" fill="none" opacity="0.2"  />
          <circle cx="192" cy="0" r="110" stroke="#888" strokeWidth="28" fill="none" opacity="0.25" />
          <circle cx="192" cy="0" r="60"  stroke="#555" strokeWidth="28" fill="none" opacity="0.35" />
        </svg>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto text-center flex flex-col items-center gap-8">
        <h1 className="text-5xl font-bold font-heading uppercase text-black">
          Contact
        </h1>
        <p className="text-xl font-bold uppercase font-body text-black">
          Ready to Explore CAS?
        </p>
        <p className="text-sm font-bold font-body uppercase text-black leading-relaxed max-w-lg">
          CAS (Cash Accounting System) Experience a smarter way to manage your business with powerful tools built for efficiency. Take the next step toward streamlined operations. Explore the features that make managing your business faster, easier, and more efficient.
        </p>
        <div className="flex flex-wrap justify-center gap-6 mt-16">
          <a
            href="#demo"
            className="px-8 py-3 bg-black text-white text-sm font-bold uppercase tracking-widest border-2 border-black hover:bg-white hover:text-black transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-black"
          >
            Request a Demo
          </a>
          <a
            href="#call"
            className="px-8 py-3 bg-white text-black text-sm font-bold uppercase tracking-widest border-2 border-black hover:bg-black hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-black"
          >
            Schedule a Call
          </a>
        </div>
        <a
          href="mailto:cas.email@example.com"
          className="text-sm font-bold uppercase tracking-widest text-black hover:underline font-body"
        >
          cas.email@example.com
        </a>
      </div>
    </section>
  );
};

export default Contact;