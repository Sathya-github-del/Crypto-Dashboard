import { useState, useEffect } from 'react';
import './Portfolio.css';
import PortfolioChart from './PortfolioChart';

function Portfolio() {
    const [portfolioData, setPortfolioData] = useState({
        totalValue: 125000,
        totalProfit: 12500,
        profitPercentage: 11.2,
        assets: [
            {
                id: 'bitcoin',
                name: 'Bitcoin',
                symbol: 'BTC',
                amount: 0.5,
                value: 22000,
                price: 44000,
                profit: 2500,
                profitPercentage: 12.5,
                icon: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png'
            },
            {
                id: 'ethereum',
                name: 'Ethereum',
                symbol: 'ETH',
                amount: 4.2,
                value: 12600,
                price: 3000,
                profit: 840,
                profitPercentage: 7.2,
                icon: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png'
            },
            // Add more mock data as needed
        ]
    });

    const [timeframe, setTimeframe] = useState('24h');

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(value);
    };

    const formatPercentage = (value) => {
        return `${value > 0 ? '+' : ''}${value.toFixed(2)}%`;
    };

    return (
        <div className="portfolio-container">
            {/* Portfolio Summary */}
            <div className="portfolio-summary">
                <div className="summary-header">
                    <h1>Portfolio</h1>
                    <div className="timeframe-selector">
                        {['1h', '24h', '7d', '1m', '1y', 'all'].map(period => (
                            <button
                                key={period}
                                className={`timeframe-btn ${timeframe === period ? 'active' : ''}`}
                                onClick={() => setTimeframe(period)}
                            >
                                {period.toUpperCase()}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="total-value">
                    <h2>{formatCurrency(portfolioData.totalValue)}</h2>
                    <div className={`profit ${portfolioData.totalProfit >= 0 ? 'positive' : 'negative'}`}>
                        {formatCurrency(portfolioData.totalProfit)}
                        <span className="percentage">
                            ({formatPercentage(portfolioData.profitPercentage)})
                        </span>
                    </div>
                </div>

                <PortfolioChart timeframe={timeframe} />
            </div>

            {/* Assets List */}
            <div className="assets-section">
                <h2>Your Assets</h2>
                <div className="assets-list">
                    {portfolioData.assets.map(asset => (
                        <div key={asset.id} className="asset-card">
                            <div className="asset-header">
                                <div className="asset-icon">
                                    <img src={asset.icon} alt={asset.name} />
                                </div>
                                <div className="asset-info">
                                    <h3>{asset.name}</h3>
                                    <span className="asset-amount">
                                        {asset.amount} {asset.symbol}
                                    </span>
                                </div>
                                <div className="asset-value">
                                    <div className="current-value">{formatCurrency(asset.value)}</div>
                                    <div className={`profit ${asset.profit >= 0 ? 'positive' : 'negative'}`}>
                                        {formatPercentage(asset.profitPercentage)}
                                    </div>
                                </div>
                            </div>

                            <div className="asset-details">
                                <div className="detail-item">
                                    <span className="label">Price</span>
                                    <span className="value">{formatCurrency(asset.price)}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="label">Profit/Loss</span>
                                    <span className={`value ${asset.profit >= 0 ? 'positive' : 'negative'}`}>
                                        {formatCurrency(asset.profit)}
                                    </span>
                                </div>
                            </div>

                            <div className="asset-actions">
                                <button className="action-btn buy">Buy</button>
                                <button className="action-btn sell">Sell</button>
                                <button className="action-btn trade">Trade</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Portfolio; 