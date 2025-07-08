import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="flex item-center justify-between gap-4 px-4 lg:px-44 py-3">
      <img width={150} src={assets.logo} alt="" srcset="" />
      <p className="flex-1 border-1 border-gray-400 pl-5 pt-3 text-sm text-gray-500 max-sm:hidden">
        Copyright @bg-removal | All right reserved.
      </p>
      <div className="flex gap-1">
        <a
          href="https://www.linkedin.com/in/devamkumar758"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img width={40} src={assets.linkdin} alt="LinkedIn" />
        </a>

        <a
          href="https://x.com/DevamKumar25"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img width={40} src={assets.twitter1} alt="Twitter / X" />
        </a>

        <a
          href="https://github.com/DevamKumar25"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img width={40} src={assets.github} alt="GitHub" />
        </a>
      </div>
    </div>
  );
};

export default Footer;
