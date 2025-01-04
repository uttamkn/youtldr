"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GithubIcon } from 'lucide-react';
import { useSignInEmailPassword, useSignInGitHub } from '@nhost/nextjs';
import { useState } from 'react';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signInEmailPassword, isLoading, isSuccess, isError, error } = useSignInEmailPassword();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signInEmailPassword(email, password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950">
      <Card className="w-[350px] bg-gray-900 text-gray-100">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-purple-400">YouTLDR</CardTitle>
          <CardDescription className="text-center text-gray-400">Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="email" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-gray-800">
              <TabsTrigger value="email" className="text-gray-300">Email</TabsTrigger>
              <TabsTrigger value="github" className="text-gray-300">GitHub</TabsTrigger>
            </TabsList>
            <TabsContent value="email">
              <form onSubmit={handleSubmit}>
                <div className="grid gap-2">
                  <Input 
                    type="email" 
                    placeholder="Email" 
                    className="bg-gray-800 text-gray-100"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Input 
                    type="password" 
                    placeholder="Password" 
                    className="bg-gray-800 text-gray-100"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button 
                    type="submit" 
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing in...' : 'Sign In'}
                  </Button>
                  {isError && (
                    <p className="text-red-500 text-sm mt-2">{error?.message}</p>
                  )}
                </div>
              </form>
            </TabsContent>
            <TabsContent value="github">
              <Button className="w-full bg-gray-800 hover:bg-gray-700 text-white">
                <GithubIcon className="mr-2 h-4 w-4" />
                Sign In with GitHub
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-400">Don't have an account? <a href="#" className="text-purple-400 hover:underline">Sign up</a></p>
        </CardFooter>
      </Card>
    </div>
  );
}