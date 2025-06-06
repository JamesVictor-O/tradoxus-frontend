import { DashboardMetrics, Trade } from "./types/journal";

export interface Course {
  id: string;
  title: string;
  description: string;
  level: "Basic" | "Medium" | "Advanced";
  author: string;
  status: "draft" | "published" | "archived" | "review";
  created: string;
  updated: string;
  duration: number; // in minutes
  topics: string[];
  enrollments: number;
  completionRate: number;
  thumbnail: string;
}

// User Data
export interface User {
  id: string;
  name: string;
  email: string;
  role: "student" | "instructor" | "admin";
  joined: string;
  lastActive: string;
  enrolledCourses: number;
  completedCourses: number;
  profileImage: string;
}

// Activity Data
export interface Activity {
  id: string;
  userId: string;
  userName: string;
  activityType: "enrolled" | "completed" | "created" | "comment" | "update";
  targetId: string;
  targetName: string;
  targetType: "course" | "module" | "lesson";
  timestamp: string;
}

// Dashboard Stats
export interface DashboardStats {
  totalCourses: number;
  newCourses: number;
  totalUsers: number;
  newUsers: number;
  totalEnrollments: number;
  completionRate: number;
  pendingApprovals: number;
}

// Mock Data Service
export const getMockDashboardStats = (): DashboardStats => {
  return {
    totalCourses: 120,
    newCourses: 8,
    totalUsers: 4500,
    newUsers: 145,
    totalEnrollments: 12500,
    completionRate: 68,
    pendingApprovals: 5,
  };
};

export const getMockRecentCourses = (): Course[] => {
  return [
    {
      id: "1",
      title: "Introduction to Trading",
      description: "Learn the fundamentals of trading in financial markets.",
      level: "Basic",
      author: "Admin",
      status: "published",
      created: "2024-10-20T10:00:00Z",
      updated: "2024-10-25T15:30:00Z",
      duration: 180,
      topics: ["Trading", "Finance", "Investment"],
      enrollments: 250,
      completionRate: 65,
      thumbnail: "/placeholder.jpg",
    },
    {
      id: "2",
      title: "Risk Management",
      description: "Advanced strategies for managing risk in trading.",
      level: "Medium",
      author: "Admin",
      status: "published",
      created: "2024-10-18T14:20:00Z",
      updated: "2024-10-24T11:45:00Z",
      duration: 240,
      topics: ["Risk", "Trading", "Strategy"],
      enrollments: 180,
      completionRate: 58,
      thumbnail: "/placeholder.jpg",
    },
    {
      id: "3",
      title: "how Management",
      description: "Advanced strategies for managing risk in trading.",
      level: "Medium",
      author: "Admin",
      status: "published",
      created: "2024-10-18T14:20:00Z",
      updated: "2024-10-24T11:45:00Z",
      duration: 240,
      topics: ["Risk", "Trading", "Strategy"],
      enrollments: 180,
      completionRate: 58,
      thumbnail: "/placeholder.jpg",
    },
  ];
};

export const getMockRecentActivities = (): Activity[] => {
  return [
    {
      id: "1",
      userId: "user1",
      userName: "Alex Johnson",
      activityType: "enrolled",
      targetId: "course1",
      targetName: "Introduction to Trading",
      targetType: "course",
      timestamp: "2024-10-26T11:30:00Z",
    },
    {
      id: "2",
      userId: "user2",
      userName: "Samantha Brown",
      activityType: "completed",
      targetId: "course3",
      targetName: "Cybersecurity Essentials",
      targetType: "course",
      timestamp: "2024-10-26T10:15:00Z",
    },
    {
      id: "3",
      userId: "user3",
      userName: "John Doe",
      activityType: "created",
      targetId: "course4",
      targetName: "UX Design Fundamentals",
      targetType: "course",
      timestamp: "2024-10-25T13:45:00Z",
    },
    {
      id: "4",
      userId: "user1",
      userName: "Alex Johnson",
      activityType: "comment",
      targetId: "module3",
      targetName: "Module 3 Advanced JavaScript Concepts",
      targetType: "module",
      timestamp: "2024-10-25T12:20:00Z",
    },
  ];
};



// Mock data
export const mockTrades: Trade[] = [
  {
    id: '1',
    symbol: 'AAPL',
    side: 'Long',
    entryPrice: 150.00,
    exitPrice: 155.50,
    quantity: 100,
    entryDate: '2024-01-15T09:30:00',
    exitDate: '2024-01-15T15:30:00',
    commission: 2.50,
    strategy: ['Breakout', 'Momentum'],
    preTradeNotes: 'Strong support level, expecting breakout',
    postTradeNotes: 'Trade executed well, took profit at resistance',
    mistakes: [],
    screenshots: ['chart1.png'],
    pnl: 547.50,
    duration: 6,
    isHidden: false
  },
  {
    id: '2',
    symbol: 'TSLA',
    side: 'Short',
    entryPrice: 245.00,
    exitPrice: 250.00,
    quantity: 50,
    entryDate: '2024-01-16T10:00:00',
    exitDate: '2024-01-16T14:00:00',
    commission: 2.00,
    strategy: ['Reversal', 'Overextended'],
    preTradeNotes: 'Stock looks overextended, RSI overbought',
    postTradeNotes: 'Should have waited for better entry',
    mistakes: ['Early Entry', 'FOMO'],
    screenshots: ['chart2.png'],
    pnl: -252.00,
    duration: 4,
    isHidden: false
  },
  {
    id: '3',
    symbol: 'MSFT',
    side: 'Long',
    entryPrice: 380.00,
    exitPrice: 385.25,
    quantity: 75,
    entryDate: '2024-01-17T11:15:00',
    exitDate: '2024-01-17T16:00:00',
    commission: 1.75,
    strategy: ['Support Bounce', 'Tech Strength'],
    preTradeNotes: 'Bouncing off key support, tech sector looking strong',
    postTradeNotes: 'Perfect execution, hit target exactly',
    mistakes: [],
    screenshots: ['chart3.png'],
    pnl: 392.00,
    duration: 5,
    isHidden: false
  }
];

export const mockDashboardMetrics: DashboardMetrics = {
  totalPnL: 687.50,
  winRate: 66.67,
  avgWinningTrade: 469.75,
  avgLosingTrade: -252.00,
  profitFactor: 1.86,
  totalTrades: 3,
  equityCurve: [
    { date: '2024-01-15', value: 10000 },
    { date: '2024-01-16', value: 10547.50 },
    { date: '2024-01-17', value: 10295.50 },
    { date: '2024-01-18', value: 10687.50 }
  ]
};

export const strategies = ['Breakout', 'Reversal', 'Momentum', 'Support Bounce', 'Resistance Rejection', 'Gap Fill', 'Earnings Play', 'Technical Pattern'];
export const mistakes = ['Early Entry', 'Late Exit', 'FOMO', 'Revenge Trading', 'Position Size Too Large', 'Ignored Stop Loss', 'Overconfidence'];
