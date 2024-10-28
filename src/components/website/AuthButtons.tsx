"use client";
import React, { useEffect, useState } from "react";

import { LogIn, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const AuthButtons = () => {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const storedIsAdmin = localStorage.getItem("isAdmin");
    if (storedIsAdmin === "1") {
      setIsAdmin(true);
    }
  }, []);

  const handleLogout = () => {
    // Remove isAdmin from local storage and update state
    localStorage.removeItem("isAdmin");
    setIsAdmin(false);
    router.push("/");
    window.location.reload();
  };
  return (
    <>
      {isAdmin ? (
        <Button
          variant="outline"
          size="sm"
          className="text flex items-center gap-2 bg-red-500 px-2 text-white transition-colors"
          onClick={handleLogout}
        >
          <LogOut size={16} />
          تسجيل الخروج
        </Button>
      ) : (
        <Button
          onClick={() => router.push("/auth/signin")}
          variant="outline"
          size="sm"
          className="flex items-center gap-2 transition-colors"
        >
          <LogIn size={16} />
          تسجيل الدخول
        </Button>
      )}
    </>
  );
};

export default AuthButtons;
