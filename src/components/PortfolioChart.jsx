import { useState, useEffect } from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

function PortfolioChart({ timeframe }) {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        // Generate random data based on timeframe
        const generateData = () => {
            const points = {
                '1h': 60,
                '24h': 24,
                '7d': 7,
                '1m': 30,
                '1y': 12,
                'all': 24
            }[timeframe] || 24;

            let baseValue = 45000;
            const data = [];

            for (let i = 0; i < points; i++) {
                const random = Math.random() * 2000 - 1000;
                baseValue = baseValue + random;

                const date = new Date();
                switch (timeframe) {
                    case '1h':
                        date.setMinutes(date.getMinutes() - (60 - i));
                        break;
                    case '24h':
                        date.setHours(date.getHours() - (24 - i));
                        break;
                    case '7d':
                        date.setDate(date.getDate() - (7 - i));
                        break;
                    case '1m':
                        date.setDate(date.getDate() - (30 - i));
                        break;
                    case '1y':
                        date.setMonth(date.getMonth() - (12 - i));
                        break;
                    default:
                        date.setMonth(date.getMonth() - (24 - i));
                }

                data.push({
                    timestamp: date.toLocaleString(),
                    value: baseValue
                });
            }
            return data;
        };

        setChartData(generateData());
    }, [timeframe]);

    const formatTooltipValue = (value) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        }).format(value);
    };

    const formatXAxis = (timestamp) => {
        const date = new Date(timestamp);
        switch (timeframe) {
            case '1h':
                return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            case '24h':
                return date.toLocaleTimeString([], { hour: '2-digit' });
            case '7d':
            case '1m':
                return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
            case '1y':
            case 'all':
                return date.toLocaleDateString([], { month: 'short' });
            default:
                return timestamp;
        }
    };

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip">
                    <p className="tooltip-time">{label}</p>
                    <p className="tooltip-value">{formatTooltipValue(payload[0].value)}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="portfolio-chart">
            <ResponsiveContainer width="100%" height={300}>
                <AreaChart
                    data={chartData}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                        dataKey="timestamp"
                        tickFormatter={formatXAxis}
                        tick={{ fill: '#5B616E' }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <YAxis
                        tickFormatter={formatTooltipValue}
                        tick={{ fill: '#5B616E' }}
                        axisLine={false}
                        tickLine={false}
                        domain={['auto', 'auto']}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#0052FF"
                        fill="url(#colorValue)"
                        strokeWidth={2}
                    />
                    <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#0052FF" stopOpacity={0.2} />
                            <stop offset="95%" stopColor="#0052FF" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}

export default PortfolioChart; 