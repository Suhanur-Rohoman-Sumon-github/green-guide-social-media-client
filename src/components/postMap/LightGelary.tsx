import LightGallery from "lightgallery/react";

// import styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

// import plugins if you need
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import Link from "next/link";
import Image from "next/image";
interface IPros {
  images: string[] | undefined;
}

const LightGelary = ({ images }: IPros) => {
  return (
    <div className="">
      <LightGallery
        elementClassNames={`grid gap-3 place-item-center grid-cols-2 ${images?.length === 1 ? "grid-cols-1" : "grid-cols-2"}`}
        speed={500}
        plugins={[lgThumbnail, lgZoom]}
      >
        {images!.map((image) => (
          <Link
            className={`w-full ${image.length === 3 ? "col-span-2" : "col-span-1"}`}
            href={image}
          >
            <Image
              className="border h-[400px] w-full object-cover"
              src={image}
              alt="post image"
              height={300}
              width={300}
            />
          </Link>
        ))}
      </LightGallery>
    </div>
  );
};

export default LightGelary;
