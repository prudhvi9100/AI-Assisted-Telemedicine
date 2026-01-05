import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add access token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for handling token refresh (basic implementation)
api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // Prevent infinite loops: 
        // 1. If we already retried
        // 2. If the failed request WAS the refresh token request itself
        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url?.includes('refresh-token')
        ) {
            originalRequest._retry = true;

            try {
                // Attempt to refresh token using the HttpOnly cookie
                const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
                const { data } = await axios.post(`${baseURL}/auth/refresh-token`, {}, {
                    withCredentials: true // Important to send cookie
                });

                if (data.success && data.accessToken) {
                    // Save new token
                    localStorage.setItem('accessToken', data.accessToken);

                    // Update header for the original request
                    originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;

                    // Retry original request
                    return api(originalRequest);
                }
            } catch (refreshError) {
                // Refresh failed - user is truly logged out
                console.error("Session expired:", refreshError);
                localStorage.removeItem('accessToken');
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

// To support httpOnly cookies for refresh token
api.defaults.withCredentials = true;

export default api;
