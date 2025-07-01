import { BenefitItem } from "@/components/web3/benefit-item";
import { FeatureCard } from "@/components/web3/feature-card";
import { benefits, features } from "@/lib/constants/web3";

export default function Web3Integration() {
  return (
    <main className="bg-white dark:bg-gray-900 transition-colors duration-200">
      {/* Section 1: Web3 Integration in Tradoxus */}
      <section className="py-8 sm:py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto mb-8 sm:mb-10 lg:mb-12 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white leading-tight">
              Web3 Integration in Tradoxus
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Tradoxus leverages Web3 technologies to provide a cutting-edge
              learning experience that goes beyond traditional educational
              platforms. Our Web3 integration offers unique advantages that
              prepare you for the real world of crypto trading.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {features.map((feature) => (
              <FeatureCard key={feature.id} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Why Web3 Matters in Crypto Education */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto mb-8 sm:mb-10 text-center">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white leading-tight">
              Why Web3 Matters in Crypto Education
            </h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
              Integrating Web3 technologies into our educational platform
              provides several key benefits.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              {benefits.map((benefit) => (
                <BenefitItem key={benefit.id} {...benefit} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
