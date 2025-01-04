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
      <div className="bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-700 dark:from-gray-900 dark:via-gray-800 dark:to-black flex flex-col items-center justify-center min-h-[calc(100vh-64px)] p-4">
        <Card className="w-full max-w-2xl bg-card text-card-foreground">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">
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
              <Button>Summarize</Button>
            </div>
            <Card className="bg-muted p-4">
              <CardTitle className="text-xl mb-2">Summary</CardTitle>
              <p>
                Your video summary will appear here. The AI-generated summary
                will provide key points and main ideas from the YouTube video
                you&apos;ve submitted.
              </p>
            </Card>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
}
