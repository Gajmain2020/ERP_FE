import { toast } from "sonner";

import { apiClient } from "@/utils/ApiClient";
import { ICourse, IFaculty, IStudent } from "@/utils/types";

const AdminURL = "/api/v1/admin";

const authStorage = JSON.parse(localStorage.getItem("auth-storage") || "{}");
const authToken = authStorage?.state?.authToken || "";
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${authToken}`,
};

export async function LoginAdminAPI(email: string, password: string) {
  return apiClient({
    url: `${AdminURL}/login`,
    method: "POST",
    data: { email, password },
  });
}

export async function ChangeAdminPasswordAPI(
  oldPassword: string,
  newPassword: string,
  confirmNewPassword: string
) {
  if (oldPassword === newPassword) {
    toast.error("New password can not be same as old password.");
    return;
  }
  return apiClient({
    headers,
    url: `${AdminURL}/change-password`,
    method: "PUT",
    data: { oldPassword, newPassword, confirmNewPassword },
  });
}

export async function EnrollStudentAPI(student: IStudent) {
  return apiClient({
    headers,
    url: `${AdminURL}/enroll-student`,
    method: "POST",
    data: student,
  });
}

export async function EnrollFacultyAPI(faculty: IFaculty) {
  return apiClient({
    headers,
    url: `${AdminURL}/enroll-faculty`,
    method: "POST",
    data: faculty,
  });
}

export async function EnrollStudentsAPI(students: IStudent[]) {
  return apiClient({
    headers,
    url: `${AdminURL}/enroll-multiple-students`,
    method: "POST",
    data: students,
  });
}

export async function EnrollFacultiesAPI(faculties: IFaculty[]) {
  return apiClient({
    headers,
    url: `${AdminURL}/enroll-multiple-faculties`,
    method: "POST",
    data: faculties,
  });
}

export async function AddCourseAPI(course: ICourse) {
  return apiClient({
    headers,
    url: `${AdminURL}/add-course`,
    method: "POST",
    data: course,
  });
}

export async function GetAllCoursesAPI() {
  return apiClient({
    url: `${AdminURL}/get-courses`,
    method: "GET",
    headers,
  });
}

export async function GetFacultiesByCourseAPI(courseId: string) {
  return apiClient({
    url: `${AdminURL}/get-faculty-by-course?courseId=${courseId}`,
    method: "GET",
    headers,
  });
}

export async function GetFacultiesAPI() {
  return apiClient({
    url: `${AdminURL}/get-faculties`,
    method: "GET",
    headers,
  });
}

export async function AssignTeacherToCourseAPI(
  courseId: string,
  facultyId: string
) {
  return apiClient({
    url: `${AdminURL}/assign-teacher-to-course?courseId=${courseId}&facultyId=${facultyId}`,
    method: "PUT",
    headers,
  });
}

export async function RemoveTeacherFromCourseAPI(
  courseId: string,
  facultyId: string
) {
  return apiClient({
    url: `${AdminURL}/remove-faculty-from-course?courseId=${courseId}&facultyId=${facultyId}`,
    method: "PUT",
    headers,
  });
}

export async function AssignTGAPI(facultyId: string) {
  return apiClient({
    url: `${AdminURL}/assign-tg?facultyId=${facultyId}`,
    method: "PUT",
    headers,
  });
}

export async function UnassignTGAPI(facultyId: string) {
  return apiClient({
    url: `${AdminURL}/unassign-tg?facultyId=${facultyId}`,
    method: "PUT",
    headers,
  });
}

export async function SearchStudentAPI(semester: string, section: string) {
  return apiClient({
    url: `${AdminURL}/search-student?semester=${semester}&section=${section}`,
    method: "GET",
    headers,
  });
}

export async function GetTGAPI() {
  return apiClient({
    url: `${AdminURL}/get-tg`,
    method: "GET",
    headers,
  });
}

export async function AssignMultipleStudentsToTGAPI(
  tgId: string,
  studentIds: string[]
) {
  return apiClient({
    url: `${AdminURL}/assign-students-to-tg?tgId=${tgId}`,
    method: "PUT",
    headers,
    data: studentIds,
  });
}

export async function AssignSingleStudentToTGAPI(
  tgId: string,
  studentId: string
) {
  return apiClient({
    url: `${AdminURL}/assign-student-to-tg?tgId=${tgId}&studentId=${studentId}`,
    method: "PUT",
    headers,
  });
}

export async function PublishNoticeAPI(formdata: FormData) {
  return apiClient({
    url: `${AdminURL}/publish-notice`,
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${authToken}`,
    },
    data: formdata,
  });
}

export function getAllNoticesAPI() {
  return apiClient({
    url: `${AdminURL}/get-notices`,
    method: "GET",
    headers,
  });
}
