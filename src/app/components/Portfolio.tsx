import { useEffect, useState } from 'react';
import axios from 'axios';

interface Coin {
    id: string;
    name: string;
    current_price: number;
}

export default function Portfolio() {
    const [portfolio, setPortfolio] = useState<{ coin: string; amount: number }[]>([]);
    const [coinId, setCoinId] = useState<string>('');
    const [amount, setAmount] = useState<number>(0);
    const [prices, setPrices] = useState<Coin[] | null>(null);

    const addCoinToPortfolio = () => {
        setPortfolio([...portfolio, { coin: coinId, amount }]);
        setCoinId('');
        setAmount(0);
    };

    useEffect(() => {
        if (portfolio.length > 0) {
            async function fetchPrices() {
                const coinIds = portfolio.map((entry) => entry.coin).join(',');
                const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price`, {
                    params: {
                        ids: coinIds,
                        vs_currencies: 'usd',
                    },
                });
                setPrices(response.data);
            }
            fetchPrices();
        }
    }, [portfolio]);

    const calculateTotalValue = () => {
        if (!prices) return 0;
        return portfolio.reduce((total, entry) => {
            const price = prices[entry.coin]?.usd || 0;
            return total + entry.amount * price;
        }, 0);
    };

    return (
        <div>
            <h2>Add Cryptocurrency to Your Portfolio</h2>
            <input
                type="text"
                placeholder="Coin ID (e.g., bitcoin)"
                value={coinId}
                onChange={(e) => setCoinId(e.target.value)}
            />
            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
            />
            <button onClick={addCoinToPortfolio}>Add to Portfolio</button>

            <ul>
                {portfolio.map((entry, index) => (
                    <li key={index}>
                        {entry.coin}: {entry.amount} - ${prices?.[entry.coin]?.usd || 'Loading...'}
                    </li>
                ))}
            </ul>

            <h3>Total Portfolio Value: ${calculateTotalValue()}</h3>
        </div>
    );
}
