'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

interface Coin {
    id: string;
    name: string;
    current_price: number;
}

export default function Dashboard() {
    const [data, setData] = useState<Coin[] | null>(null);

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get<Coin[]>('https://api.coingecko.com/api/v3/coins/markets', {
                params: { vs_currency: 'usd' },
            });
            setData(response.data);
        }
        fetchData();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold">Cryptocurrency Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                <div className="bg-white p-4 shadow rounded-lg">Portfolio Overview</div>
                <div className="bg-white p-4 shadow rounded-lg">
                    {data ? data.map(coin => <p key={coin.id}>{coin.name}: ${coin.current_price}</p>) : 'Loading...'}
                </div>
                <div className="bg-white p-4 shadow rounded-lg">Market Trends</div>
            </div>
        </div>
    );
}
