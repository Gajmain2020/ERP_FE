import { StudentData, StudentDetailsData } from "@/utils/types";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

const StudentURL = "/api/v1/student";

const authStorage = JSON.parse(localStorage.getItem("auth-storage") || "{}");
const authToken = authStorage?.state?.authToken || "";
const headers = {
  "Content-Type": "application/json",
  authorization: `Bearer ${authToken}`,
};

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

export async function FetchStudentDetailsAPI() {
  try {
    const response = await axios({
      headers,
      url: `${StudentURL}/fetch-student`,
      method: "GET",
    });
    return response.data.data;
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

export async function FetchStudentAllDetailsAPI() {
  try {
    const response = await axios({
      headers,
      url: `${StudentURL}/get-details`,
      method: "GET",
    });
    return response.data;
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

export async function AddStudentDetailsAPI(
  updatedBasicDetails: StudentData,
  updatedDetails: StudentDetailsData
) {
  try {
    const response = await axios({
      headers,
      url: `${StudentURL}/add-details`,
      method: "POST",
      data: {
        id: updatedBasicDetails._id,
        basic: updatedBasicDetails,
        details: updatedDetails,
      },
    });
    return response.data.data;
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

export async function UpdateStudentDetailsAPI(
  updatedDetails: StudentDetailsData
) {
  try {
    const response = await axios({
      headers,
      url: `${StudentURL}/update-details`,
      method: "POST",
      data: updatedDetails,
    });
    return response.data;
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
