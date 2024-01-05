// src/services/api.js
// This is a placeholder service for simulating API calls

const simulateApiCall = (data) => {
    // Simulate an API call with a delay
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, 1000);
    });
};

const api = {
    getClassificationData: () => simulateApiCall({ /* Mock data for classification */ }),
    getDashboardData: () => simulateApiCall({ /* Mock data for dashboard */ }),
};

export default api;