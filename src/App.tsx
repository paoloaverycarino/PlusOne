import React from "react";
import { UserProvider } from "./contexts/UserContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Hero from "./pages/Hero";
import User from "./pages/User";
import Calendar from "./pages/Calendar";
import Training from "./pages/Training";
import Gallery from "./pages/Gallery";
import "./index.css";

const App: React.FC = () => {
  return (
    <UserProvider>
      <Router basename="/">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/User" element={<User />} />
          <Route path="/Calendar" element={<Calendar />} />
          <Route path="/Training" element={<Training />} />
          <Route path="/Gallery" element={<Gallery />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
