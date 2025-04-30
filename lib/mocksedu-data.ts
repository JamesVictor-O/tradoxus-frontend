// src/lib/mock-data.ts
export type Course = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  author: string;
  duration: string;
  moduleCount: number;
  lessonCount: number;
  tags: string[];
  publishedAt: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
};

export type Module = {
  id: string;
  courseId: string;
  title: string;
  description: string;
  order: number;
  lessonCount: number;
};

// Define individual content block types
export type TextBlock = {
  type: 'text';
  content: string;
};

export type ImageBlock = {
  type: 'image';
  content: string; // URL to the image
};

export type VideoBlock = {
  type: 'video';
  content: string; // URL to the video
};

export type QuizBlock = {
  type: 'quiz';
  content: {
    question: string;
    options: string[];
    correctAnswer: number;
  };
};

export type SimulationBlock = {
  type: 'simulation';
  content: {
    simulationType: string;
    parameters: Record<string, unknown>;
  };
};

// Combined ContentBlock type with common fields
export type ContentBlock = (
  | TextBlock
  | ImageBlock
  | VideoBlock
  | QuizBlock
  | SimulationBlock
) & {
  id: string;
  order: number;
};

export type Lesson = {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  duration: string;
  order: number;
  contentBlocks: ContentBlock[];
};

export type Progress = {
  courseId: string;
  modulesCompleted: number;
  totalModules: number;
  lessonsCompleted: number;
  totalLessons: number;
  lastLessonId: string | null;
  completedLessons: string[];
  simulationScores?: {
    [simulationId: string]: number;
  };
  portfolioValue?: number;
  tradingPoints?: number;
};

const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Cryptocurrency Trading Fundamentals',
    description: 'Learn the basics of cryptocurrency markets, blockchain technology, and trading essentials.',
    thumbnail: '/api/placeholder/320/180',
    author: 'Alex Morgan',
    duration: '8 hours',
    moduleCount: 5,
    lessonCount: 20,
    tags: ['Crypto Basics', 'Blockchain', 'Market Analysis', 'Trading'],
    publishedAt: '2025-01-15',
    level: 'Beginner',
  },
  {
    id: '2',
    title: 'Advanced Technical Analysis for Crypto',
    description: 'Master chart patterns, indicators, and advanced technical analysis strategies for cryptocurrency trading.',
    thumbnail: '/api/placeholder/320/180',
    author: 'Sarah Wu',
    duration: '10 hours',
    moduleCount: 4,
    lessonCount: 16,
    tags: ['Technical Analysis', 'Chart Patterns', 'Indicators', 'Trading Strategy'],
    publishedAt: '2025-02-20',
    level: 'Advanced',
  },
  {
    id: '3',
    title: 'DeFi Trading Strategies',
    description: 'Explore decentralized finance protocols and learn specialized trading strategies for DeFi markets.',
    thumbnail: '/api/placeholder/320/180',
    author: 'Michael Chen',
    duration: '6 hours',
    moduleCount: 3,
    lessonCount: 12,
    tags: ['DeFi', 'Yield Farming', 'Liquidity Mining', 'DEX Trading'],
    publishedAt: '2025-03-10',
    level: 'Intermediate',
  },
  {
    id: '4',
    title: 'Risk Management in Crypto Trading',
    description: 'Learn essential risk management techniques to protect your capital in volatile cryptocurrency markets.',
    thumbnail: '/api/placeholder/320/180',
    author: 'Elena Rodriguez',
    duration: '5 hours',
    moduleCount: 3,
    lessonCount: 15,
    tags: ['Risk Management', 'Position Sizing', 'Stop Loss', 'Portfolio Management'],
    publishedAt: '2025-03-25',
    level: 'Intermediate',
  },
  {
    id: '5',
    title: 'Algorithmic Trading for Cryptocurrencies',
    description: 'Build and implement automated trading strategies for cryptocurrency markets using algorithmic approaches.',
    thumbnail: '/api/placeholder/320/180',
    author: 'David Park',
    duration: '12 hours',
    moduleCount: 4,
    lessonCount: 18,
    tags: ['Algo Trading', 'Trading Bots', 'Automation', 'Quantitative Analysis'],
    publishedAt: '2025-04-05',
    level: 'Advanced',
  },
];

