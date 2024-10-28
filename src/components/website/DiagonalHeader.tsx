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
      <div
        className={`${bgColor} p-4 text-lg font-bold text-white`}
        style={{
          clipPath:
            "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)",
        }}
      >
        <div className="flex items-center justify-center">
          {/* Create diagonal line effect */}
          <div
            className="absolute left-0 top-0 h-5 w-5 bg-white opacity-20"
            style={{
              clipPath: "polygon(0 0, 100% 0, 0 100%)",
            }}
          />

          {/* Title text */}
          <span className="ml-6">{title}</span>

          {/* Bottom right diagonal line effect */}
          <div
            className="absolute bottom-0 right-0 h-5 w-5 bg-white opacity-20"
            style={{
              clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DiagonalHeader;
