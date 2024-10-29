import Image from "next/image";
import React from "react";
import DiagonalHeader from "./DiagonalHeader";
import { website } from "@/lib/types";

type RightPartProps = {
  data: website | null;
};

const RightPart = ({ data }: RightPartProps) => {
  console.log(data);
  if (!data) {
    return null;
  }
  return (
    <div className="space-y-6">
      {/* Logos Section */}
      <div className="flex items-center justify-between gap-6">
        <div className="relative h-16 w-52 overflow-hidden">
          <Image
            src={data.rightLogoValue}
            alt="Right logo"
            fill
            sizes="(max-width: 768px) 64px, 96px"
            priority
            className="me-auto !w-fit object-contain"
          />
        </div>
        <div className="relative h-16 w-52 overflow-hidden">
          <Image
            src={data.leftLogoValue}
            alt="Left logo"
            fill
            sizes="(max-width: 768px) 64px, 96px"
            priority
            className="ms-auto !w-fit object-contain"
          />
        </div>
      </div>

      {/* Video/Image Section */}
      <div className="relative w-full overflow-hidden rounded-xl bg-gray-100 shadow-lg">
        {data.videoValue ? (
          <div className="relative aspect-video w-full">
            <div
              className="h-full w-full"
              dangerouslySetInnerHTML={{ __html: data.videoValue }}
            />
          </div>
        ) : (
          <div className="relative aspect-video w-full">
            <Image
              src={data.imageValue[0]}
              alt="Content image"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
              className="object-cover"
            />
          </div>
        )}
      </div>

      {/* Title Section */}
      {data.titleValue && (
        <DiagonalHeader
          bgColor="bg-[#342D23]"
          title="المجموع أعلى مزايدة + قيمة السعي + الضريبة"
        />
      )}
    </div>
  );
};

export default RightPart;
