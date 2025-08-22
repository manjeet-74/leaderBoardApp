import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-slate-800 via-gray-900 to-slate-800 text-white mt-16">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold">Leaderboard Champions</h3>
            </div>
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              A dynamic leaderboard system where players compete for the top
              spot. Claim points, climb ranks, and achieve glory in this
              real-time gaming experience.
            </p>

            {/* Game Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-md">
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 text-center border border-white/10">
                <div className="text-2xl font-bold text-indigo-400">∞</div>
                <div className="text-xs text-gray-400">Players</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 text-center border border-white/10">
                <div className="text-2xl font-bold text-purple-400">24/7</div>
                <div className="text-xs text-gray-400">Live</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 text-center border border-white/10">
                <div className="text-2xl font-bold text-pink-400">1-10</div>
                <div className="text-xs text-gray-400">Points</div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-indigo-300">
              🎮 Game Features
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center space-x-2"
                >
                  <span>🎯</span>
                  <span>Claim Points</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center space-x-2"
                >
                  <span>🏆</span>
                  <span>Live Rankings</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center space-x-2"
                >
                  <span>👥</span>
                  <span>Add Players</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center space-x-2"
                >
                  <span>📜</span>
                  <span>Game History</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center space-x-2"
                >
                  <span>⚡</span>
                  <span>Real-time Updates</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Tech Stack & Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-purple-300">
              🛠️ Built With
            </h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-gray-300">React.js Frontend</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-300">Node.js Backend</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                <span className="text-gray-300">MongoDB Database</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                <span className="text-gray-300">Tailwind CSS</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-gray-300">Socket.io Real-time</span>
              </div>
            </div>

            {/* Developer Contact */}
            <div className="mt-6 p-4 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-lg border border-indigo-500/20">
              <h5 className="font-semibold text-indigo-300 mb-2">
                💻 Developer
              </h5>
              <p className="text-sm text-gray-300">
                Need help or have questions?
              </p>
              <a
                href="mailto:hr@triplewsols.com"
                className="text-indigo-400 hover:text-indigo-300 text-sm underline transition-colors duration-300"
              >
                hr@triplewsols.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Bottom Section */}
          <div className="py-6 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="flex items-center space-x-4">
              <p className="text-gray-400 text-sm">
                © {currentYear} Leaderboard Champions. All rights reserved.
              </p>
              <div className="hidden md:flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-xs font-medium">
                  System Online
                </span>
              </div>
            </div>

            {/* Social Links & Status */}
            <div className="flex items-center space-x-6">
              {/* Game Status */}
              <div className="flex items-center space-x-2 text-xs">
                <span className="text-gray-400">Status:</span>
                <span className="text-green-400 font-medium">🟢 Active</span>
              </div>

              {/* Version */}
              <div className="flex items-center space-x-2 text-xs">
                <span className="text-gray-400">Version:</span>
                <span className="text-indigo-400 font-mono">v1.0.0</span>
              </div>

              {/* Links */}
              <div className="flex items-center space-x-3">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                  title="Privacy Policy"
                >
                  <span className="text-sm">Privacy</span>
                </a>
                <span className="text-gray-600">•</span>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                  title="Terms of Service"
                >
                  <span className="text-sm">Terms</span>
                </a>
                <span className="text-gray-600">•</span>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                  title="Support"
                >
                  <span className="text-sm">Support</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full shadow-2xl hover:shadow-indigo-500/25 transition-all duration-300 hover:scale-110 active:scale-95 z-50 border border-white/20 backdrop-blur-sm"
        title="Back to Top"
      >
        <svg
          className="w-6 h-6 mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>
    </footer>
  );
};

export default Footer;
