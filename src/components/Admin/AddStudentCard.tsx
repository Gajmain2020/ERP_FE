import { EnrollStudentAPI } from "@/api/adminAPI";
import { addStudentSchema } from "@/utils/zodSchemas";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function AddStudentCard() {
  const [student, setStudent] = useState({
    name: "",
    email: "",
    urn: "",
    crn: "",
    semester: "",
    section: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { placeholder, value } = e.target;
    setStudent((prev) => ({
      ...prev,
      [placeholder.toLowerCase().replace("student ", "")]: value,
    }));
  };

  const handleSelectChange = (field: "semester" | "section", value: string) => {
    setStudent((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddStudent = async () => {
    const result = addStudentSchema.safeParse(student);

    if (!result.success) {
      toast.error("All fields are required.");
      return;
    }

    const res = await EnrollStudentAPI(student);

    if (!res.success) {
      toast.error(res.message);
      return;
    }
    toast.success("Student added successfully.");
    handleClear();
  };

  const handleClear = () => {
    setStudent({
      name: "",
      email: "",
      urn: "",
      crn: "",
      semester: "",
      section: "",
    });
  };
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Add Student</CardTitle>
        <CardDescription>
          Fill in the details of the new students to enroll the student into
          BIT-BUDDY portal.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-3 gap-4">
        <div>
          <label className="text-sm text-gray-800">Student Name</label>
          <Input
            placeholder="Student Name"
            value={student.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="text-sm text-gray-800">Student Email</label>
          <Input
            type="email"
            placeholder="Student Email"
            value={student.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="text-sm text-gray-800">Student URN</label>
          <Input
            placeholder="Student URN"
            value={student.urn}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="text-sm text-gray-800">Student CRN</label>
          <Input
            placeholder="Student CRN"
            value={student.crn}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="text-sm text-gray-800">Student Semester</label>
          <Select
            value={student.semester}
            onValueChange={(value) => handleSelectChange("semester", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Semester" />
            </SelectTrigger>
            <SelectContent>
              {["I", "II", "III", "IV", "V", "VI", "VII", "VIII"].map(
                (semester) => (
                  <SelectItem key={semester} value={semester}>
                    {semester}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm text-gray-800">Student Section</label>
          <Select
            value={student.section}
            onValueChange={(value) => handleSelectChange("section", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Section" />
            </SelectTrigger>
            <SelectContent>
              {["A", "B"].map((section) => (
                <SelectItem key={section} value={section}>
                  {section}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-4">
        <Button variant="secondary" onClick={handleClear}>
          Clear
        </Button>
        <Button onClick={handleAddStudent}>Add Student</Button>
      </CardFooter>
    </Card>
  );
}
