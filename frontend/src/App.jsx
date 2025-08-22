import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import HomePage from "./components/Homepage";
import Footer from "./components/Footer";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <HomePage />
      </main>
      <Footer />
    </div>
  );
}

export default App;
