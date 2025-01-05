"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getUserApiKeys, deleteApiKey } from "@/lib/api";
import { ApiKey } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { Trash2Icon } from "lucide-react";

export function ApiKeysList() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadApiKeys();
  });

  const loadApiKeys = async () => {
    try {
      const data = await getUserApiKeys();
      setApiKeys(data);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load API keys",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteApiKey(id);
      setApiKeys(apiKeys.filter((key) => key.id !== id));
      toast({
        title: "Success",
        description: "API key deleted successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div>Loading API keys...</div>;
  }

  return (
    <div className="space-y-4">
      {apiKeys.map((key) => (
        <Card key={key.id} className="bg-white/10 backdrop-blur-sm">
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-lg capitalize">
                {key.provider}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Added on {new Date(key.created_at).toLocaleDateString()}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDelete(key.id)}
              className="text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/20"
            >
              <Trash2Icon className="h-5 w-5" />
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
