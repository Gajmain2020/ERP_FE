import axios, { AxiosError } from "axios";
import { toast } from "sonner";

const AdminURL = "/api/v1/admin";

const authStorage = JSON.parse(localStorage.getItem("auth-storage") || "{}");
const authToken = authStorage?.state?.authToken || "";
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${authToken}`,
};

export async function LoginAdminAPI(email: string, password: string) {
  try {
    const res = await axios({
      url: `${AdminURL}/login`,
      method: "POST",
      data: { email, password },
    });
    return res.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      toast.error(error.response.data.message);
      return { success: false, message: error.response.data.message };
    }
    toast.error("Something went wrong. Please try again.");
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}
