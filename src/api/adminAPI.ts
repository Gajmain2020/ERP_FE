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

export async function ChangeAdminPasswordAPI(
  oldPassword: string,
  newPassword: string,
  confirmNewPassword: string
) {
  try {
    if (oldPassword === newPassword) {
      toast.error("New password can not be same as old password.");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      toast.error("New and Confirm New Passwords do not match.");
      return;
    }

    const res = await axios({
      headers,
      url: `${AdminURL}/change-password`,
      method: "PUT",
      data: { oldPassword, newPassword, confirmNewPassword },
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

interface IStudent {
  name: string;
  email: string;
  urn: string;
  crn: string;
  semester: string;
  section: string;
}

export async function EnrollStudentAPI(student: IStudent) {
  try {
    const res = await axios({
      headers,
      url: `${AdminURL}/enroll-student`,
      method: "POST",
      data: student,
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
