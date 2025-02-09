import { Youtube, Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center space-y-4 p-8 bg-white rounded-lg shadow-md">
        <div className="flex items-center space-x-2">
          <Youtube className="w-12 h-12 text-red-500" />
          <Loader2 className="w-8 h-8 animate-spin text-gray-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800">Loading...</h1>
        <p className="text-center text-gray-500">
          Please wait while we set everything up.
        </p>
      </div>
    </div>
  );
}
