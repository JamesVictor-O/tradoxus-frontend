export function FooterFallback() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4 text-center">
        <div className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Tradoxus
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Master crypto trading safely through gamified education
        </p>
        <div className="flex justify-center space-x-6 text-gray-600 dark:text-gray-400">
          <span>Privacy</span>
          <span>Terms</span>
          <span>Support</span>
        </div>
      </div>
    </footer>
  );
} 