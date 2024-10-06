export default function Dashboard() {
    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold">Cryptocurrency Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                {/* Add cards for portfolio, price charts, etc */}
                <div className="bg-white p-4 shadow rounded-lg">Portfolio Overview</div>
                <div className="bg-white p-4 shadow rounded-lg">Price Chart</div>
                <div className="bg-white p-4 shadow rounded-lg">Market Trends</div>
            </div>
        </div>
    );
}
