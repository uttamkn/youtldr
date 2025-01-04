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
  const { isAuthenticated } = useAuthenticationStatus();
  const router = useRouter();

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
    <nav className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-700 dark:from-gray-900 dark:via-gray-800 dark:to-black shadow-lg">
      <Link href="/" className="flex items-center space-x-3">
        <VideoIcon className="h-6 w-6 text-white" />
        <span className="text-2xl font-bold text-white tracking-wide">
          YouTLDR
        </span>
      </Link>

      <div className="flex items-center space-x-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="text-white hover:text-yellow-400 focus:ring-2 focus:ring-purple-300 rounded-full"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <SunIcon className="h-6 w-6" />
          ) : (
            <MoonIcon className="h-6 w-6" />
          )}
        </Button>

        {isAuthenticated ? (
          <Button
            variant="default"
            className="bg-white text-gray-900 hover:bg-gray-100 focus:ring-2 focus:ring-purple-300 rounded-full px-4 py-1"
            onClick={handleLogout}
            aria-label="Logout"
          >
            Logout
          </Button>
        ) : (
          <Link href="/auth">
            <Button
              variant="default"
              className="bg-white text-gray-900 hover:bg-gray-100 focus:ring-2 focus:ring-purple-300 rounded-full px-4 py-1"
              aria-label="Login"
            >
              Login
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
}
