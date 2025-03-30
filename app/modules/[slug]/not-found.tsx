import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function ModuleNotFound() {
  return (
    <div className="container py-16 text-center">
      <h1 className="text-4xl font-bold text-white mb-4">Module Not Found</h1>
      <p className="text-gray-400 mb-8">
        The module you're looking for doesn't exist or has been removed.
      </p>
      <Link
        href="/modules"
        className="inline-flex items-center text-blue-400 hover:text-blue-300"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back to Education
      </Link>
    </div>
  );
} 