import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import './Coin.css';
import { CoinContext } from '../../contex/CoinContext';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const Coin = () => {
  const { coinId } = useParams();
  const { currency } = useContext(CoinContext);
  
  const [coinData, setCoinData] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoinDetail = async () => {
      try {
        const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=true`);
        const data = await res.json();
        setCoinData(data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchChartData = async () => {
      try {
        const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=7`);
        const data = await res.json();
        setChartData({
          labels: data.prices.map(price => new Date(price[0]).toLocaleDateString()),
          datasets: [{
            label: `${currency.symbol} Price (7D)`,
            data: data.prices.map(price => price[1]),
            fill: false,
            borderColor: '#66fcf1',
            backgroundColor: '#66fcf1',
            tension: 0.3,
            pointRadius: 2
          }]
        });
      } catch (err) {
        console.error(err);
      }
    };

    Promise.all([fetchCoinDetail(), fetchChartData()]).then(() => setLoading(false));
  }, [coinId, currency]);

  if (loading || !coinData || !chartData) return <div className="coin-loading">Loading...</div>;

  return (
    <div className='coin-page'>
      <div className="coin-header">
        <img src={coinData.image.large} alt={coinData.name} />
        <h2>{coinData.name} <span>({coinData.symbol.toUpperCase()})</span></h2>
        <p>Market Rank: #{coinData.market_cap_rank}</p>
      </div>

      <div className="coin-info">
        <div className="coin-stat">
          <h4>Current Price</h4>
          <p>{currency.symbol}{coinData.market_data.current_price[currency.name.toLowerCase()].toLocaleString()}</p>
        </div>
        <div className="coin-stat">
          <h4>Market Cap</h4>
          <p>{currency.symbol}{coinData.market_data.market_cap[currency.name.toLowerCase()].toLocaleString()}</p>
        </div>
        <div className="coin-stat">
          <h4>24h Change</h4>
          <p style={{color: coinData.market_data.price_change_percentage_24h >= 0 ? 'lightgreen' : 'red'}}>
            {coinData.market_data.price_change_percentage_24h.toFixed(2)}%
          </p>
        </div>
      </div>

      <div className="coin-chart">
        <Line 
          data={chartData} 
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: true,
                labels: {
                  color: '#fff'
                }
              }
            },
            scales: {
              x: {
                ticks: { color: '#fff' },
                grid: { color: 'rgba(255,255,255,0.1)' }
              },
              y: {
                ticks: { color: '#fff' },
                grid: { color: 'rgba(255,255,255,0.1)' }
              }
            }
          }} 
        />
      </div>
    </div>
  );
};

export default Coin;
