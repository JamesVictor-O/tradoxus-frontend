// components/section-card.tsx
import { type LucideIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface SectionCardProps {
  title: string;
  items: string[];
  icon: LucideIcon;
}

export function SectionCard({ title, items, icon: Icon }: SectionCardProps) {
  return (
    <Card className="border bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 rounded-lg p-4 sm:p-5 md:p-6 hover:shadow-md sm:hover:shadow-lg transition-all duration-200 h-full">
      <div className="flex items-start mb-3 sm:mb-4 gap-2 sm:gap-3">
        <div className="p-1.5 sm:p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
          <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 dark:text-green-400" />
        </div>
        <CardTitle className="text-lg sm:text-xl font-medium text-gray-900 dark:text-white leading-snug">
          {title}
        </CardTitle>
      </div>
      <ul className="space-y-2 sm:space-y-3">
        {items.map((item, index) => (
          <li 
            key={`${title}-${item.slice(0, 20)}-${index}`} 
            className="flex items-start text-gray-600 dark:text-gray-400"
          >
            <span className="relative flex-shrink-0 h-3 w-3 sm:h-4 sm:w-4 mr-2 mt-1 sm:mt-1.5">
              <svg viewBox="0 0 16 16" className="absolute h-full w-full" aria-hidden="true">
                <circle cx="8" cy="8" r="6" fill="#14532d4d" className="dark:fill-green-900/50" />
                <circle cx="8" cy="8" r="2" fill="#39FF14" className="dark:fill-green-400" />
              </svg>
            </span>
            <span className="text-xs sm:text-sm text-gray-800 dark:text-gray-300 leading-relaxed">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
