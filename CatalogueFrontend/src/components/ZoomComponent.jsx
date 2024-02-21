import React from "react";
import ImageZoom from "react-image-zooom";

function ZoomComponent({ src, className, alt }) {
  console.log(src);
  return <ImageZoom className={className} src={src} alt={alt} />;
}

export default ZoomComponent;
