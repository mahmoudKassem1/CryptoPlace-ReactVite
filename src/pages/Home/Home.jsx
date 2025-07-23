import React, { useContext, useState } from 'react';
import './Home.css';
import { CoinContext } from '../../contex/CoinContext';
import { Link } from 'react-router-dom';

const Home = () => {
  const { allCoin, currency } = useContext(CoinContext);
  const [search, setSearch] = useState('');

  // Filter coins by search
  const filteredCoins = allCoin.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className='home'>
      <div className="hero">
        <h1>Largest <br /> Crypto marketplace in the world!</h1>
        <p>
          Welcome to the largest crypto marketplace in the world.
          Sign up to explore hundreds of currencies globally!
        </p>
        <form onSubmit={e => e.preventDefault()}>
          <input 
            type="text" 
            placeholder='Search'
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button type='submit'>Search</button>
        </form>
      </div>

      <div className="crypto-table">
        <div className="table-layout header">
          <p>#</p>
          <p>Coin</p>
          <p>Price</p>
          <p style={{ textAlign: 'center' }}>24H Change</p>
          <p className='marketcap'>Market Cap</p>
        </div>

        {filteredCoins.map((coin, index) => (
          <Link to={`/coin/${coin.id}`}  className="table-layout" key={coin.id}>
            <p>{index + 1}</p>
            <div className="coin-info">
              <img src={coin.image} alt={coin.name} width={25} />
              <span>{coin.name} ({coin.symbol.toUpperCase()})</span>
            </div>
            <p>{currency.symbol}{coin.current_price.toLocaleString()}</p>
            <p style={{
              textAlign: 'center',
              color: coin.price_change_percentage_24h >= 0 ? 'lightgreen' : 'red'
            }}>
              {coin.price_change_percentage_24h?.toFixed(2)}%
            </p>
            <p className='marketcap'>
              {currency.symbol}{coin.market_cap.toLocaleString()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
