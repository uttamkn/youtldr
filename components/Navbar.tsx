"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { nhost } from "@/lib/nhost";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon, VideoIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useAuthenticationStatus } from "@nhost/nextjs";

export function Navbar() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const { isAuthenticated } = useAuthenticationStatus();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    await nhost.auth.signOut();
    router.push("/auth");
  };

  if (!mounted) {
    return null;
  }

  return (
    <nav className="absolute w-screen top-0 z-50 flex items-center justify-between px-6 py-4 bg-transparent backdrop-blur-sm shadow-sm transition-colors duration-300">
      <div className="flex items-center space-x-4">
        <Link href="/" className="flex items-center space-x-2">
          <VideoIcon className="h-6 w-6 text-black dark:text-white" />
          <span className="text-xl font-bold text-teal-600 dark:text-purple-400">
            YouTLDR
          </span>
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="text-white hover:text-yellow-400 focus:ring-2 focus:ring-purple-300 rounded-full bg-gray-800 bg-opacity-50 hover:bg-opacity-70"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <SunIcon className="h-5 w-5" />
          ) : (
            <MoonIcon className="h-5 w-5" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
        {isAuthenticated ? (
          <Button
            variant="outline"
            className="bg-gray-800 bg-opacity-50 hover:bg-opacity-70 text-white  focus:ring-2 focus:ring-purple-300 rounded-full px-4 py-1"
            onClick={handleLogout}
            aria-label="Logout"
          >
            Logout
          </Button>
        ) : (
          <Button
            variant="outline"
            className="bg-gray-800 bg-opacity-50 hover:bg-opacity-70 text-white  focus:ring-2 focus:ring-purple-300 rounded-full px-4 py-1"
            aria-label="Login"
          >
            Login
          </Button>
        )}
      </div>
    </nav>
  );
}
