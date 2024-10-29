import React from "react";

const DiagonalHeader = ({
  title,
  bgColor,
}: {
  title: string | undefined;
  bgColor: string;
}) => {
  return (
    <div className="relative">
      <div className={`${bgColor} p-4 text-lg font-bold text-white rounded-md`}>
        <div className="flex items-center justify-center ">
          {/* Title text */}
          <span className="ml-6">{title}</span>
        </div>
      </div>
    </div>
  );
};

export default DiagonalHeader;
