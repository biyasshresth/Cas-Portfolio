import React from "react";

const Footer: React.FC = () => {
  return (
    <>
    <footer className="w-fullborder-t-2 border-black px-8 py-10"   style={{
        background:
          "linear-gradient(135deg,#1a0b2e 0%,#2d1b4e 50%,#1a0b2e 100%)",
      }}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Column 1 – Brand intro */}
        <div className="flex flex-col gap-3 mt-5">
          <h2 className="text-base font-bold uppercase tracking-wide text-white font-heading">
            CAS <br /> (Cash Accounting)
          </h2>
          <p className="text-sm font-bold uppercase tracking-wide leading-relaxed text-white font-body">
            Its a powerful, modern platform for managing financial and HR
            operations.
          </p>
        </div>

        {/* Column 2 – Logo / Resources */}
        <div className="flex flex-col items-center gap-4">
          {/* Logo placeholder – swap src to assets/logo.png */}
          <div className="text-xs font-bold uppercase tracking-widest text-black border border-black px-4 py-1">
            Logo Section
          </div>

          {/* Resources label */}
          <span className="text-xs font-bold uppercase tracking-widest text-black border-2 border-black px-6 py-2 bg-white">
            Resources
          </span>

          {/* Resource buttons */}
          <div className="flex gap-3">
            <a
              href="#demo"
              className="px-5 py-2 bg-black text-white text-xs font-bold uppercase tracking-widest border-2 border-black hover:bg-white hover:text-black transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-black"
            >
              Live Demo
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 bg-white text-black text-xs font-bold uppercase tracking-widest border-2 border-black hover:bg-black hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-black"
            >
              GitHub
            </a>
          </div>

          {/* Copyright */}
          <p className="text-xs font-bold uppercase tracking-widest text-white mt-2">
            © 2026 CAS Project
          </p>
        </div>

        {/* Column 3 – Quick Links */}
        <div className="flex flex-col items-start md:items-end gap-3  mr-5">
          <h2 className="text-base font-bold uppercase tracking-wide text-white mb-1 mr-5">
            Quick Links
          </h2>
          {["Home", "Features", "About Us"].map((label) => (
            <a
              key={label}
              href={`#${label.toLowerCase().replace(" ", "-")}`}
              className="w-40 text-center px-4 py-2 bg-white text-black text-xs font-bold uppercase tracking-widest border-2 border-black hover:bg-black hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-black"
            >
              {label}
            </a>
          ))}
        </div>

      </div>
    </footer>
    </>
  );
};

export default Footer;