import axios from "axios";

export async function LoginTeacherAPI(email: string, password: string) {
  try {
    const res = await axios.post("/faculty/login", { email, password });
    return res.data;
  } catch (err) {
    console.error(err);
    return { success: false };
  }
}
