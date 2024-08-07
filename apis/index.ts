import axios from "axios";
import { useRouter } from "next/router";

const axiosInstance = axios.create({
  timeout: 10000,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const router = useRouter();

    if (error.response && error.response.status === 401) {
      router.push("/login");
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;
