import axios, { AxiosError } from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// 요청 인터셉터: 요청 전에 accessToken을 Auhorization 헤더에 추가
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    //수정된 요청 설정을 반환
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// 응답 인터셉터: 단순 처리
axiosInstance.interceptors.response.use(
  (response) => response, //정상 응답 발생 시 그대로 반환
  (error: AxiosError) => {
    const requestUrl = error.config?.url;
    // 로그인 요청은 interceptor에서 처리하지 않음
    if (requestUrl?.includes("/login")) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken");
      window.location.href = "/landing";
    }
    return Promise.reject(error);
  }
);
