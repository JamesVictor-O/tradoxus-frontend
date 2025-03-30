import type { Metadata } from "next";
import {
  Wallet,
  LineChart,
  ShieldCheck,
  ChartNoAxesColumn,
  Zap,
  Layers,
  ChevronRight,
} from "lucide-react";
import { LearningPathCard } from "@/components/education/LearningPathCard";
import { FeaturedModuleCard } from "@/components/education/FeaturedModuleCard";
import { GetStartedAction } from "@/components/education/GetStartedAction";
export const metadata: Metadata = {
  title: "Education - Tradoxus",
  description: "Master trading with our structured educational modules and learning paths",
};

type Difficulty = "Beginner" | "Intermediate" | "Advanced";

const learningPaths = [
  {
    title: "Trading Fundamentals",
    description: "Learn the core concepts of trading, market analysis, and risk management",
    icon: ChartNoAxesColumn,
    difficulty: "Beginner" as Difficulty,
    modules: [
      { title: "Introduction to Financial Markets", completed: true },
      { title: "Technical Analysis Basics", completed: true },
      { title: "Risk Management Principles", completed: false },
      { title: "Trading Psychology", completed: false },
    ],
    progress: 2,
    totalModules: 4,
    isActive: true,
  },
  {
    title: "Crypto Trading Strategies",
    description: "Master specialized strategies for cryptocurrency markets",
    icon: Zap,
    difficulty: "Intermediate" as Difficulty,
    modules: [
      { title: "Crypto Market Dynamics", completed: false },
      { title: "On-Chain Analysis", completed: false },
      { title: "DeFi Trading Opportunities", completed: false },
      { title: "NFT Market Analysis", completed: false },
    ],
    progress: 0,
    totalModules: 4,
    isActive: false,
  },
  {
    title: "Web3 Development",
    description: "Build decentralized applications and smart contracts",
    icon: Layers,
    difficulty: "Advanced" as Difficulty,
    modules: [
      { title: "Blockchain Fundamentals", completed: false },
      { title: "Smart Contract Development", completed: false },
      { title: "DeFi Protocol Integration", completed: false },
      { title: "Web3 Security Best Practices", completed: false },
    ],
    progress: 0,
    totalModules: 4,
    isActive: false,
  },
];

const featuredModules = [
  {
    slug: "technical-analysis-fundamentals",
    title: "Technical Analysis Fundamentals",
    description: "Learn how to read charts, identify patterns, and make data-driven trading decisions.",
    icon: LineChart,
    difficulty: "Beginner" as Difficulty,
    duration: "2.5 hours",
    enrollmentCount: 2345,
    rating: 4.8,
    instructors: [
      { initials: "JD", color: "bg-blue-600" },
      { initials: "AK", color: "bg-purple-600" },
    ],
  },
  {
    slug: "defi-yield-strategies",
    title: "DeFi Yield Strategies",
    description: "Explore different yield farming strategies and learn how to maximize returns while managing risks.",
    icon: Wallet,
    difficulty: "Intermediate" as Difficulty,
    duration: "3 hours",
    enrollmentCount: 1872,
    rating: 4.7,
    instructors: [
      { initials: "AL", color: "bg-green-600" },
      { initials: "MR", color: "bg-red-600" },
    ],
  },
  {
    slug: "risk-management-for-traders",
    title: "Risk Management for Traders",
    description: "Master essential risk management techniques to protect your capital and improve trading outcomes.",
    icon: ShieldCheck,
    difficulty: "Beginner" as Difficulty,
    duration: "2 hours",
    enrollmentCount: 3120,
    rating: 4.9,
    instructors: [
      { initials: "KL", color: "bg-amber-600" },
      { initials: "BN", color: "bg-blue-600" },
    ],
  },
];

export default function EducationPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <div className="container max-w-7xl mx-auto px-4 py-12">
        <div className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white">Learning Paths</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {learningPaths.map((path, index) => (
              <LearningPathCard key={index} {...path} />
            ))}
          </div>

          <div className="pt-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Featured Modules</h2>
              <a
                href="/education/modules"
                className="flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-medium"
              >
                View all modules
                <ChevronRight className="h-4 w-4" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredModules.map((module, index) => (
                <FeaturedModuleCard key={index} {...module} />
              ))}
            </div>

            <GetStartedAction />
          </div>
        </div>
      </div>
    </div>
  );
} 