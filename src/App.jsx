import { useState, useEffect } from 'react';
import Portfolio from './components/Portfolio';
import Prices from './components/Prices';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('trade');
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'market_cap', direction: 'desc' });

  // Fetch crypto data
  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await fetch('/api/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setCryptoData(data);
        setLoading(false);
      } catch (err) {
        setError(`Failed to fetch cryptocurrency data: ${err.message}`);
        setLoading(false);
      }
    };

    fetchCryptoData();
  }, []);

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  // Format percentage
  const formatPercentage = (value) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  // Filter cryptos based on search
  const filteredCryptos = cryptoData.filter(crypto =>
    crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="app">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-brand">Crypto Dashboard</div>
        <div className="nav-menu">
          <button
            className={`nav-item ${activeTab === 'trade' ? 'active' : ''}`}
            onClick={() => setActiveTab('trade')}
          >
            Trade
          </button>
          <button
            className={`nav-item ${activeTab === 'portfolio' ? 'active' : ''}`}
            onClick={() => setActiveTab('portfolio')}
          >
            Portfolio
          </button>
          <button
            className={`nav-item ${activeTab === 'prices' ? 'active' : ''}`}
            onClick={() => setActiveTab('prices')}
          >
            Prices
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        {activeTab === 'trade' && (
          <div className="market-overview">
            <h2>Market Overview</h2>
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search cryptocurrencies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {loading ? (
              <div className="loading">Loading...</div>
            ) : error ? (
              <div className="error">{error}</div>
            ) : (
              <div className="crypto-table">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Price</th>
                      <th>24h Change</th>
                      <th>Market Cap</th>
                      <th>Volume (24h)</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCryptos.map(crypto => (
                      <tr key={crypto.id}>
                        <td className="crypto-name">
                          <img src={crypto.image} alt={crypto.name} />
                          <div>
                            <span className="name">{crypto.name}</span>
                            <span className="symbol">{crypto.symbol.toUpperCase()}</span>
                          </div>
                        </td>
                        <td>{formatCurrency(crypto.current_price)}</td>
                        <td className={crypto.price_change_percentage_24h >= 0 ? 'positive' : 'negative'}>
                          {formatPercentage(crypto.price_change_percentage_24h)}
                        </td>
                        <td>{formatCurrency(crypto.market_cap)}</td>
                        <td>{formatCurrency(crypto.total_volume)}</td>
                        <td>
                          <button
                            className="trade-button"
                            onClick={() => setSelectedCrypto(crypto)}
                          >
                            Trade
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'portfolio' && <Portfolio />}

        {activeTab === 'prices' && <Prices />}

        {/* Trade Modal */}
        {selectedCrypto && (
          <div className="modal">
            <div className="modal-content">
              <div className="modal-header">
                <h3>Trade {selectedCrypto.name}</h3>
                <button onClick={() => setSelectedCrypto(null)}>×</button>
              </div>
              <div className="modal-body">
                <div className="price-info">
                  <span>Current Price:</span>
                  <span>{formatCurrency(selectedCrypto.current_price)}</span>
                </div>
                <div className="trade-form">
                  <div className="input-group">
                    <label>Amount</label>
                    <input type="number" min="0" step="0.000001" />
                  </div>
                  <div className="input-group">
                    <label>Total</label>
                    <input type="number" min="0" step="0.01" />
                  </div>
                  <div className="trade-actions">
                    <button className="buy-button">Buy</button>
                    <button className="sell-button">Sell</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <footer className="footer" style={{ backgroundColor: '#f0f0f0', padding: '10px 20px', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
        <p>© 2024 Crypto Dashboard. All rights reserved.</p>
        <p>Created by <a href="https://github.com/Sathya-github-del" target="_blank" rel="noopener noreferrer" style={{ color: '#007bff', textDecoration: 'none' }}>@Sathya-github-del</a></p>
      </footer>
    </div>
  );
}

export default App;

