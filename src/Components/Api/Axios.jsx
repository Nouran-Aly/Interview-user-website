import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://intervyouquestions.runasp.net/api/",
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor — attach access token
apiClient.interceptors.request.use(
    (config) => {
        // const loginToken = JSON?.parse(localStorage?.getItem('userToken')) || "";
        let loginToken = "";
        const storedToken = localStorage.getItem('userToken');
        try {
            const parsed = JSON.parse(storedToken);
            // If it's an object with a 'token' key, extract it
            loginToken = typeof parsed === "object" && parsed.token ? parsed.token : parsed;
        } catch {
            // It's already a plain string (e.g., raw JWT)
            loginToken = storedToken;
        }

        const token = loginToken?.accessToken;

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// Flag to avoid infinite loop
// let isRefreshing = false;
// let failedQueue = [];

// const processQueue = (error, token = null) => {
//     failedQueue.forEach(prom => {
//         if (error) {
//             prom.reject(error);
//         } else {
//             prom.resolve(token);
//         }
//     });

//     failedQueue = [];
// };

// Response interceptor — refresh token on 401
// apiClient.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//         const originalRequest = error.config;

//         if (error.response?.status === 401 && !originalRequest._retry) {
//             if (isRefreshing) {
//                 return new Promise((resolve, reject) => {
//                     failedQueue.push({ resolve, reject });
//                 })
//                     .then(token => {
//                         originalRequest.headers.Authorization = `Bearer ${token}`;
//                         return apiClient(originalRequest);
//                     })
//                     .catch(err => Promise.reject(err));
//             }

//             originalRequest._retry = true;
//             isRefreshing = true;

//             try {
//                 const refreshResponse = await axios.post(
//                     "https://intervyouquestions.runasp.net/api/refresh",
//                     {},
//                 );

//                 const newAccessToken = refreshResponse.data.accessToken;

//                 // Save new token
//                 const currentData = JSON?.parse(localStorage.getItem('userToken')) || {};
//                 localStorage.setItem('userToken', JSON.stringify({
//                     ...currentData,
//                     accessToken: newAccessToken,
//                 }));

//                 apiClient.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
//                 processQueue(null, newAccessToken);
//                 return apiClient(originalRequest);
//             } catch (refreshError) {
//                 processQueue(refreshError, null);
//                 localStorage.removeItem("userToken");
//                 // Optionally redirect to login page
//                 return Promise.reject(refreshError);
//             } finally {
//                 isRefreshing = false;
//             }
//         }

//         return Promise.reject(error);
//     }
// );

export default apiClient;
