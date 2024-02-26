import React from "react";

export default function Footer() {
  return (
    <div className="bg-gray-600 md:h-12  text-center flex justify-center items-center p-5">
      <div className="md:mx-auto flex flex-col items-center justify-center md:w-3/4  md:flex-row md:items-center gap-1">
        <p className="px-5 text-sm text-left text-white md:mb-0">
          © Copyright 2021 Tails. All Rights Reserved.
        </p>
        <div className="flex items-start justify-between px-2 space-x-6 md:items-center md:justify-center text-white">
          <label className="text-sm text-white transition ">Terms</label>
          <label className="text-sm text-white transition ">Privacy</label>
        </div>
      </div>
    </div>
  );
}
