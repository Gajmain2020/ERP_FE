import { z } from "zod";

export const addStudentSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().min(1, "Name is required"),
  urn: z.string().min(1, "URN is required"),
  crn: z.string().min(1, "CRN is required"),
  semester: z.enum(["I", "II", "III", "IV", "V", "VI", "VII", "VIII"], {
    errorMap: () => ({ message: "Semester is required" }),
  }),
  section: z.enum(["A", "B", "C", "D"], {
    errorMap: () => ({ message: "Section is required" }),
  }),
});
