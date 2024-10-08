"use client";
import React from "react";
import LightGallery from "lightgallery/react";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-zoom.css";

// Plugins
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

const ImageGallery = () => {
  const images = [
    {
      src: "https://media.istockphoto.com/id/1134719594/photo/gardening-tools-and-flowers-on-soil.jpg?s=612x612&w=0&k=20&c=63VLWD2WXDI2-aGt3Txb6MR-B0q1twdo5LiAFRfovgQ=",
      thumb:
        "https://media.istockphoto.com/id/1134719594/photo/gardening-tools-and-flowers-on-soil.jpg?s=612x612&w=0&k=20&c=63VLWD2WXDI2-aGt3Txb6MR-B0q1twdo5LiAFRfovgQ=",
      alt: "Image 1",
    },
    {
      src: "https://img.freepik.com/free-photo/plants-pot-with-watering-can_23-2148905231.jpg",
      thumb:
        "https://img.freepik.com/free-photo/plants-pot-with-watering-can_23-2148905231.jpg",
      alt: "Image 2",
    },
    {
      src: "https://plus.unsplash.com/premium_photo-1680286739871-01142bc609df?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z2FyZGVuaW5nfGVufDB8fDB8fHww",
      thumb:
        "https://plus.unsplash.com/premium_photo-1680286739871-01142bc609df?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z2FyZGVuaW5nfGVufDB8fDB8fHww",
      alt: "Image 3",
    },
    {
      src: "https://blog-media.byjusfutureschool.com/bfs-blog/2022/12/14094805/Article-Image-Rendered-size-948x500-1.jpg",
      thumb:
        "https://blog-media.byjusfutureschool.com/bfs-blog/2022/12/14094805/Article-Image-Rendered-size-948x500-1.jpg",
      alt: "Image 4",
    },
  ];

  return (
    <div>
      <h2 className="text-center text-2xl font-bold mb-5">Gallery</h2>
      <LightGallery mode="lg-fade" plugins={[lgThumbnail, lgZoom]}>
        {images.map((image, index) => (
          <a
            key={index}
            className="gallery-item"
            data-lg-size="1406-1390"
            href={image.src}
          >
            <img
              alt={image.alt}
              className="w-full h-auto rounded-md my-5"
              src={image.thumb}
            />
          </a>
        ))}
      </LightGallery>
    </div>
  );
};

export default ImageGallery;
