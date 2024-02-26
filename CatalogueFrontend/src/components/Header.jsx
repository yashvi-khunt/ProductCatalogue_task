import React from "react";

function Header() {
  return (
    <>
      <div className="h-52 flex">
        <div className="h-full w-full bg-gray-500 relative">
          <div className="h-full justify-center p-10 flex flex-col items-start">
            <div className="text-3xl font-normal tracking-wide uppercase text-gray-300">
              Product
            </div>
            <div className="text-5xl font-bold  tracking-wide uppercase text-gray-200">
              Catalogue
            </div>
          </div>
          <div
            className="hidden md:block h-full w-[104px] bg-gray-500 
            absolute left-full top-0 rounded-r-full"
          ></div>
        </div>
        <img
          src="https://img.freepik.com/free-photo/shirt-mockup-concept-with-plain-clothing_23-2149448749.jpg"
          className="hidden md:block h-full object-cover"
        />
      </div>

      {/* <ZoomComponent
        imgUrl={
          "https://img.freepik.com/free-photo/shirt-mockup-concept-with-plain-clothing_23-2149448749.jpg"
        }
        className={"h-full object-cover"}
      /> */}
    </>
  );
}

export default Header;
