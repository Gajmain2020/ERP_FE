import axios, { AxiosError } from "axios";
import { toast } from "sonner";

const StudentURL = "http://localhost:5500/api/v1/student";

export async function LoginStudentAPI(email: string, password: string) {
  try {
    const response = await axios({
      url: `${StudentURL}/login`,
      method: "POST",
      data: { email, password },
    });
    return response.data;
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
