// components/TradoxusLanding.tsx
"use client";
import React, { useState, useEffect } from "react";
import { Shield, Gamepad2, BarChart3 } from "lucide-react";
import { useWallet } from "@/context/WalletProviderContext";

const TradoxusLanding = () => {
  const [scrollY, setScrollY] = useState(0);

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
      title: "Safe Learning Environment",
      description:
        "Practice trading with real-time market data without risking your actual funds. Get immediate feedback on your decisions and learn from every trade.",
      gradient: "from-cyan-500 to-blue-600",
    },
    {
      icon: Gamepad2,
      title: "Gamified Education",
      description:
        "Earn rewards, complete missions, and climb the rankings as you learn. Make education engaging and motivating through interactive challenges.",
      gradient: "from-teal-500 to-cyan-600",
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description:
        "Track your performance, develop custom indicators, and analyze your trading strategies with professional-grade tools and detailed insights.",
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
              Master Crypto Trading
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-400 bg-clip-text text-transparent">
              Safely
            </span>
          </h1>

          <p className="text-xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Tradoxus provides a safe, practical learning environment for crypto
            trading education through gamified experiences. Master the markets
            without the risk.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {walletAddress ? (
              <>
                <button className="group bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-xl shadow-cyan-500/25 flex items-center space-x-2">
                  <span>Get Started</span>
                </button>
                <button
                  type="button"
                  className="px-8 py-4 rounded-xl font-semibold text-lg border-2 border-slate-600 hover:border-cyan-400 transition-all duration-300 hover:bg-slate-800/50 flex items-center space-x-2"
                >
                  <span>Explore Features</span>
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
                    {isConnecting ? "Connecting..." : "Connect Wallet"}
                  </span>
                </button>
                <button
                  type="button"
                  className="px-8 py-4 rounded-xl font-semibold text-lg border-2 border-slate-600 hover:border-cyan-400 transition-all duration-300 hover:bg-slate-800/50 flex items-center space-x-2"
                >
                  <span>Explore Features</span>
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
              Ready to Start Trading?
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Join thousands of traders who have mastered crypto trading in our
              safe, gamified environment.
            </p>
            <button
              onClick={walletAddress ? undefined : connectWallet}
              disabled={isConnecting}
              className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 px-12 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-xl shadow-cyan-500/25 disabled:opacity-50"
            >
              {walletAddress
                ? "Start Learning Today"
                : isConnecting
                ? "Connecting..."
                : "Connect Wallet to Start"}
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
            Master crypto trading safely through gamified education
          </p>
          <div className="flex justify-center space-x-8 text-slate-400">
            <button
              type="button"
              className="hover:text-cyan-400 transition-colors"
            >
              + Privacy +{" "}
            </button>
            +{" "}
            <button
              type="button"
              className="hover:text-cyan-400 transition-colors"
            >
              + Terms +{" "}
            </button>
            +{" "}
            <button
              type="button"
              className="hover:text-cyan-400 transition-colors"
            >
              + Support +{" "}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TradoxusLanding;
