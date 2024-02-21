import React from "react";

export default function Footer() {
  return (
    <div className="bg-gray-600 h-12 mb-2 text-center flex justify-center items-center">
      <div className="mx-auto flex flex-col items-center justify-center w-3/4 pt-2  md:flex-row md:items-center">
        <p className="px-5 text-sm text-left text-white md:mb-0">
          © Copyright 2021 Tails. All Rights Reserved.
        </p>
        <div className="flex items-start justify-between px-2 space-x-6 md:items-center md:justify-center text-white">
          <a
            href="#_"
            className="text-sm text-white-600 transition hover:text-primary"
          >
            Terms
          </a>
          <a
            href="#_"
            className="text-sm text-white-600 transition hover:text-primary"
          >
            Privacy
          </a>
        </div>
      </div>
    </div>
  );
}
