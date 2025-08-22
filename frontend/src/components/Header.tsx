import React from 'react';

const Header = () => {
    return (
        <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-2xl sticky top-0 z-50 backdrop-blur-sm">
            {/* Main Header Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">

                    {/* Logo and Title Section */}
                    <div className="flex items-center space-x-4">
                        {/* Logo Icon */}
                        <div className="relative">
                            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg border border-white/30">
                                <svg
                                    className="w-7 h-7 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                </svg>
                            </div>
                            {/* Glow effect */}
                            <div className="absolute inset-0 bg-white/20 rounded-xl blur-md -z-10"></div>
                        </div>

                        {/* Title and Subtitle */}
                        <div className="flex flex-col">
                            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                                Leaderboard
                                <span className="text-yellow-300 ml-2">Champions</span>
                            </h1>
                            <p className="text-indigo-100 text-sm font-medium hidden sm:block">
                                Claim points • Climb ranks • Win glory
                            </p>
                        </div>
                    </div>

                    {/* Stats Section */}
                    <div className="hidden md:flex items-center space-x-6">
                        {/* Live Status Indicator */}
                        <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                            <div className="relative">
                                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                                <div className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping opacity-75"></div>
                            </div>
                            <span className="text-white text-sm font-medium">Live Rankings</span>
                        </div>

                        {/* Quick Action Button */}
                        <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 border border-white/30 hover:border-white/50 hover:scale-105 active:scale-95 shadow-lg">
                            <span className="flex items-center space-x-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                <span>Quick Claim</span>
                            </span>
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2.5 rounded-xl transition-all duration-300 border border-white/30">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom Border with Animation */}
            <div className="h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>

            {/* Floating Particles Effect (Optional) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-4 left-10 w-2 h-2 bg-white/30 rounded-full animate-pulse"></div>
                <div className="absolute top-8 right-20 w-1.5 h-1.5 bg-yellow-300/40 rounded-full animate-ping"></div>
                <div className="absolute top-12 left-1/3 w-1 h-1 bg-pink-300/50 rounded-full animate-bounce"></div>
                <div className="absolute top-6 right-1/3 w-1.5 h-1.5 bg-purple-300/40 rounded-full animate-pulse delay-1000"></div>
            </div>
        </header>
    );
};

export default Header;