// components/TradoxusLanding.tsx
"use client";
import React, { useState, useEffect } from "react";
import { Shield, Gamepad2, BarChart3 } from "lucide-react";
import { useWallet } from "@/context/WalletProviderContext";
import { useTranslation } from "react-i18next";

const TradoxusLanding = () => {
  const [scrollY, setScrollY] = useState(0);
  const { t } = useTranslation();

  // Use the wallet context instead of local state
  const { walletAddress, isConnecting, connectWallet } = useWallet();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    {
      icon: Shield,
      title: t('homepage.features.safety'),
      description: t('homepage.features.safetyDesc'),
      gradient: "from-cyan-500 to-blue-600",
    },
    {
      icon: Gamepad2,
      title: t('homepage.features.education'),
      description: t('homepage.features.educationDesc'),
      gradient: "from-teal-500 to-cyan-600",
    },
    {
      icon: BarChart3,
      title: t('homepage.features.community'),
      description: t('homepage.features.communityDesc'),
      gradient: "from-blue-500 to-teal-600",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-hidden">

      
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/5 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              {t('homepage.hero.title')}
            </span>
          </h1>

          <p className="text-xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            {t('homepage.hero.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {walletAddress ? (
              <>
                <button className="group bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-xl shadow-cyan-500/25 flex items-center space-x-2">
                  <span>{t('homepage.hero.getStarted')}</span>
                </button>
                <button
                  type="button"
                  className="px-8 py-4 rounded-xl font-semibold text-lg border-2 border-slate-600 hover:border-cyan-400 transition-all duration-300 hover:bg-slate-800/50 flex items-center space-x-2"
                >
                  <span>{t('homepage.buttons.exploreFeatures')}</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={connectWallet}
                  disabled={isConnecting}
                  className="group bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-xl shadow-cyan-500/25 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>
                    {isConnecting ? t('homepage.buttons.connecting') : t('homepage.buttons.connectWallet')}
                  </span>
                </button>
                <button
                  type="button"
                  className="px-8 py-4 rounded-xl font-semibold text-lg border-2 border-slate-600 hover:border-cyan-400 transition-all duration-300 hover:bg-slate-800/50 flex items-center space-x-2"
                >
                  <span>{t('homepage.buttons.exploreFeatures')}</span>
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative p-8 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700 hover:border-cyan-500/50 transition-all duration-500 hover:scale-105"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/20 via-teal-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>

                <div className="relative">
                  <div
                    className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.gradient} mb-6 shadow-lg`}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-cyan-400 transition-colors duration-300">
                    {feature.title}
                  </h3>

                  <p className="text-slate-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/5 via-teal-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-3xl p-12 border border-slate-700">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
              {t('homepage.cta.title')}
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              {t('homepage.cta.title')}
            </p>
            <button
              onClick={walletAddress ? undefined : connectWallet}
              disabled={isConnecting}
              className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 px-12 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-xl shadow-cyan-500/25 disabled:opacity-50"
            >
              {walletAddress
                ? t('homepage.buttons.startLearningToday')
                : isConnecting
                ? t('homepage.buttons.connecting')
                : t('homepage.buttons.connectWalletToStart')}
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800 py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent mb-6">
            Tradoxus
          </div>
          <p className="text-slate-400 mb-8">
            {t('homepage.hero.title')}
          </p>
          <div className="flex justify-center space-x-8 text-slate-400">
            <button
              type="button"
              className="hover:text-cyan-400 transition-colors"
            >
              {t('homepage.footer.privacy')}
            </button>
            <button
              type="button"
              className="hover:text-cyan-400 transition-colors"
            >
              {t('homepage.footer.terms')}
            </button>
            <button
              type="button"
              className="hover:text-cyan-400 transition-colors"
            >
              {t('homepage.footer.support')}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TradoxusLanding;
