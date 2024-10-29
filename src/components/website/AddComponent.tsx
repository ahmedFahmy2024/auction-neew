"use client";
import { useAuth } from "@/context/AuthContext";
import { Plus } from "lucide-react";
import Link from "next/link";

const AddComponent = () => {
  const { isAdmin } = useAuth();

  if (!isAdmin) return null;

  return (
    <Link
      locale="ar"
      href="/dashboard/auctions/new"
      className="flex cursor-pointer items-center justify-center rounded-xl bg-[#d9d9d9] p-[20px]"
    >
      <Plus size={40} />
    </Link>
  );
};

export default AddComponent;
