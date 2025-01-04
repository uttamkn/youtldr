"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GithubIcon } from "lucide-react";
import { nhost } from "@/lib/nhost";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const isAuthenticated = await nhost.auth.isAuthenticatedAsync();
      if (isAuthenticated) {
        router.push("/");
      }
    };
    checkSession();
  }, [router]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { session, error } = await nhost.auth.signIn({
        email,
        password,
      });
      if (error) throw error;
      if (session) {
        router.push("/");
      }
    } catch (error: any) {
      setError(error.message);
    }

    setIsLoading(false);
  };

  const handleGitHubSignIn = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { session, error } = await nhost.auth.signIn({
        provider: "github",
      });
      if (error) throw error;
      if (session) {
        router.push("/");
      }
    } catch (error: any) {
      setError(error.message);
    }

    setIsLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const { session, error } = await nhost.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
      setSuccessMessage(
        "Successfully signed up! Please check your email to verify your account."
      );
    } catch (error: any) {
      setError(error.message);
    }

    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-700 dark:from-gray-900 dark:via-gray-800 dark:to-black">
      <h1 className="text-5xl font-extrabold text-white dark:text-gray-100 text-center mb-8 drop-shadow-lg">
        Welcome to <span className="text-purple-300">YouTLDR</span>
      </h1>
      <p className="text-lg text-gray-200 dark:text-gray-400 text-center mb-8">
        Simplify and summarize your content effortlessly
      </p>

      <Card className="w-[350px] text-gray-800 dark:bg-gray-900 dark:text-gray-100 shadow-xl rounded-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-purple-600 dark:text-purple-400">
            Get Started
          </CardTitle>
          <CardDescription className="text-center text-gray-500 dark:text-gray-400">
            Sign in or create an account to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-gray-300 dark:bg-gray-800 rounded-lg p-1">
              <TabsTrigger
                value="signin"
                className="focus:ring-2 focus:ring-purple-500"
              >
                Sign In
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className="text-gray-600 dark:text-gray-300 focus:ring-2 focus:ring-purple-500"
              >
                Sign Up
              </TabsTrigger>
            </TabsList>
            <TabsContent value="signin">
              <form onSubmit={handleSignIn}>
                <div className="grid gap-4 mt-4">
                  <Input
                    type="email"
                    placeholder="Email"
                    className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 rounded-lg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Input
                    type="password"
                    placeholder="Password"
                    className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 rounded-lg"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg shadow-md"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing In..." : "Sign In"}
                  </Button>
                </div>
              </form>
              {/* Separator with "or" */}
              <div className="flex items-center justify-center my-4">
                <span className="text-gray-500 dark:text-gray-400 mx-2">
                  or
                </span>
              </div>
              <div>
                <Button
                  onClick={handleGitHubSignIn}
                  className="w-full bg-gray-300 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 font-bold py-2 px-4 rounded-lg"
                  disabled={isLoading}
                >
                  <GithubIcon className="mr-2 h-4 w-4" />
                  Sign In with GitHub
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="signup">
              <form onSubmit={handleSignUp}>
                <div className="grid gap-4 mt-4">
                  <Input
                    type="email"
                    placeholder="Email"
                    className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 rounded-lg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Input
                    type="password"
                    placeholder="Password"
                    className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 rounded-lg"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Input
                    type="password"
                    placeholder="Confirm Password"
                    className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 rounded-lg"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="submit"
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-lg shadow-md"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing Up..." : "Sign Up"}
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="mt-4">
          {error && (
            <p className="text-red-500 text-sm text-center w-full">{error}</p>
          )}
          {successMessage && (
            <p className="text-green-500 text-sm text-center w-full">
              {successMessage}
            </p>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
