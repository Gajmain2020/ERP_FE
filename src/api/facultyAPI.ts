import axios, { AxiosError } from "axios";
import { toast } from "sonner";

import { apiClient } from "@/utils/ApiClient";
import { IFaculty } from "@/utils/types";

const FacultyURL = "/api/v1/faculty";

const authStorage = JSON.parse(localStorage.getItem("auth-storage") || "{}");
const authToken = authStorage?.state?.authToken || "";
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${authToken}`,
};

export async function ChangeFacultyPasswordAPI(
  oldPassword: string,
  newPassword: string,
  confirmPassword: string
) {
  try {
    const response = await axios({
      url: `${FacultyURL}/change-password`,
      method: "PATCH",
      data: { oldPassword, newPassword, confirmPassword },
      headers,
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

export async function UpdateProfileInformationAPI(
  updatedData: IFaculty,
  profileImageFile: File | null
) {
  const authStorage = JSON.parse(localStorage.getItem("auth-storage") || "{}");
  const authToken = authStorage?.state?.authToken || "";

  delete updatedData.profileImage;

  const formData = new FormData();

  if (profileImageFile) {
    formData.append("image", profileImageFile);
  }
  formData.append("faculty", JSON.stringify(updatedData));

  try {
    const res = await axios({
      url: `${FacultyURL}/update-faculty-profile`,
      method: "PATCH",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${authToken}`,
      },
      data: formData,
      withCredentials: true, // ✅ Important if cookies are used
    });

    console.log(res);

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

export async function GetAllNoticesAPI() {
  return apiClient({
    url: `${FacultyURL}/get-notices`,
    method: "GET",
    headers,
  });
}

export async function PublishNoticeAPI(formData: FormData) {
  return apiClient({
    url: `${FacultyURL}/publish-notice`,
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${authToken}`,
    },
    data: formData,
  });
}
