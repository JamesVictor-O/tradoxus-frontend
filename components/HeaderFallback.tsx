export function HeaderFallback() {
  return (
    <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 sticky top-0 z-50 w-full">
      <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo placeholder */}
          <div className="flex-shrink-0">
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
              Tradoxus
            </h1>
          </div>
          
          {/* Navigation placeholder */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-8 xl:space-x-10">
            <nav className="flex items-center space-x-4 lg:space-x-6 xl:space-x-8 text-sm lg:text-base">
              <div className="py-2 px-1 text-gray-700 dark:text-gray-300">Home</div>
              <div className="py-2 px-1 text-gray-700 dark:text-gray-300">Dashboard</div>
              <div className="py-2 px-1 text-gray-700 dark:text-gray-300">Trading</div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
} 