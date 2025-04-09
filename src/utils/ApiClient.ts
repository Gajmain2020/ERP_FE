// utils/apiClient.ts
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { toast } from "sonner";

export async function apiClient<T>(
  config: AxiosRequestConfig
): Promise<T | { success: false; message: string }> {
  try {
    const res = await axios(config);
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      const message = error.response.data?.message || "Unknown error";
      toast.error(message);
      return { success: false, message };
    }
    toast.error("Something went wrong. Please try again.");
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}
