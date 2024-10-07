import { Skeleton } from "@nextui-org/skeleton";

const SkeletonPost = () => {
  return (
    <div>
      <div className="w-full p-6 space-y-4 mt-8 ">
        {/* Profile Picture and Header Info Skeleton */}
        <div className="flex items-center space-x-3">
          {/* Profile Picture */}
          <Skeleton className="rounded-full">
            <div className="h-10 w-10 rounded-full bg-default-300" />
          </Skeleton>
          {/* Username and Post Info */}
          <div className="flex flex-col space-y-2 w-full">
            <Skeleton className="w-1/3 rounded-lg">
              <div className="h-4 w-full bg-default-300" />
            </Skeleton>
            <Skeleton className="w-1/5 rounded-lg">
              <div className="h-3 w-full bg-default-200" />
            </Skeleton>
          </div>
        </div>

        {/* Post Content Skeleton */}
        <div className="space-y-3">
          {/* Post Text Lines */}
          <Skeleton className="w-full rounded-lg">
            <div className="h-4 w-full bg-default-300" />
          </Skeleton>
          <Skeleton className="w-4/5 rounded-lg">
            <div className="h-4 w-full bg-default-300" />
          </Skeleton>

          {/* Post Image */}
          <Skeleton className="rounded-lg">
            <div className="h-40 w-full bg-default-300 rounded-lg" />
          </Skeleton>
        </div>

        {/* Reaction Buttons Skeleton */}
        <div className="flex justify-around pt-4">
          <Skeleton className="rounded-lg w-20">
            <div className="h-8 w-full bg-default-300" />
          </Skeleton>
          <Skeleton className="rounded-lg w-20">
            <div className="h-8 w-full bg-default-300" />
          </Skeleton>
          <Skeleton className="rounded-lg w-20">
            <div className="h-8 w-full bg-default-300" />
          </Skeleton>
        </div>
      </div>
      <div className="w-full p-6 space-y-4 mt-8 ">
        {/* Profile Picture and Header Info Skeleton */}
        <div className="flex items-center space-x-3">
          {/* Profile Picture */}
          <Skeleton className="rounded-full">
            <div className="h-10 w-10 rounded-full bg-default-300" />
          </Skeleton>
          {/* Username and Post Info */}
          <div className="flex flex-col space-y-2 w-full">
            <Skeleton className="w-1/3 rounded-lg">
              <div className="h-4 w-full bg-default-300" />
            </Skeleton>
            <Skeleton className="w-1/5 rounded-lg">
              <div className="h-3 w-full bg-default-200" />
            </Skeleton>
          </div>
        </div>

        {/* Post Content Skeleton */}
        <div className="space-y-3">
          {/* Post Text Lines */}
          <Skeleton className="w-full rounded-lg">
            <div className="h-4 w-full bg-default-300" />
          </Skeleton>
          <Skeleton className="w-4/5 rounded-lg">
            <div className="h-4 w-full bg-default-300" />
          </Skeleton>

          {/* Post Image */}
          <Skeleton className="rounded-lg">
            <div className="h-40 w-full bg-default-300 rounded-lg" />
          </Skeleton>
        </div>

        {/* Reaction Buttons Skeleton */}
        <div className="flex justify-around pt-4">
          <Skeleton className="rounded-lg w-20">
            <div className="h-8 w-full bg-default-300" />
          </Skeleton>
          <Skeleton className="rounded-lg w-20">
            <div className="h-8 w-full bg-default-300" />
          </Skeleton>
          <Skeleton className="rounded-lg w-20">
            <div className="h-8 w-full bg-default-300" />
          </Skeleton>
        </div>
      </div>
      <div className="w-full p-6 space-y-4 mt-8 ">
        {/* Profile Picture and Header Info Skeleton */}
        <div className="flex items-center space-x-3">
          {/* Profile Picture */}
          <Skeleton className="rounded-full">
            <div className="h-10 w-10 rounded-full bg-default-300" />
          </Skeleton>
          {/* Username and Post Info */}
          <div className="flex flex-col space-y-2 w-full">
            <Skeleton className="w-1/3 rounded-lg">
              <div className="h-4 w-full bg-default-300" />
            </Skeleton>
            <Skeleton className="w-1/5 rounded-lg">
              <div className="h-3 w-full bg-default-200" />
            </Skeleton>
          </div>
        </div>

        {/* Post Content Skeleton */}
        <div className="space-y-3">
          {/* Post Text Lines */}
          <Skeleton className="w-full rounded-lg">
            <div className="h-4 w-full bg-default-300" />
          </Skeleton>
          <Skeleton className="w-4/5 rounded-lg">
            <div className="h-4 w-full bg-default-300" />
          </Skeleton>

          {/* Post Image */}
          <Skeleton className="rounded-lg">
            <div className="h-40 w-full bg-default-300 rounded-lg" />
          </Skeleton>
        </div>

        {/* Reaction Buttons Skeleton */}
        <div className="flex justify-around pt-4">
          <Skeleton className="rounded-lg w-20">
            <div className="h-8 w-full bg-default-300" />
          </Skeleton>
          <Skeleton className="rounded-lg w-20">
            <div className="h-8 w-full bg-default-300" />
          </Skeleton>
          <Skeleton className="rounded-lg w-20">
            <div className="h-8 w-full bg-default-300" />
          </Skeleton>
        </div>
      </div>
    </div>
  );
};

export default SkeletonPost;
