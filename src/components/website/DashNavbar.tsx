import Image from "next/image";
import logo from "@/assets/logo-ar.svg";
import AuthButtons from "./AuthButtons";
import Link from "next/link";

const DashNavbar = () => {
  return (
    <nav className="flex h-16 items-center justify-between border-b bg-white px-4">
      <div className="container mx-auto px-4 md:px-0">
        <div className="flex w-full items-center justify-between gap-4 py-4">
          <Link href="/">
            <Image
              src={logo}
              alt="logo"
              width={270}
              height={80}
              priority
              className="h-[80px] w-[270px] cursor-pointer object-contain"
            />
          </Link>
          <div className="flex items-center gap-4">
            <AuthButtons />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashNavbar;
