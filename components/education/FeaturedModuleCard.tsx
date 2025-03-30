import { type LucideIcon, Clock, Users, Award } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Instructor {
  initials: string;
  color: string;
}

interface FeaturedModuleCardProps {
  slug: string;
  title: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  enrollmentCount: number;
  rating: number;
  instructors: Instructor[];
  icon: LucideIcon;
}

export function FeaturedModuleCard({
  slug,
  title,
  description,
  difficulty,
  duration,
  enrollmentCount,
  rating,
  instructors,
}: FeaturedModuleCardProps) {
  const difficultyColors = {
    Beginner: "bg-blue-500/10 text-blue-500",
    Intermediate: "bg-purple-500/10 text-purple-500",
    Advanced: "bg-green-500/10 text-green-500",
  };

  return (
    <Link href={`/modules/${slug}`} className="block">
      <Card className="bg-gray-900/50 border-gray-800/50 hover:border-gray-700/50 transition-colors h-full cursor-pointer">
        <CardHeader className="flex flex-col pb-3 gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span
                className={cn(
                  "px-2.5 py-1 text-xs font-medium rounded-full",
                  difficultyColors[difficulty]
                )}
              >
                {difficulty}
              </span>
              <div className="flex items-center gap-1.5 text-gray-400">
                <Clock className="h-4 w-4" />
                <span>{duration}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <h3 className="text-xl font-medium text-white w-3/4 h-10">{title}</h3>
            </div>
          </div>
          <p className="text-sm text-gray-400 line-clamp-2">{description}</p>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between text-sm border-t border-gray-800/50 pt-4">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {instructors.map((instructor, index) => (
                  <div
                    key={index}
                    className={cn(
                      "h-7 w-7 rounded-full flex items-center justify-center text-xs font-medium text-white ring-2 ring-gray-900/50",
                      instructor.color
                    )}
                  >
                    {instructor.initials}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-1.5 text-gray-400">
                <Users className="h-4 w-4" />
                <span>{enrollmentCount.toLocaleString()}</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-white">
              <Award className="h-4 w-4 text-amber-400" />
              <span>{rating.toFixed(1)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
} 