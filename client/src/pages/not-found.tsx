import { Link } from "wouter";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg border border-gray-100 p-8 text-center">
        <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2 font-display">404 Not Found</h1>
        <p className="text-gray-500 mb-8">
          The requested page could not be found. It may have been moved or you may not have permission to view it.
        </p>

        <Link href="/" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-secondary hover:bg-secondary/90 transition-colors">
          Return to Home
        </Link>
      </div>
    </div>
  );
}
