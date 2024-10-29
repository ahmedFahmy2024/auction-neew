import { price, website } from "@/lib/types";
import DiagonalHeader from "./DiagonalHeader";

type LeftPartProps = {
  data: website | null;
  price: price;
};

const LeftPart = ({ data, price }: LeftPartProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <DiagonalHeader title={price?.paddleNumKey} bgColor="bg-[#d8ba8e]" />
      <DiagonalHeader title={price?.paddleNumValue} bgColor="bg-[#342d23]" />
      <DiagonalHeader title={data?.titleKey} bgColor="bg-[#342d23]" />
      <DiagonalHeader title={data?.titleValue} bgColor="bg-[#d8ba8e]" />
      <DiagonalHeader title={price?.openPriceKey} bgColor="bg-[#342d23]" />
      <DiagonalHeader title={price?.openPriceValue} bgColor="bg-[#d8ba8e]" />
      <DiagonalHeader title={price?.increaseKey} bgColor="bg-[#342d23]" />
      <DiagonalHeader title={price?.increaseValue} bgColor="bg-[#d8ba8e]" />
      <DiagonalHeader title={price?.seekingPercentKey} bgColor="bg-[#342d23]" />
      <DiagonalHeader
        title={price?.seekingPercentValue}
        bgColor="bg-[#d8ba8e]"
      />
      <DiagonalHeader title={price?.taxKey} bgColor="bg-[#342d23]" />
      <DiagonalHeader title={price?.taxValue} bgColor="bg-[#d8ba8e]" />

      <div className="col-span-2">
        <DiagonalHeader title={price?.totalVAlue} bgColor="bg-[#d8ba8e]" />
      </div>
    </div>
  );
};

export default LeftPart;
