import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Hero from './pages/Hero';
import User from './pages/User';
import './index.css';

const App: React.FC = () => {
  return (

      <Router basename="/PlusOne/">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/User" element={<User />} />
        </Routes>
      </Router>
  );
};

export default App
