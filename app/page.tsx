"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ReactMarkdown from "react-markdown";
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { ProtectedRoute } from "@/components/protected-route";
import { UserHistoryList } from "@/components/user-history-list";
import { getSummary } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Loader2, History, Youtube } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { SidebarProvider } from "@/components/ui/sidebar";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar";

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
      <SidebarProvider>
        <div className="flex h-screen w-screen">
          <Sidebar className="w-64 min-pt-14 flex-shrink-0 bg-gray-50 dark:bg-gray-800 border-r dark:border-gray-800">
            <SidebarHeader className="p-4 flex-row justify-start items-center flex border-b dark:border-gray-800 dark:bg-gray-800">
              <h2 className="text-xl font-bold text-teal-600 dark:text-red-400">
                History
              </h2>
              <History className="w-5 h-6" />
            </SidebarHeader>
            <SidebarContent>
              <UserHistoryList />
            </SidebarContent>
          </Sidebar>

          <div className="flex-1 flex w-full flex-col overflow-hidden bg-gradient-to-br from-teal-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
            <main className="flex-1 overflow-auto p-6 flex justify-center items-center w-full">
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl max-w-3xl w-full">
                <CardHeader>
                  <header className="flex w-full text-center items-center justify-center gap-10 p-4">
                    <SidebarTrigger className="lg:hidden">
                      <Button variant="outline" size="icon">
                        <History className="h-6 w-6" />
                      </Button>
                    </SidebarTrigger>
                    <h1 className="text-3xl font-bold text-teal-600 dark:text-red-400">
                      YouTLDR
                    </h1>
                  </header>
                  <CardDescription className="text-center text-gray-600 dark:text-gray-300">
                    Get quick summaries of YouTube videos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                      <div className="relative flex-grow">
                        <Input
                          placeholder="Paste the YouTube URL here"
                          className="pl-10 pr-4 py-2 w-full bg-white dark:bg-gray-700 border-2 border-teal-200 dark:border-red-800 focus:border-teal-400 dark:focus:border-red-600 rounded-lg transition-all duration-300 ease-in-out focus:ring-2 focus:ring-teal-300 dark:focus:ring-red-500"
                          value={url}
                          onChange={(e) => setUrl(e.target.value)}
                          disabled={loading}
                        />
                        <Youtube
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 transition-colors duration-300"
                          size={20}
                        />
                      </div>
                      <Button
                        onClick={handleSubmit}
                        className="bg-teal-600 hover:bg-teal-700 dark:bg-red-700 dark:hover:bg-red-800 text-white font-bold px-6 py-2 rounded-lg transition-all duration-300 ease-in-out hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing
                          </>
                        ) : (
                          "Summarize"
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
                      <div className="flex items-center justify-center p-8 animate-pulse">
                        <div className="space-y-4 text-center">
                          <Loader2 className="h-12 w-12 animate-spin mx-auto text-teal-600 dark:text-red-400" />
                          <p className="text-lg text-gray-600 dark:text-gray-300">
                            Analyzing video content...
                          </p>
                        </div>
                      </div>
                    )}

                    {summary && (
                      <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg border border-teal-200 dark:border-red-800 transition-all">
                        <h3 className="text-xl font-semibold mb-4 text-teal-600 dark:text-red-400">
                          Summary
                        </h3>
                        <div className="max-h-[450px] overflow-y-auto">
                          <ReactMarkdown
                            className="prose dark:prose-invert max-w-none"
                            components={{
                              h1: ({ node, ...props }) => (
                                <h1
                                  className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4"
                                  {...props}
                                />
                              ),
                              h2: ({ node, ...props }) => (
                                <h2
                                  className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3"
                                  {...props}
                                />
                              ),
                              p: ({ node, ...props }) => (
                                <p
                                  className="text-gray-600 dark:text-gray-300 mb-4"
                                  {...props}
                                />
                              ),
                              a: ({ node, ...props }) => (
                                <a
                                  className="text-teal-600 dark:text-red-400 hover:underline"
                                  {...props}
                                />
                              ),
                            }}
                          >
                            {summary}
                          </ReactMarkdown>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="text-center text-sm text-gray-500 dark:text-gray-400">
                  YouTLDR - Powered by AI to summarize YouTube videos
                </CardFooter>
              </Card>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
