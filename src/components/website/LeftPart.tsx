import { price, website } from "@/lib/types";
import DiagonalHeader from "./DiagonalHeader";

type LeftPartProps = {
  data: website | null;
  price: price;
};

const LeftPart = ({ data, price }: LeftPartProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <DiagonalHeader title={price?.paddleNumKey} bgColor="bg-[#087790]" />
      <DiagonalHeader title={price?.paddleNumValue} bgColor="bg-[#001647]" />
      <DiagonalHeader title={data?.titleKey} bgColor="bg-[#001647]" />
      <DiagonalHeader title={data?.titleValue} bgColor="bg-[#087790]" />
      <DiagonalHeader title={price?.openPriceKey} bgColor="bg-[#001647]" />
      <DiagonalHeader title={price?.openPriceValue} bgColor="bg-[#087790]" />
      <DiagonalHeader title={price?.increaseKey} bgColor="bg-[#001647]" />
      <DiagonalHeader title={price?.increaseValue} bgColor="bg-[#087790]" />
      <DiagonalHeader title={price?.seekingPercentKey} bgColor="bg-[#001647]" />
      <DiagonalHeader
        title={price?.seekingPercentValue}
        bgColor="bg-[#087790]"
      />
      <DiagonalHeader title={price?.taxKey} bgColor="bg-[#001647]" />
      <DiagonalHeader title={price?.taxValue} bgColor="bg-[#087790]" />

      <div className="col-span-2">
        <DiagonalHeader title={price?.totalVAlue} bgColor="bg-[#087790]" />
      </div>
    </div>
  );
};

export default LeftPart;
