import React, { useContext } from 'react';
import './NavBar.css';
import logo from '../../assets/logo.png';
import signup from '../../assets/arrow_icon.png';
import { CoinContext } from '../../contex/CoinContext';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const { currency, setCurrency } = useContext(CoinContext);

  const handleCurrencyChange = (e) => {
    const selected = e.target.value;
    let symbol = "$";
    if (selected === "EUR") symbol = "€";
    if (selected === "EGP") symbol = "E£";

    setCurrency({
      name: selected,
      symbol: symbol
    });
  };

  return (
    <div className='navbar'>
      <Link to='/'>
        <img src={logo} alt="logo" className='logo' />
      </Link>
      <ul>
        <li><Link to="/">Home</Link></li>
      </ul>
      <div className="navright">
        <select value={currency.name} onChange={handleCurrencyChange}>
          <option value='USD'>USD</option>
          <option value='EUR'>EUR</option>
        </select>
        <Link to="/signup" className="signup-link">
          Sign Up <img src={signup} alt="signup" />
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
