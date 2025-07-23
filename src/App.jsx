import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Coin from './pages/Coin/Coin';
import Signup from './pages/siginup/Signup';
import CoinContextProvider from './contex/CoinContext';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/footer/Footer';
import './index.css';
const App = () => {
  return (
    <CoinContextProvider>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coin/:coinId" element={<Coin />} />
        <Route path="/signup" element={<Signup />} /> 
      </Routes>
      <Footer />
    </CoinContextProvider>
  );
};

export default App;
