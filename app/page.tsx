"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ReactMarkdown from "react-markdown";
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
import { useState } from "react";
import { getSummary } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function MainPage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!url) {
      toast({
        title: "Error",
        description: "Please enter a YouTube URL",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setError(null);
    setSummary("");

    try {
      const data = await getSummary(url);
      setSummary(data.summary as string);
      toast({
        title: "Success",
        description: "Summary generated successfully",
      });
    } catch (error: any) {
      const customErrorMsg = `Unable to generate summary. This could be because:
• The YouTube URL is invalid
• The video doesn't have captions/transcripts enabled
• The video is private or unavailable

Please check the URL and try again with a different video.`;
      const errorMessage = error.message || customErrorMsg;
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

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
                <div className="space-y-4">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Paste the YouTube URL here"
                      className="flex-grow dark:bg-[#1f1f1f] border-2"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      disabled={loading}
                    />
                    <Button
                      onClick={handleSubmit}
                      className="bg-teal-600 dark:bg-red-800 dark:text-white font-bold"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing
                        </>
                      ) : (
                        "Get"
                      )}
                    </Button>
                  </div>

                  {error && (
                    <Alert variant="destructive">
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription className="whitespace-pre-wrap">
                        {error}
                      </AlertDescription>
                    </Alert>
                  )}

                  {loading && (
                    <div className="flex items-center justify-center p-8">
                      <div className="space-y-4 text-center">
                        <Loader2 className="h-8 w-8 animate-spin mx-auto text-teal-600 dark:text-red-400" />
                        <p className="text-sm text-muted-foreground">
                          Analyzing video content...
                        </p>
                      </div>
                    </div>
                  )}

                  {summary && (
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 animate-fade-in">
                      <h3 className="text-lg font-semibold mb-3 text-teal-600 dark:text-red-400">
                        Summary
                      </h3>
                      <ReactMarkdown
                        className="prose dark:prose-dark"
                        components={{
                          h1: ({ node, ...props }) => (
                            <h1 className="text-2xl font-bold" {...props} />
                          ),
                          h2: ({ node, ...props }) => (
                            <h2 className="text-xl font-bold" {...props} />
                          ),
                          a: ({ node, ...props }) => (
                            <a
                              className="text-teal-600 hover:underline"
                              {...props}
                            />
                          ),
                        }}
                      >
                        {summary}
                      </ReactMarkdown>
                    </div>
                  )}
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
