import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const periodsPerDay = {
  Monday: 7,
  Tuesday: 7,
  Wednesday: 7,
  Thursday: 7,
  Friday: 7,
  Saturday: 5,
};

const dummyCourses = [
  {
    _id: "course1",
    courseName: "Data Structures",
    classType: "Theory",
    takenBy: [
      { facultyId: "fac1", facultyName: "Prof. A" },
      { facultyId: "fac2", facultyName: "Prof. B" },
    ],
  },
  {
    _id: "course2",
    courseName: "Operating Systems Lab",
    classType: "Lab",
    takenBy: [{ facultyId: "fac3", facultyName: "Prof. C" }],
  },
  {
    _id: "course3",
    courseName: "DBMS",
    classType: "Theory",
    takenBy: [{ facultyId: "fac4", facultyName: "Prof. D" }],
  },
];

export default function CreateTimeTable() {
  const [selectedCourses, setSelectedCourses] = useState<
    Record<string, string>
  >({});
  const [selectedFaculty, setSelectedFaculty] = useState<
    Record<string, string>
  >({});

  const handleCourseSelect = (
    day: string,
    period: number,
    courseId: string
  ) => {
    const key = `${day}_${period}`;
    const course = getCourseById(courseId);
    const maxPeriods = periodsPerDay[day as keyof typeof periodsPerDay];

    if (course?.classType === "Lab") {
      if (period >= 6 || period + 2 > maxPeriods) {
        alert(
          "Lab requires 3 continuous periods, but not enough slots are available."
        );
        return;
      }

      const updatedCourses = { ...selectedCourses };
      const updatedFaculty = { ...selectedFaculty };

      for (let i = 0; i < 3; i++) {
        updatedCourses[`${day}_${period + i}`] = courseId;
        updatedFaculty[`${day}_${period + i}`] = "";
      }

      setSelectedCourses(updatedCourses);
      setSelectedFaculty(updatedFaculty);
    } else {
      setSelectedCourses({ ...selectedCourses, [key]: courseId });
      setSelectedFaculty({ ...selectedFaculty, [key]: "" });
    }
  };

  const handleFacultySelect = (
    day: string,
    period: number,
    facultyId: string
  ) => {
    const key = `${day}_${period}`;
    setSelectedFaculty({ ...selectedFaculty, [key]: facultyId });
  };

  const getCourseById = (id: string) => dummyCourses.find((c) => c._id === id);

  const handleSaveTimetable = async () => {
    const weekData = [];

    for (const day of days) {
      const totalPeriods = periodsPerDay[day as keyof typeof periodsPerDay];
      let period = 1;
      const periods = [];

      while (period <= totalPeriods) {
        const key = `${day}_${period}`;
        const courseId = selectedCourses[key];
        const facultyId = selectedFaculty[key];

        if (!courseId) {
          toast.error(`Please select a course for ${day}, period ${period}`);
          return;
        }

        if (!facultyId) {
          toast.error(`Please select a faculty for ${day}, period ${period}`);
          return;
        }

        const course = getCourseById(courseId);

        if (course && course.classType === "Lab") {
          for (let i = 0; i < 3; i++) {
            periods.push({
              periodNumber: period + i,
              course: courseId,
              faculty: facultyId,
            });
          }

          period += 3;
        } else {
          periods.push({
            periodNumber: period,
            course: courseId,
            faculty: facultyId,
          });
          period += 1;
        }
      }

      weekData.push({ day, periods });
    }

    const payload = {
      semester: "III",
      section: "A",
      department: "CSE",
      week: weekData,
    };

    console.log("Saving timetable:", payload);
  };

  function handleReset() {
    setSelectedCourses({});
    setSelectedFaculty({});
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Timetable</CardTitle>
        <CardDescription>
          Fill in the periods and assign faculty members to create the
          timetable.
        </CardDescription>
      </CardHeader>

      <CardContent className="overflow-auto">
        <Table className="table-auto border-collapse w-full text-sm">
          {/* Header for table */}
          <TableHeader>
            <TableRow>
              <TableHead className="border p-2">Day / Period</TableHead>
              {[...Array(7)].map((_, i) => (
                <TableHead key={i} className="border p-2">
                  Period {i + 1}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          {/* Body of the table */}
          <TableBody>
            {days.map((day) => {
              const totalPeriods =
                periodsPerDay[day as keyof typeof periodsPerDay];
              let skip = 0;
              return (
                <TableRow key={day}>
                  <TableCell className="border p-2 font-medium">
                    {day}
                  </TableCell>
                  {[...Array(7)].map((_, i) => {
                    const period = i + 1;
                    const key = `${day}_${period}`;

                    if (period > totalPeriods) {
                      return (
                        <TableCell
                          key={period}
                          className="border p-2 bg-gray-100"
                        />
                      );
                    }

                    if (skip > 0) {
                      skip--;
                      return null;
                    }

                    const selectedCourseId = selectedCourses[key];
                    const course = getCourseById(selectedCourseId);

                    if (
                      course?.classType === "Lab" &&
                      period <= totalPeriods - 2 &&
                      period < 6
                    ) {
                      skip = 2;
                      return (
                        <TableCell
                          key={period}
                          className="border p-2"
                          colSpan={3}
                        >
                          <div className="flex flex-col gap-1">
                            <Select
                              value={selectedCourseId || ""}
                              onValueChange={(val) =>
                                handleCourseSelect(day, period, val)
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select Course" />
                              </SelectTrigger>
                              <SelectContent>
                                {dummyCourses
                                  .filter(
                                    (c) =>
                                      c.classType !== "Lab" ||
                                      (period < 6 && period + 2 <= totalPeriods)
                                  )
                                  .map((c) => (
                                    <SelectItem key={c._id} value={c._id}>
                                      {c.courseName}
                                    </SelectItem>
                                  ))}
                              </SelectContent>
                            </Select>

                            <Select
                              disabled={!selectedCourseId}
                              value={selectedFaculty[key] || ""}
                              onValueChange={(val) =>
                                handleFacultySelect(day, period, val)
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select Faculty" />
                              </SelectTrigger>
                              <SelectContent>
                                {course?.takenBy?.map((f) => (
                                  <SelectItem
                                    key={f.facultyId}
                                    value={f.facultyId}
                                  >
                                    {f.facultyName}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </TableCell>
                      );
                    }

                    return (
                      <TableCell key={period} className="border p-2">
                        <div className="flex flex-col gap-1">
                          <Select
                            value={selectedCourseId || ""}
                            onValueChange={(val) =>
                              handleCourseSelect(day, period, val)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select Course" />
                            </SelectTrigger>
                            <SelectContent>
                              {dummyCourses
                                .filter(
                                  (c) =>
                                    c.classType !== "Lab" ||
                                    (period < 6 && period + 2 <= totalPeriods)
                                )
                                .map((c) => (
                                  <SelectItem key={c._id} value={c._id}>
                                    {c.courseName}
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>

                          <Select
                            disabled={!selectedCourseId}
                            value={selectedFaculty[key] || ""}
                            onValueChange={(val) =>
                              handleFacultySelect(day, period, val)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select Faculty" />
                            </SelectTrigger>
                            <SelectContent>
                              {course?.takenBy?.map((f) => (
                                <SelectItem
                                  key={f.facultyId}
                                  value={f.facultyId}
                                >
                                  {f.facultyName}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>

      <CardFooter className="flex gap-4">
        <Button onClick={handleSaveTimetable}>Save Timetable</Button>
        <Button variant="secondary" onClick={handleReset}>
          Reset
        </Button>
      </CardFooter>
    </Card>
  );
}
