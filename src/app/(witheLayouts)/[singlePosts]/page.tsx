"use client";
import React, { useEffect } from "react"; // Import useEffect
import Link from "next/link";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useSearchParams } from "next/navigation";

import { useGetSinglePostQuery } from "@/src/hook/post.hook";
import Loading from "@/src/components/ui/Loading";
import Reaction from "@/src/components/modules/home/Reaction";

import "./print.css";
import Image from "next/image";

type ParamsType = {
  [key: string]: string;
};

const PostLayout = ({ params }: { params: ParamsType }) => {
  const searchParams = useSearchParams();
  const { data: singlePosts, isLoading } = useGetSinglePostQuery(
    params?.singlePosts
  );
  const printContent = () => {
    window.print();
  };

  useEffect(() => {
    const isDownload = searchParams.get("isDownload");

    if (isDownload === "true" && !isLoading) {
      printContent();
    }
  }, [searchParams, isLoading]);

  return (
    <>
      {isLoading && <Loading />}
      <Link
        className="flex items-center gap-4 mt-24 non-print-content "
        href={"/"}
      >
        <FaLongArrowAltLeft />
        <p className="">Back to Home</p>
      </Link>
      <div className="flex flex-col md:flex-row items-start justify-center p-4 gap-14 md:mt-32">
        <div className="w-full md:w-1/2 bg-white shadow-lg rounded-lg overflow-hidden mb-4 md:mb-0">
          {/* Map over imageUrls array */}
          {singlePosts?.imageUrls?.length > 0 ? (
            singlePosts.imageUrls.map((url: string, index: number) => (
              <Image
                key={index}
                className="w-full h-full object-cover"
                src={url}
                alt={`Image for post ${params.singlePosts}`} // Add a meaningful alt text
                layout="responsive" // Optional: You can set layout to responsive
                width={500} // Specify a width for the image (required when using next/image)
                height={300} // Specify a height for the image (required when using next/image)
              />
            ))
          ) : (
            <p>No images available for this post.</p>
          )}
        </div>

        <div className="w-full md:w-1/2 shadow-lg rounded-lg p-6">
          <div className="flex items-center mb-4 non-print-content">
            <img
              alt="User Profile"
              className="w-12 h-12 rounded-full object-cover mr-4"
              src={singlePosts?.user?.profilePicture}
            />
            <div>
              <h2 className="text-lg font-semibold">
                {singlePosts?.user?.name}
              </h2>
              <p className="text-gray-500 text-sm">5 hours ago</p>
            </div>
          </div>

          <div className="text-gray-700 mb-4">
            <p>{singlePosts?.content}</p>
          </div>

          <div className="non-print-content">
            <Reaction postId={params?.singlePosts} />
          </div>
        </div>
      </div>
    </>
  );
};

export default PostLayout;
