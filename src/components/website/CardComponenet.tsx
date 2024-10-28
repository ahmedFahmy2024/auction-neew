import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { CalendarDays } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";

import ActionButton from "./ActionButton";
import CounterDown from "./CounterDown";

type AuctionData = {
  _id: string;
  titleKey: string;
  titleValue: string;
  rightLogoValue: string;
  leftLogoValue: string;
  imageValue: string[];
  videoKey: string;
  videoValue: string;
  dateStart: string;
  imageCover: string;
};

const CardComponenet = ({ item }: { item: AuctionData }) => {
  return (
    <div className="relative">
      <Link key={item._id} href={`/${item._id}`}>
        <Card className="cursor-pointer overflow-hidden rounded-xl">
          <div className="relative h-40 w-full overflow-hidden">
            <Image
              src={item.imageCover}
              alt="project"
              fill
              sizes="(max-width: 768px) 100vw,
        (max-width: 1200px) 50vw,
        33vw"
              priority
              className="object-cover"
            />
          </div>
          <CardHeader>
            <CardTitle className="text-lg">{item.titleValue}</CardTitle>

            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              <span className="text-[14px]">
                {format(new Date(item.dateStart), "MMMM do, yyyy")}
              </span>
            </div>

            <CounterDown targetDate={item.dateStart} />
          </CardHeader>
        </Card>
      </Link>
      <ActionButton item={item} />
    </div>
  );
};

export default CardComponenet;
