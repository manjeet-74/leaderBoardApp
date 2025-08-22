import React, { useState, useEffect, useMemo } from "react";
import Header from "./Header";
import { config } from "../config";

const HomePage = () => {
  // State management
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [leaderboard, setLeaderboard] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [claimLoading, setClaimLoading] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUser, setNewUser] = useState({
    username: "",
    name: "",
  });
  const [lastClaimResult, setLastClaimResult] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const sortedHistory = useMemo(() => {
    return [...(history || [])].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }, [history]);

  // Fetch data on component mount
  useEffect(() => {
    fetchUsers();
    fetchLeaderboard();
    fetchHistory();
  }, []);

  // API calls
  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/user");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch(
        "${config.apiBaseUrl}/api/points/leaderboard"
      );
      const data = await response.json();
      console.log(data);
      setLeaderboard(data || []);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    }
  };

  const fetchHistory = async () => {
    try {
      const response = await fetch("${config.apiBaseUrl}/api/claims/history");
      const data = await response.json();
      // console.log(data);
      setHistory(data || []);
      // setLeaderboard(data || []);
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  // Handle claim points
  const handleClaimPoints = async () => {
    if (!selectedUser) {
      alert("Please select a user first!");
      return;
    }

    const pointsAwarded = Math.floor(Math.random() * 10) + 1;

    setClaimLoading(true);
    try {
      const response = await fetch(
        `${config.apiBaseUrl}/api/user/${selectedUser}/points`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ points: pointsAwarded }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setLastClaimResult(result);
        // Refresh data
        fetchLeaderboard();
        fetchHistory();

        // Clear result after 3 seconds
        setTimeout(() => setLastClaimResult(null), 3000);
      } else {
        alert("Error claiming points: " + result.message);
      }
    } catch (error) {
      console.error("Error claiming points:", error);
      alert("Error claiming points");
    } finally {
      setClaimLoading(false);
    }
  };

  // Handle add user
  const handleAddUser = async () => {
    if (!newUser.username.trim()) {
      alert("Please enter a valid name!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("${config.apiBaseUrl}/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: newUser.username.trim(),
          name: newUser.name.trim(),
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setNewUser("");
        setShowAddUser(false);
        fetchUsers();
        fetchLeaderboard();
      } else {
        alert("Error adding user: " + result.message);
      }
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Error adding user");
    } finally {
      setLoading(false);
    }
  };

  // Get rank position styling
  const getRankStyling = (rank) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white";
      case 2:
        return "bg-gradient-to-r from-gray-300 to-gray-500 text-white";
      case 3:
        return "bg-gradient-to-r from-orange-400 to-orange-600 text-white";
      default:
        return "bg-gradient-to-r from-indigo-500 to-purple-600 text-white";
    }
  };

  // Get rank icon
  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return "👑";
      case 2:
        return "🥈";
      case 3:
        return "🥉";
      default:
        return "🏅";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section with Controls */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 mb-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
              🎯 Claim Your Points
            </h2>
            <p className="text-gray-600 text-lg">
              Select a user and claim random points to climb the leaderboard!
            </p>
          </div>

          {/* Controls Row */}
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-center">
            {/* User Selection */}
            <div className="flex-1 max-w-md">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                🎮 Select Player
              </label>
              <select
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-indigo-200 focus:border-indigo-500 focus:ring focus:ring-indigo-200 transition-all duration-300 bg-white/90 backdrop-blur-sm"
              >
                <option value="">Choose a player...</option>
                {users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.name} ({user.totalPoints || 0} points)
                  </option>
                ))}
              </select>
            </div>

            {/* Claim Button */}
            <div className="flex flex-col items-center space-y-3">
              <button
                onClick={handleClaimPoints}
                disabled={!selectedUser || claimLoading}
                className={`
                  px-8 py-4 rounded-2xl font-bold text-white text-lg shadow-lg transform transition-all duration-300
                  ${
                    selectedUser && !claimLoading
                      ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 hover:scale-105 hover:shadow-xl active:scale-95"
                      : "bg-gray-400 cursor-not-allowed"
                  }
                `}
              >
                {claimLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Claiming...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <span>🎲</span>
                    <span>Claim Points</span>
                  </div>
                )}
              </button>

              {/* Add User Button */}
              <button
                onClick={() => setShowAddUser(!showAddUser)}
                className="px-6 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold hover:from-purple-600 hover:to-pink-700 transition-all duration-300 hover:scale-105"
              >
                ➕ Add New Player
              </button>
            </div>
          </div>

          {/* Add User Form */}
          {showAddUser && (
            <div className="mt-6 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border-2 border-purple-200">
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <input
                  type="text"
                  value={newUser.username}
                  onChange={(e) =>
                    setNewUser((prev) => ({
                      ...prev,
                      username: e.target.value,
                    }))
                  }
                  placeholder="Enter player username..."
                  className="flex-1 px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:ring focus:ring-purple-200 transition-all duration-300"
                  onKeyPress={(e) => e.key === "Enter" && handleAddUser()}
                />
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) =>
                    setNewUser((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  placeholder="Enter player name..."
                  className="flex-1 px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:ring focus:ring-purple-200 transition-all duration-300"
                  onKeyPress={(e) => e.key === "Enter" && handleAddUser()}
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleAddUser}
                    disabled={loading || !newUser.username.trim()}
                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-600 hover:to-emerald-700 disabled:bg-gray-400 transition-all duration-300"
                  >
                    {loading ? "⏳" : "✅"} Add
                  </button>
                  <button
                    onClick={() => {
                      setShowAddUser(false);
                      setNewUser("");
                    }}
                    className="px-6 py-3 bg-gray-500 text-white font-semibold rounded-xl hover:bg-gray-600 transition-all duration-300"
                  >
                    ❌ Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Claim Result */}
          {lastClaimResult && (
            <div className="mt-6 p-6 bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-200 rounded-2xl">
              <div className="text-center">
                <div className="text-6xl mb-2">🎉</div>
                <h3 className="text-2xl font-bold text-green-800 mb-2">
                  Points Claimed!
                </h3>
                <p className="text-green-700 text-lg">
                  <span className="font-bold">
                    {users.find((u) => u._id === lastClaimResult.userId)?.name}
                  </span>{" "}
                  earned{" "}
                  <span className="font-bold text-2xl text-green-600">
                    +{lastClaimResult.points}
                  </span>{" "}
                  points!
                </p>
                <p className="text-green-600 mt-1">
                  Total Points:{" "}
                  <span className="font-bold">
                    {lastClaimResult.totalPoints}
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Leaderboard - Takes 2 columns on large screens */}
          <div className="xl:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  🏆 Leaderboard
                </h3>
                <div className="flex items-center space-x-2 bg-green-100 px-4 py-2 rounded-full">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-700 font-semibold text-sm">
                    Live
                  </span>
                </div>
              </div>

              <div className="space-y-4 max-h-96 overflow-y-auto">
                {leaderboard.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🎮</div>
                    <p className="text-gray-500 text-lg">
                      No players yet. Add some players and start claiming
                      points!
                    </p>
                  </div>
                ) : (
                  leaderboard.map((user, index) => (
                    <div
                      key={user.userId}
                      className={`
                        flex items-center justify-between p-6 rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl
                        ${getRankStyling(index + 1)}
                      `}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="text-3xl">{getRankIcon(index + 1)}</div>
                        <div>
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl font-bold">
                              #{index + 1}
                            </span>
                            <h4 className="text-xl font-bold">
                              {user.username || "Unknown User"}
                            </h4>
                          </div>
                          <p className="opacity-90 text-sm">
                            {index + 1 === 1
                              ? "👑 Champion"
                              : index + 1 <= 3
                              ? "🏅 Top Performer"
                              : "⭐ Competitor"}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold">
                          {user.totalPoints}
                        </div>
                        <div className="text-sm opacity-90">points</div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* History Panel */}
          <div className="xl:col-span-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  📜 Recent Claims
                </h3>
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-xl hover:bg-indigo-200 transition-colors duration-300"
                >
                  {showHistory ? "👁️ Hide" : "👁️ Show All"}
                </button>
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {sortedHistory.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-3">📋</div>
                    <p className="text-gray-500">No claims yet</p>
                  </div>
                ) : (
                  sortedHistory
                    .slice(0, showHistory ? sortedHistory.length : 5)
                    .map((claim, index) => (
                      <div
                        key={claim._id || index}
                        className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:shadow-md transition-all duration-300"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                            {(
                              users.find((u) => u._id === claim.userId)?.name ||
                              "?"
                            ).charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">
                              {users.find((u) => u._id === claim.userId)
                                ?.name || "Unknown User"}
                            </p>
                            <p className="text-xs text-gray-500">
                              {new Date(claim.createdAt).toLocaleDateString()}{" "}
                              {new Date(claim.createdAt).toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-green-600">
                            +{claim.points}
                          </div>
                          <div className="text-xs text-gray-500">points</div>
                        </div>
                      </div>
                    ))
                )}
              </div>

              {/* <div className="space-y-3 max-h-96 overflow-y-auto">
                {history.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-3">📋</div>
                    <p className="text-gray-500">No claims yet</p>
                  </div>
                ) : (
                  history
                    .slice(0, showHistory ? history.length : 5)
                    .map((claim, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:shadow-md transition-all duration-300"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                            {users
                              .find((u) => u._id === claim.userId)
                              ?.name?.charAt(0) || "?"}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">
                              {users.find((u) => u._id === claim.userId)
                                ?.name || "Unknown User"}
                            </p>
                            <p className="text-xs text-gray-500">
                              {new Date(claim.createdAt).toLocaleDateString()}{" "}
                              {new Date(claim.createdAt).toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-green-600">
                            +{claim.points}
                          </div>
                          <div className="text-xs text-gray-500">points</div>
                        </div>
                      </div>
                    ))
                )}
              </div> */}
            </div>
          </div>
        </div>

        {/* Footer Stats */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
            <div className="text-3xl mb-2">👥</div>
            <div className="text-2xl font-bold text-indigo-600">
              {users.length}
            </div>
            <div className="text-sm text-gray-600">Total Players</div>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
            <div className="text-3xl mb-2">🎯</div>
            <div className="text-2xl font-bold text-purple-600">
              {history.length}
            </div>
            <div className="text-sm text-gray-600">Total Claims</div>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
            <div className="text-3xl mb-2">⭐</div>
            <div className="text-2xl font-bold text-pink-600">
              {leaderboard.reduce((sum, user) => sum + user.totalPoints, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Points</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
