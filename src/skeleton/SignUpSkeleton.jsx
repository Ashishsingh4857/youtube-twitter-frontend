import React from "react";
function SignUpSkeleton() {
  const loadingSkeletonStyle = "animate-pulse bg-gray-700 h-10 w-full rounded";

  return (
    <div className="w-full min-h-screen text-white p-3 flex justify-center items-center bg-gray-900 md:items-start md:p-6 lg:p-12">
      <div className="flex max-w-md flex-col space-y-5 justify-center items-center border border-slate-600 p-3 md:p-6 lg:p-8 mt-10 md:mt-20 rounded-lg shadow-lg bg-gray-800 w-full">
        <div className="flex items-center gap-2 mt-5">
          <div className={`${loadingSkeletonStyle} h-8 w-32`} />
        </div>
        <div className="space-y-5 p-2 w-full">
          <div className="w-full relative h-28 bg-gray-700 rounded-lg">
            <div className={`${loadingSkeletonStyle} h-28`} />
            <div className="absolute left-2 -bottom-10 rounded-full border-2 border-gray-800">
              <div
                className={`${loadingSkeletonStyle} h-20 w-20 rounded-full`}
              />
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <div className={`${loadingSkeletonStyle} h-4 w-32`} />
            <input
              className={`${loadingSkeletonStyle} h-10 outline-none`}
              readOnly
              placeholder=" "
            />
          </div>
          <div className="flex flex-col space-y-2">
            <div className={`${loadingSkeletonStyle} h-4 w-32`} />
            <input
              className={`${loadingSkeletonStyle} h-10 outline-none`}
              readOnly
              placeholder=" "
            />
          </div>
          <div className="flex flex-col space-y-2">
            <div className={`${loadingSkeletonStyle} h-4 w-32`} />
            <input
              className={`${loadingSkeletonStyle} h-10 outline-none`}
              readOnly
              placeholder=" "
            />
          </div>
          <div className="flex flex-col space-y-2">
            <div className={`${loadingSkeletonStyle} h-4 w-32`} />
            <input
              className={`${loadingSkeletonStyle} h-10 outline-none`}
              readOnly
              placeholder=" "
            />
          </div>
          <button
            className={`${loadingSkeletonStyle} outline-none w-full h-10`}
            readOnly
          />
          <div className="text-center text-sm">
            <div className={`${loadingSkeletonStyle} h-4 w-48 mx-auto`} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default SignUpSkeleton;
