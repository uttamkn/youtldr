"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { ProtectedRoute } from "@/components/protected-route";

export default function MainPage() {
  return (
    <ProtectedRoute>
      <div className="bg-gray-100 dark:bg-black flex flex-col items-center justify-center min-h-screen p-4">
        <Card className="border-none w-full max-w-2xl bg-card text-card-foreground">
          <CardHeader>
            <CardTitle className="text-teal-600 dark:text-purple-400 text-3xl font-bold text-center">
              YouTLDR
            </CardTitle>
            <CardDescription className="text-center">
              Get quick summaries of YouTube videos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2 mb-4">
              <Input
                placeholder="Paste YouTube URL here"
                className="flex-grow"
              />
              <Button className="bg-teal-600 dark:bg-purple-400">
                Summarize
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
}