const mockModules: { [courseId: string]: Module[] } = {
  '1': [
    {
      id: '1-1',
      courseId: '1',
      title: 'Blockchain Fundamentals',
      description: 'Understanding the technology behind cryptocurrencies.',
      order: 1,
      lessonCount: 4,
    },
    {
      id: '1-2',
      courseId: '1',
      title: 'Cryptocurrency Markets Overview',
      description: 'Learn about different exchanges, market structures, and trading pairs.',
      order: 2,
      lessonCount: 4,
    },
    {
      id: '1-3',
      courseId: '1',
      title: 'Basic Trading Concepts',
      description: 'Essential trading terminology, order types, and market mechanics.',
      order: 3,
      lessonCount: 4,
    },
    {
      id: '1-4',
      courseId: '1',
      title: 'Introduction to Market Analysis',
      description: 'Learn the basics of technical and fundamental analysis.',
      order: 4,
      lessonCount: 4,
    },
    {
      id: '1-5',
      courseId: '1',
      title: 'Your First Trading Strategy',
      description: 'Create and test a simple trading strategy for cryptocurrencies.',
      order: 5,
      lessonCount: 4,
    },
  ],
  '2': [
    {
      id: '2-1',
      courseId: '2',
      title: 'Advanced Chart Patterns',
      description: 'Identify and trade complex price patterns in cryptocurrency markets.',
      order: 1,
      lessonCount: 4,
    },
    {
      id: '2-2',
      courseId: '2',
      title: 'Technical Indicators Mastery',
      description: 'Use and combine advanced indicators to identify trading opportunities.',
      order: 2,
      lessonCount: 4,
    },
    {
      id: '2-3',
      courseId: '2',
      title: 'Market Structure Analysis',
      description: 'Learn to identify trends, ranges, and market structure shifts.',
      order: 3,
      lessonCount: 4,
    },
    {
      id: '2-4',
      courseId: '2',
      title: 'Multi-Timeframe Analysis',
      description: 'Analyze markets across different timeframes for better decision making.',
      order: 4,
      lessonCount: 4,
    },
  ],
  '3': [
    {
      id: '3-1',
      courseId: '3',
      title: 'Introduction to DeFi Protocols',
      description: 'Overview of major decentralized finance platforms and their mechanics.',
      order: 1,
      lessonCount: 4,
    },
    {
      id: '3-2',
      courseId: '3',
      title: 'Liquidity Provision Strategies',
      description: 'Learn to provide liquidity and manage impermanent loss.',
      order: 2,
      lessonCount: 4,
    },
    {
      id: '3-3',
      courseId: '3',
      title: 'Yield Optimization Techniques',
      description: 'Advanced strategies for maximizing yields in DeFi ecosystems.',
      order: 3,
      lessonCount: 4,
    },
  ],
};

