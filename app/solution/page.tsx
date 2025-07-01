import type { Metadata } from "next";
import { SectionCard } from "@/components/solution/solution-card";
import {
  Shield,
  Gamepad2,
  Wallet,
  ChartColumn,
  Users,
  Zap,
  Volleyball,
  BookOpen,
  Award,
  type LucideIcon,
} from "lucide-react";

export const metadata: Metadata = {
  title: "The Tradoxus Solution - Crypto Trading Education Platform",
  description:
    "Discover how Tradoxus revolutionizes crypto trading education through safe simulations, gamification, and Web3 integration.",
};

const solutionSections: {
  title: string;
  items: string[];
  icon: LucideIcon;
}[] = [
  {
    icon: Shield,
    title: "Safe and Practical Learning",
    items: [
      "Realistic crypto market simulation with real-time data",
      "Virtual training without risk of real losses",
      "Immediate feedback on trading decisions",
    ],
  },
  {
    icon: Gamepad2,
    title: "Effective Gamification",
    items: [
      "Level and mission system for guided learning",
      "Competition and rankings to maintain motivation",
      "Token rewards for completing educational objectives",
      "Active collaborative learning community",
    ],
  },
  {
    icon: Wallet,
    title: "Web3 Approach Advantages",
    items: [
      "Transparent progress tracking through blockchain",
      "Token incentives and educational NFTs",
      "Access to on-chain data for advanced analysis",
      "Integration with DeFi protocols for realistic practice",
    ],
  },

  {
    icon: ChartColumn,
    title: "Advanced Analytics Section",
    items: [
      "Real-time market data analysis",
      "Performance tracking metrics",
      "Custom indicator development",
      "Portfolio analytics dashboard",
    ],
  },
  {
    icon: Users,
    title: "Community Features Section",
    items: [
      "Peer-to-peer learning networks",
      "Expert membership programs",
      "Discussion forums and chat",
      "Community trading challenges",
    ],
  },
  {
    icon: Zap,
    title: "Quick Start Tools Section",
    items: [
      "Golden tutorial system",
      "Practice trading scenarios",
      "Basic to advanced strategies",
      "Interactive learning paths",
    ],
  },
  {
    icon: Volleyball,
    title: "Trading Strategies Section",
    items: [
      "Technical analysis frameworks",
      "Risk management techniques",
      "Market psychology training",
      "Positive dialog methods",
    ],
  },
  {
    icon: Award,
    title: "Achievement System Section",
    items: [
      "Skills-based certifications",
      "Trading milestone rewards",
      "Performance badges",
      "Learning achievement tracking",
    ],
  },
  {
    icon: BookOpen,
    title: "Educational Resources Section",
    items: [
      "Comprehensive course library",
      "Video tutorials and guides",
      "Market analysis reports",
      "Trading terminology glossary",
    ],
  },
];

export default function SolutionPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-12 lg:py-16 xl:py-20">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20 xl:mb-24">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-3 sm:mb-4 md:mb-6 lg:mb-8 px-2 sm:px-0">
              The Tradoxus Solution
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-600 dark:text-gray-400 max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto leading-relaxed px-3 sm:px-4 md:px-0">
              Tradoxus solves the critical problems in crypto trading education
              through a gamified educational web-app that provides safe,
              practical learning experiences.
            </p>
          </div>

          {/* Features Grid - Responsive across all screen sizes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-10">
            {solutionSections.map((section, index) => (
             <SectionCard
               key={section.title}
               icon={section.icon}
               title={section.title}
               items={section.items}
             />
            ))}
          </div>

          {/* Bottom Spacing */}
          <div className="mt-8 sm:mt-12 md:mt-16 lg:mt-20 xl:mt-24" />
        </div>
      </div>
    </main>
  );
}
