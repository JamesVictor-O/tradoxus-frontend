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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-4 sm:mb-6 lg:mb-8">
              The Tradoxus Solution
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-2xl lg:max-w-4xl mx-auto leading-relaxed px-4 sm:px-0">
              Tradoxus solves the critical problems in crypto trading education
              through a gamified educational web-app that provides safe, practical
              learning experiences.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {solutionSections.map((section, index) => (
              <SectionCard
                key={index}
                icon={section.icon}
                title={section.title}
                items={section.items}
              />
            ))}
          </div>

          {/* Optional Bottom Spacing */}
          <div className="mt-12 sm:mt-16 lg:mt-20" />
        </div>
      </div>
    </main>
  );
}
