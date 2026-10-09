import api from "../services/api";

export const getHealth = async () => {
  try {
    const response = await api.get("/health");
    return {
      available: true,
      data: response.data,
      status: response.data?.status || "OK",
    };
  } catch (error) {
    if (error.response && error.response.data) {
      return {
        available: false,
        data: error.response.data,
        status: error.response.data?.status || "UNAVAILABLE",
        message: error.response.data?.message || "Service degraded",
      };
    }
    return {
      available: false,
      data: null,
      status: "DISCONNECTED",
      message: error.message || "Failed to reach health endpoint",
    };
  }
};