const mockLessons: { [moduleId: string]: Lesson[] } = {
  '1-1': [
    {
      id: '1-1-1',
      moduleId: '1-1',
      title: 'What is Blockchain Technology',
      description: 'Understanding the distributed ledger technology behind cryptocurrencies.',
      duration: '15 minutes',
      order: 1,
      contentBlocks: [
        {
          id: '1-1-1-1',
          type: 'text',
          content: 'Blockchain is a distributed database or ledger shared among computer network nodes. It stores information electronically in digital format, maintaining a secure and decentralized record of transactions. This lesson will explore how blockchain works and why it matters for cryptocurrency trading.',
          order: 1,
        },
        {
          id: '1-1-1-2',
          type: 'image',
          content: '/api/placeholder/640/360',
          order: 2,
        },
        {
          id: '1-1-1-3',
          type: 'text',
          content: 'Blockchain\'s key innovation is its ability to guarantee the fidelity and security of data records without requiring a trusted third party. This is accomplished through consensus mechanisms like Proof of Work and Proof of Stake, which ensure all participants agree on the validity of transactions.',
          order: 3,
        },
        {
          id: '1-1-1-4',
          type: 'video',
          content: 'https://example.com/videos/blockchain-basics.mp4',
          order: 4,
        },
      ],
    },
    {
      id: '1-1-2',
      moduleId: '1-1',
      title: 'Bitcoin and the First Blockchain',
      description: 'The origin of blockchain through Bitcoin and its fundamental principles.',
      duration: '20 minutes',
      order: 2,
      contentBlocks: [
        {
          id: '1-1-2-1',
          type: 'text',
          content: 'Bitcoin, created by the pseudonymous Satoshi Nakamoto in 2009, was the first application of blockchain technology. It introduced a peer-to-peer electronic cash system that operates without a central authority. This lesson examines Bitcoin\'s blockchain, its mining process, and how it prevents double-spending.',
          order: 1,
        },
        {
          id: '1-1-2-2',
          type: 'image',
          content: '/api/placeholder/640/360',
          order: 2,
        },
        {
          id: '1-1-2-3',
          type: 'simulation',
          content: {
            simulationType: 'blockchain-visualization',
            parameters: {
              blockSize: 1,
              transactionCount: 10,
              difficulty: 'medium'
            }
          },
          order: 3,
        },
      ],
    },
    {
      id: '1-1-3',
      moduleId: '1-1',
      title: 'Smart Contracts and Ethereum',
      description: 'Learn about programmable blockchains and their applications.',
      duration: '15 minutes',
      order: 3,
      contentBlocks: [
        {
          id: '1-1-3-1',
          type: 'text',
          content: 'Ethereum expanded blockchain\'s capabilities by introducing smart contracts - self-executing contracts with the terms directly written into code. This innovation enables decentralized applications (dApps) and creates new possibilities for financial instruments that operate without intermediaries.',
          order: 1,
        },
        {
          id: '1-1-3-2',
          type: 'video',
          content: 'https://example.com/videos/ethereum-smart-contracts.mp4',
          order: 2,
        },
      ],
    },
    {
      id: '1-1-4',
      moduleId: '1-1',
      title: 'Consensus Mechanisms',
      description: 'Compare different blockchain validation methods and their implications for trading.',
      duration: '20 minutes',
      order: 4,
      contentBlocks: [
        {
          id: '1-1-4-1',
          type: 'text',
          content: 'Consensus mechanisms are protocols that ensure all nodes in a blockchain network agree on the validity of transactions. This lesson compares Proof of Work, Proof of Stake, Delegated Proof of Stake, and other mechanisms, examining their impact on transaction speed, energy consumption, and security.',
          order: 1,
        },
        {
          id: '1-1-4-2',
          type: 'quiz',
          content: {
            question: 'Which consensus mechanism does Bitcoin use?',
            options: [
              'Proof of Stake',
              'Delegated Proof of Stake',
              'Proof of Work',
              'Proof of Authority'
            ],
            correctAnswer: 2
          },
          order: 2,
        },
        {
          id: '1-1-4-3',
          type: 'simulation',
          content: {
            simulationType: 'consensus-comparison',
            parameters: {
              networkSize: 100,
              attackScenario: 'basic'
            }
          },
          order: 3,
        },
      ],
    },
  ],
  '1-3': [
    {
      id: '1-3-1',
      moduleId: '1-3',
      title: 'Understanding Market Orders',
      description: 'Learn how market orders work in cryptocurrency exchanges.',
      duration: '15 minutes',
      order: 1,
      contentBlocks: [
        {
          id: '1-3-1-1',
          type: 'text',
          content: 'Market orders are the most basic type of trade order, instructing the exchange to buy or sell immediately at the best available current price. This lesson explains how market orders are executed, their advantages in fast-moving markets, and potential drawbacks like slippage.',
          order: 1,
        },
        {
          id: '1-3-1-2',
          type: 'simulation',
          content: {
            simulationType: 'market-order-execution',
            parameters: {
              marketVolume: 'medium',
              orderSize: 'small'
            }
          },
          order: 2,
        },
      ],
    },
    {
      id: '1-3-2',
      moduleId: '1-3',
      title: 'Limit Orders and Order Books',
      description: 'Master limit orders and understand exchange order books.',
      duration: '20 minutes',
      order: 2,
      contentBlocks: [
        {
          id: '1-3-2-1',
          type: 'text',
          content: 'Limit orders allow traders to specify the exact price at which they want to buy or sell. This lesson explores how limit orders work, how they\'re displayed in order books, and strategies for placing effective limit orders in volatile cryptocurrency markets.',
          order: 1,
        },
        {
          id: '1-3-2-2',
          type: 'image',
          content: '/api/placeholder/640/360',
          order: 2,
        },
        {
          id: '1-3-2-3',
          type: 'simulation',
          content: {
            simulationType: 'order-book-visualization',
            parameters: {
              tradingPair: 'BTC/USDT',
              depth: 10
            }
          },
          order: 3,
        },
      ],
    },
  ],
};

const mockUserProgress: { [courseId: string]: Progress } = {
  '1': {
    courseId: '1',
    modulesCompleted: 1,
    totalModules: 5,
    lessonsCompleted: 3,
    totalLessons: 20,
    lastLessonId: '1-1-3',
    completedLessons: ['1-1-1', '1-1-2', '1-1-3'],
    simulationScores: {
      'blockchain-visualization': 85,
      'market-order-execution': 70
    },
    portfolioValue: 10450.25,
    tradingPoints: 750,
  },
  '2': {
    courseId: '2',
    modulesCompleted: 0,
    totalModules: 4,
    lessonsCompleted: 0,
    totalLessons: 16,
    lastLessonId: null,
    completedLessons: [],
    portfolioValue: 10000,
    tradingPoints: 500,
  },
};

