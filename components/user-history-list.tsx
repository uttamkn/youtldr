import { useState, useEffect } from "react";
import { UserHistory } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import ReactMarkdown from "react-markdown";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { getUserHistory } from "@/lib/api";
import { Loader2 } from "lucide-react";

export function UserHistoryList() {
  const [userHistory, setUserHistory] = useState<UserHistory[]>([]);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getUserHistory();
        setUserHistory(data);
      } catch (error: any) {
        setError(
          error.message || "An error occurred while fetching user history."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const toggleExpand = (id: string) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="space-y-4 text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-teal-600 dark:text-red-400" />
          <p className="text-sm text-muted-foreground">Loading history...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (userHistory.length === 0) {
    return (
      <div className="p-4 text-center">
        <p className="text-sm text-muted-foreground">No history available.</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[calc(100vh-8rem)] p-3 bg-gray-50 dark:bg-gray-800">
      {userHistory.map((item) => (
        <Card key={item.id} className="mb-4">
          <CardHeader className="p-4">
            <CardTitle className="text-base font-semibold text-teal-600 dark:text-red-400">
              {item.title}
            </CardTitle>
            <CardDescription>
              <a
                href={item.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-xs text-blue-500 hover:underline"
              >
                View on YouTube <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="text-xs text-gray-600 dark:text-gray-300 mb-2 line-clamp-2">
              {item.description}
            </p>
            <div className="mt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => toggleExpand(item.id)}
                className="flex items-center text-xs py-1 h-7"
              >
                {expandedItems.has(item.id) ? (
                  <>
                    Hide Summary <ChevronUp className="ml-1 h-3 w-3" />
                  </>
                ) : (
                  <>
                    Show Summary <ChevronDown className="ml-1 h-3 w-3" />
                  </>
                )}
              </Button>
            </div>
            {expandedItems.has(item.id) && (
              <div className="mt-4 bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                <ReactMarkdown
                  className="prose dark:prose-dark max-w-none text-xs"
                  components={{
                    h1: ({ node, ...props }) => (
                      <h1 className="text-sm font-bold" {...props} />
                    ),
                    h2: ({ node, ...props }) => (
                      <h2 className="text-xs font-bold" {...props} />
                    ),
                    a: ({ node, ...props }) => (
                      <a className="text-teal-600 hover:underline" {...props} />
                    ),
                  }}
                >
                  {item.summary}
                </ReactMarkdown>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </ScrollArea>
  );
}
