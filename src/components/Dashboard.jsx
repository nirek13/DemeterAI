// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import api from '../services/api';

function Dashboard() {
    const [dashboardData, setDashboardData] = useState(null);

    useEffect(() => {
        // Simulate API call to fetch dashboard data
        api.getDashboardData().then((data) => {
            setDashboardData(data);
        });
    }, []);

    return (
        <div>
            <h2>Dashboard</h2>
            {dashboardData ? (
                <div>
                    {/* Display dashboard data */}
                    {/* Modify this based on the actual data structure */}
                    <pre>{JSON.stringify(dashboardData, null, 2)}</pre>
                </div>
            ) : (
                <p>Loading dashboard data...</p>
            )}
        </div>
    );
}

export default Dashboard;