// Mock API functions
export const mockApi = {
  getCourses: async (): Promise<Course[]> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockCourses;
  },

  getCourse: async (id: string): Promise<Course | null> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockCourses.find(course => course.id === id) || null;
  },

  getCourseModules: async (courseId: string): Promise<Module[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockModules[courseId] || [];
  },

  getLesson: async (lessonId: string): Promise<Lesson | null> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    for (const moduleId in mockLessons) {
      const lesson = mockLessons[moduleId].find(lesson => lesson.id === lessonId);
      if (lesson) return lesson;
    }
    return null;
  },

  getModuleLessons: async (moduleId: string): Promise<Lesson[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockLessons[moduleId] || [];
  },

  getUserProgress: async (courseId: string): Promise<Progress | null> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockUserProgress[courseId] || null;
  },

  updateUserProgress: async (courseId: string, lessonId: string): Promise<Progress> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Create progress object if it doesn't exist
    if (!mockUserProgress[courseId]) {
      const course = mockCourses.find(c => c.id === courseId);
      if (!course) throw new Error('Course not found');
      
      mockUserProgress[courseId] = {
        courseId,
        modulesCompleted: 0,
        totalModules: course.moduleCount,
        lessonsCompleted: 0,
        totalLessons: course.lessonCount,
        lastLessonId: null,
        completedLessons: [],
        simulationScores: {},
        portfolioValue: 10000,
        tradingPoints: 500,
      };
    }
    
    const progress = mockUserProgress[courseId];
    
    // Update last viewed lesson
    progress.lastLessonId = lessonId;
    
    // Mark lesson as completed if not already
    if (!progress.completedLessons.includes(lessonId)) {
      progress.completedLessons.push(lessonId);
      progress.lessonsCompleted = progress.completedLessons.length;
      
      // Calculate modules completed
      const modules = mockModules[courseId] || [];
      let modulesCompleted = 0;
      
      for (const module of modules) {
        const moduleLessons = mockLessons[module.id] || [];
        const completedModuleLessons = moduleLessons.filter(
          lesson => progress.completedLessons.includes(lesson.id)
        );
        
        if (completedModuleLessons.length === moduleLessons.length && moduleLessons.length > 0) {
          modulesCompleted++;
        }
      }
      
      progress.modulesCompleted = modulesCompleted;
      
      // Award trading points for completing lessons
      progress.tradingPoints = (progress.tradingPoints || 0) + 50;
    }
    
    return progress;
  },
  
  updateSimulationScore: async (courseId: string, simulationId: string, score: number): Promise<Progress> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    if (!mockUserProgress[courseId]) {
      throw new Error('User has no progress for this course');
    }
    
    const progress = mockUserProgress[courseId];
    
    if (!progress.simulationScores) {
      progress.simulationScores = {};
    }
    
    // Update score only if better than previous attempt
    const currentScore = progress.simulationScores[simulationId] || 0;
    if (score > currentScore) {
      progress.simulationScores[simulationId] = score;
      
      // Award trading points based on simulation performance
      const pointsGained = Math.floor(score / 10) * 5;
      progress.tradingPoints = (progress.tradingPoints || 0) + pointsGained;
    }
    
    return progress;
  },
  
  executeVirtualTrade: async (
    courseId: string, 
    tradingPair: string, 
    orderType: 'market' | 'limit', 
    side: 'buy' | 'sell', 
    amount: number, 
    price?: number
  ): Promise<{
    success: boolean;
    portfolioValue: number;
    tradingPoints: number;
    message: string;
  }> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (!mockUserProgress[courseId]) {
      throw new Error('User has no progress for this course');
    }
    
    const progress = mockUserProgress[courseId];
      
const success = Math.random() > 0.2; 

if (!success) {
  return {
    success: false,
    portfolioValue: progress.portfolioValue ?? 10000,
    tradingPoints: progress.tradingPoints ?? 0,
    message: 'Order failed to execute due to insufficient liquidity.',
  };
}

const portfolioChange = Math.random() * 200 - 50; 
progress.portfolioValue = (progress.portfolioValue ?? 10000) + portfolioChange;

progress.tradingPoints = (progress.tradingPoints ?? 0) + 10;

return {
  success: true,
  portfolioValue: progress.portfolioValue,
  tradingPoints: progress.tradingPoints,
  message: `${side.toUpperCase()} order executed successfully. Portfolio ${
    portfolioChange >= 0 ? 'gained' : 'lost'
  } ${Math.abs(portfolioChange).toFixed(2)} USDT.`,
};

    }
  };