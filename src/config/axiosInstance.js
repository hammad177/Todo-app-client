import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}`,
});

const refreshToken = async () => {
  try {
    const token = localStorage.getItem("rf-token");
    const { data } = await axiosInstance.post("/auth/refresh-token", { token });
    if (data.status) {
      localStorage.setItem("xx-token", data.accessToken);
      return data.accessToken;
    }
  } catch (error) {
    localStorage.removeItem("rf-token");
    localStorage.removeItem("xx-token");
    window.location.reload();
  }
};

// Response interceptor for API calls
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 403 || error.response.status === 401) {
      originalRequest._retry = true;
      const access_token = await refreshToken();
      axios.defaults.headers.common["Authorization"] = "Bearer " + access_token;
      return axiosInstance(originalRequest);
    }
    return Promise.reject(error);
  }
);

// Request interceptor for API calls
axiosInstance.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Bearer ${localStorage.getItem(
      "xx-token"
    )}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
