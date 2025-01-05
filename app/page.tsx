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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProtectedRoute } from "@/components/protected-route";
import { ApiKeyForm } from "@/components/api-key-form";
import { ApiKeysList } from "@/components/api-keys-list";

export default function MainPage() {
  return (
    <ProtectedRoute>
      <div className="bg-gray-100 dark:bg-[#1f1f1f] flex flex-col items-center justify-center min-h-screen p-4">
        <Card className="bg-transparent border-none w-full max-w-2xl shadow-none text-card-foreground">
          <CardHeader>
            <CardTitle className="text-teal-400 dark:text-red-400 text-3xl font-bold text-center">
              YouTLDR
            </CardTitle>
            <CardDescription className="text-center">
              Get quick summaries of YouTube videos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="summarize" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="summarize">Summarize</TabsTrigger>
                <TabsTrigger value="settings">API Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="summarize">
                <div className="flex space-x-2 mb-4">
                  <Input
                    placeholder="Paste the YouTube URL here"
                    className="flex-grow dark:bg-[#1f1f1f] border-2"
                  />
                  <Button className="bg-teal-600 dark:bg-red-800 dark:text-white font-bold">
                    Get
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="settings">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      Add New API Key
                    </h3>
                    <ApiKeyForm />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      Your API Keys
                    </h3>
                    <ApiKeysList />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
}
