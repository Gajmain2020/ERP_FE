import { useState } from "react";
import { toast } from "sonner";

import { AddCourseAPI } from "@/api/adminAPI";
import { ICourse } from "@/utils/types";
import { addCourseSchema } from "@/utils/zodSchemas";
import { Select } from "@radix-ui/react-select";
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
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function AddCourseCard() {
  const [course, setCourse] = useState<ICourse>({
    courseCode: "",
    courseName: "",
    courseShortName: "",
    semester: "",
    courseType: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleAddCourse = async () => {
    setIsLoading(true);
    try {
      const result = addCourseSchema.safeParse(course);
      if (!result.success) {
        result.error.errors.forEach((error) => {
          toast.error(error.message);
        });
        return;
      }

      const response = await AddCourseAPI(course);

      if (!response.success) {
        toast.error(response.message);
        return;
      }

      toast.success(response.message);
      handleClear();
    } catch (error) {
      toast.error("Error adding course");
      console.log(error);
      return;
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setCourse({
      courseCode: "",
      courseName: "",
      courseShortName: "",
      semester: "",
      courseType: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCourse((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Course</CardTitle>
        <CardDescription>
          Fill in the details of course to add the course
        </CardDescription>
      </CardHeader>

      <CardContent className="grid grid-cols-3 gap-4">
        <div>
          <label className="text-sm text-gray-800">Course Code</label>
          <Input
            onChange={handleChange}
            name="courseCode"
            placeholder="Course Code"
          />
        </div>

        <div>
          <label className="text-sm text-gray-800">Course Name</label>
          <Input
            onChange={handleChange}
            name="courseName"
            placeholder="Course Name"
          />
        </div>

        <div>
          <label className="text-sm text-gray-800">Course Short Name</label>
          <Input
            onChange={handleChange}
            name="courseShortName"
            placeholder="Course Short Name"
          />
        </div>

        <div>
          <label className="text-sm text-gray-800">Course Semester</label>
          <Select
            onValueChange={(value) =>
              setCourse((prev) => ({ ...prev, semester: value }))
            }
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
          <label className="text-sm text-gray-800">Course Type</label>
          <Select
            onValueChange={(value) =>
              setCourse((prev) => ({ ...prev, courseType: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Course Type" />
            </SelectTrigger>
            <SelectContent>
              {[
                "First Year Subject",
                "Core Subject",
                "Prof. Elective",
                "Open Elective",
              ].map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
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
        <Button disabled={isLoading} onClick={handleAddCourse}>
          Add Course
        </Button>
      </CardFooter>
    </Card>
  );
}
