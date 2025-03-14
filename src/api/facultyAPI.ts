import axios, { AxiosError } from "axios";
import { toast } from "sonner";

const FacultyURL = "http://localhost:5500/api/v1/faculty";

const authStorage = JSON.parse(localStorage.getItem("auth-storage") || "{}");
const authToken = authStorage?.state?.authToken || "";
const headers = {
  "Content-Type": "application/json",
  authorization: `Bearer ${authToken}`,
};

export async function LoginTeacherAPI(email: string, password: string) {
  try {
    const res = await axios({
      url: `${FacultyURL}/login`,
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

export async function FetchFacultyProfileAPI() {
  try {
    const res = await axios({
      headers,
      url: `${FacultyURL}/faculty-profile`,
      method: "get",
    });
    return res.data;
  } catch (error) {
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
