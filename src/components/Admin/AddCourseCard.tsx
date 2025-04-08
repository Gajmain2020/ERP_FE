import { useState } from "react";

import { ICourse } from "@/utils/types";
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
          <Input placeholder="Course Code" />
        </div>

        <div>
          <label className="text-sm text-gray-800">Course Name</label>
          <Input placeholder="Course Code" />
        </div>

        <div>
          <label className="text-sm text-gray-800">Course Short Name</label>
          <Input placeholder="Course Code" />
        </div>

        <div>
          <label className="text-sm text-gray-800">Course Semester</label>
          <Select onValueChange={(value) => console.log("semester", value)}>
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
          <Select onValueChange={(value) => console.log("semester", value)}>
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
        <Button variant="secondary" onClick={() => console.log("clear")}>
          Clear
        </Button>
        <Button onClick={() => console.log("add")}>Add Course</Button>
      </CardFooter>
    </Card>
  );
}
