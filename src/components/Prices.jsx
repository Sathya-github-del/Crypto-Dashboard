import { useState, useEffect } from 'react';
import './Prices.css';

function Prices() {
    const [cryptoData, setCryptoData] = useState([
        {
            id: 'bitcoin',
            name: 'Bitcoin',
            symbol: 'BTC',
            current_price: 3784521,
            price_change_24h: 2.5,
            market_cap: 72385492145214,
            total_volume: 2847582145,
            image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png'
        },
        {
            id: 'ethereum',
            name: 'Ethereum',
            symbol: 'ETH',
            current_price: 245879,
            price_change_24h: -1.2,
            market_cap: 28475821452145,
            total_volume: 1847582145,
            image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png'
        },
        {
            id: 'binancecoin',
            name: 'BNB',
            symbol: 'BNB',
            current_price: 28475,
            price_change_24h: 0.8,
            market_cap: 4758214521452,
            total_volume: 847582145,
            image: 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png'
        },
        {
            id: 'solana',
            name: 'Solana',
            symbol: 'SOL',
            current_price: 7845,
            price_change_24h: 5.2,
            market_cap: 3275821452145,
            total_volume: 747582145,
            image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png'
        },
        {
            id: 'cardano',
            name: 'Cardano',
            symbol: 'ADA',
            current_price: 42.5,
            price_change_24h: -0.5,
            market_cap: 1475821452145,
            total_volume: 547582145,
            image: 'https://assets.coingecko.com/coins/images/975/large/cardano.png'
        },
        {
            id: 'ripple',
            name: 'XRP',
            symbol: 'XRP',
            current_price: 48.75,
            price_change_24h: 1.8,
            market_cap: 2375821452145,
            total_volume: 647582145,
            image: 'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png'
        },
        {
            id: 'polkadot',
            name: 'Polkadot',
            symbol: 'DOT',
            current_price: 584.25,
            price_change_24h: -2.1,
            market_cap: 875821452145,
            total_volume: 347582145,
            image: 'https://assets.coingecko.com/coins/images/12171/large/polkadot.png'
        },
        {
            id: 'dogecoin',
            name: 'Dogecoin',
            symbol: 'DOGE',
            current_price: 7.25,
            price_change_24h: 3.4,
            market_cap: 975821452145,
            total_volume: 447582145,
            image: 'https://assets.coingecko.com/coins/images/5/large/dogecoin.png'
        },
        {
            id: 'avalanche',
            name: 'Avalanche',
            symbol: 'AVAX',
            current_price: 2847.50,
            price_change_24h: 4.7,
            market_cap: 775821452145,
            total_volume: 247582145,
            image: 'https://assets.coingecko.com/coins/images/12559/large/Avalanche_Circle_RedWhite_Trans.png'
        },
        {
            id: 'chainlink',
            name: 'Chainlink',
            symbol: 'LINK',
            current_price: 1247.75,
            price_change_24h: -1.5,
            market_cap: 575821452145,
            total_volume: 147582145,
            image: 'https://assets.coingecko.com/coins/images/877/large/chainlink-new-logo.png'
        }
    ]);

    const [sortConfig, setSortConfig] = useState({ key: 'market_cap', direction: 'desc' });
    const [searchQuery, setSearchQuery] = useState('');

    const formatINR = (value) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(value);
    };

    const formatLargeNumber = (value) => {
        if (value >= 1e9) {
            return `₹${(value / 1e9).toFixed(2)}B`;
        }
        if (value >= 1e6) {
            return `₹${(value / 1e6).toFixed(2)}M`;
        }
        return formatINR(value);
    };

    const handleSort = (key) => {
        setSortConfig({
            key,
            direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
        });
    };

    const sortedData = [...cryptoData].sort((a, b) => {
        if (sortConfig.direction === 'asc') {
            return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
        }
        return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
    });

    const filteredData = sortedData.filter(crypto =>
        crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="prices-container">
            <div className="prices-header">
                <h1>Cryptocurrency Prices by Market Cap</h1>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search cryptocurrencies..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <div className="prices-table-container">
                <table className="prices-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th onClick={() => handleSort('name')}>Name</th>
                            <th onClick={() => handleSort('current_price')}>Price</th>
                            <th onClick={() => handleSort('price_change_24h')}>24h Change</th>
                            <th onClick={() => handleSort('market_cap')}>Market Cap</th>
                            <th onClick={() => handleSort('total_volume')}>Volume (24h)</th>
                            <th>Trade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((crypto, index) => (
                            <tr key={crypto.id}>
                                <td>{index + 1}</td>
                                <td>
                                    <div className="crypto-name-cell">
                                        <img src={crypto.image} alt={crypto.name} />
                                        <div>
                                            <span className="name">{crypto.name}</span>
                                            <span className="symbol">{crypto.symbol}</span>
                                        </div>
                                    </div>
                                </td>
                                <td>{formatINR(crypto.current_price)}</td>
                                <td className={crypto.price_change_24h >= 0 ? 'positive' : 'negative'}>
                                    {crypto.price_change_24h > 0 ? '+' : ''}{crypto.price_change_24h}%
                                </td>
                                <td>{formatLargeNumber(crypto.market_cap)}</td>
                                <td>{formatLargeNumber(crypto.total_volume)}</td>
                                <td>
                                    <button className="trade-btn">Trade</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Prices; 