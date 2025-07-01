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
    <Card className="border bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 rounded-lg p-3 sm:p-4 md:p-5 lg:p-6 hover:shadow-md sm:hover:shadow-lg transition-all duration-200 h-full flex flex-col">
      <div className="flex items-start mb-2 sm:mb-3 md:mb-4 gap-2 sm:gap-3">
        <div className="p-1.5 sm:p-2 md:p-2.5 bg-green-100 dark:bg-green-900/30 rounded-lg flex-shrink-0">
          <Icon className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-green-600 dark:text-green-400" />
        </div>
        <CardTitle className="text-sm sm:text-base md:text-lg lg:text-xl font-medium text-gray-900 dark:text-white leading-tight sm:leading-snug">
          {title}
        </CardTitle>
      </div>
      <ul className="space-y-1.5 sm:space-y-2 md:space-y-3 flex-grow">
        {items.map((item, index) => (
          <li
            key={`${title}-${item.slice(0, 20)}-${index}`}
            className="flex items-start text-gray-600 dark:text-gray-400"
          >
            <span className="relative flex-shrink-0 h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4 mr-1.5 sm:mr-2 mt-0.5 sm:mt-1 md:mt-1.5">
              <svg
                viewBox="0 0 16 16"
                className="absolute h-full w-full"
                aria-hidden="true"
              >
                <circle
                  cx="8"
                  cy="8"
                  r="6"
                  fill="#14532d4d"
                  className="dark:fill-green-900/50"
                />
                <circle
                  cx="8"
                  cy="8"
                  r="2"
                  fill="#39FF14"
                  className="dark:fill-green-400"
                />
              </svg>
            </span>
            <span className="text-xs sm:text-sm md:text-sm lg:text-base text-gray-800 dark:text-gray-300 leading-relaxed">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
