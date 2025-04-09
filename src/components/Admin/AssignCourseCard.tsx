import { useMemo, useState } from "react";

import { ICourse } from "@/utils/types";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

import { Input } from "../ui/input";

const dummyCourse = [
  {
    _id: "1",
    courseName: "Course 1",
    courseShortName: "Co1",
    semester: "I",
    courseType: "Core Subject",
    courseCode: "CS101",
  },
  {
    _id: "2",
    courseName: "Course 2",
    courseShortName: "Co2",
    semester: "II",
    courseType: "Core Subject",
    courseCode: "CS102",
  },
];

const dummyFaculties = [
  { id: "f1", name: "Dr. A. Sharma", email: "a.sharma@bit.edu" },
  { id: "f2", name: "Prof. B. Mehta", email: "b.mehta@bit.edu" },
  { id: "f3", name: "Dr. C. Verma", email: "c.verma@bit.edu" },
  { id: "f4", name: "Prof. D. Singh", email: "d.singh@bit.edu" },
];

export default function AssignCourseCard() {
  const [selectedCourse, setSelectedCourse] = useState<ICourse | null>(null);
  const [search, setSearch] = useState("");

  const filteredFaculties = useMemo(() => {
    return dummyFaculties.filter((faculty) =>
      faculty.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const closeDialog = () => {
    setSelectedCourse(null);
    setSearch("");
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Assign Course To Faculties</CardTitle>
          <CardDescription>Add faculties to the course.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>A list of your courses.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[120px]">Course Code</TableHead>
                <TableHead>Course Name</TableHead>
                <TableHead>Short Name</TableHead>
                <TableHead>Semester</TableHead>
                <TableHead>Course Type</TableHead>
                <TableHead>Nos Faculties</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dummyCourse.map((course) => (
                <TableRow key={course._id} className="hover:bg-muted">
                  <TableCell className="font-medium">
                    {course.courseCode}
                  </TableCell>
                  <TableCell>{course.courseName}</TableCell>
                  <TableCell>{course.courseShortName}</TableCell>
                  <TableCell>{course.semester}</TableCell>
                  <TableCell>{course.courseType}</TableCell>
                  <TableCell>{"10"}</TableCell>
                  <TableCell className="w-[150px]">
                    <Button onClick={() => setSelectedCourse(course)}>
                      Add Faculties
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Dialog */}
      <Dialog open={!!selectedCourse} onOpenChange={closeDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              Assign Faculty to {selectedCourse?.courseShortName}
            </DialogTitle>
            <DialogDescription>
              Select faculty members to assign this course.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <Input
              placeholder="Search faculty by name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <div className="max-h-64 overflow-y-auto border rounded-md p-2 space-y-2">
              {filteredFaculties.map((faculty) => (
                <div
                  key={faculty.id}
                  className="flex justify-between items-center border rounded p-2 hover:bg-muted"
                >
                  <div>
                    <p className="font-medium">{faculty.name}</p>
                    <p className="text-sm text-gray-500">{faculty.email}</p>
                  </div>
                  <Button size="sm">Assign</Button>
                </div>
              ))}
              {filteredFaculties.length === 0 && (
                <p className="text-sm text-center text-gray-500">
                  No faculty found.
                </p>
              )}
            </div>
          </div>

          <DialogFooter className="pt-4">
            <Button variant="secondary" onClick={closeDialog}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
