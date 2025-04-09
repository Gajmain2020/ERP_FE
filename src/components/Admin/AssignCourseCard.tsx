import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { ICourse, IFacultyForCourse } from "@/utils/types";
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

import {
  AssignTeacherToCourseAPI,
  GetAllCoursesAPI,
  GetFacultiesAPI,
  RemoveTeacherFromCourseAPI,
} from "@/api/adminAPI";
import { Input } from "../ui/input";

export default function AssignCourseCard() {
  // For the courses
  const [courses, setCourses] = useState<ICourse[]>();
  const [coursesLoading, setCoursesLoading] = useState(true);

  // For assigning the courses
  const [selectedCourse, setSelectedCourse] = useState<ICourse | null>(null);
  const [faculties, setFaculties] = useState<IFacultyForCourse[] | undefined>();
  const [facultiesLoading, setFacultiesLoading] = useState(true);
  const [assigning, setAssigning] = useState<string[]>([]);

  // For searching the faculty
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Fetch courses from the server
    const fetchCourses = async () => {
      try {
        const res = (await GetAllCoursesAPI()) as {
          success: boolean;
          message: string;
          courses: ICourse[];
        };

        if (!(res as { success: boolean }).success) {
          toast.error(res.message);
          return;
        }
        setCourses(res.courses);
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong. Please try again.");
      } finally {
        setCoursesLoading(false);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    if (selectedCourse) {
      const fetchFaculties = async () => {
        try {
          const res = (await GetFacultiesAPI()) as {
            success: boolean;
            message: string;
            faculties: IFacultyForCourse[];
          };

          if (!(res as { success: boolean }).success) {
            toast.error(res.message);
            return;
          }
          setFaculties(res.faculties);
        } catch (error) {
          console.log(error);
          toast.error("Something went wrong. Please try again.");
        } finally {
          setFacultiesLoading(false);
        }
      };
      fetchFaculties();
    }
  }, [selectedCourse]);

  console.log(selectedCourse);

  const filteredFaculties = useMemo(() => {
    return (faculties ?? []).filter((faculty) =>
      faculty.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, faculties]);

  const closeDialog = () => {
    setSelectedCourse(null);
    setSearch("");
  };

  const handleAssignCourse = async (facultyId: string) => {
    try {
      setAssigning((prev) => [...prev, facultyId]);
      if (!selectedCourse) return;
      const res = await AssignTeacherToCourseAPI(
        selectedCourse._id as string,
        facultyId
      );

      if (!(res as { success: boolean }).success) {
        toast.error(res.message);
        return;
      }

      toast.success("Course assigned successfully.");

      setSelectedCourse(
        (prev) =>
          ({
            ...prev,
            takenBy: [...(prev?.takenBy ?? []), { facultyId }],
          } as ICourse)
      );

      setCourses((prev) =>
        prev?.map((course) =>
          course._id === selectedCourse._id
            ? {
                ...course,
                takenBy: [...(course.takenBy ?? []), { facultyId }],
              }
            : course
        )
      );
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.log(error);
    } finally {
      setAssigning((prev) => prev.filter((item) => item !== facultyId));
    }
  };

  const handleRemoveCourse = async (facultyId: string) => {
    try {
      setAssigning((prev) => [...prev, facultyId]);
      if (!selectedCourse) return;

      // Assume your RemoveTeacherFromCourseAPI is available
      const res = await RemoveTeacherFromCourseAPI(
        selectedCourse._id as string,
        facultyId
      );

      if (!res.success) {
        toast.error(res.message);
        return;
      }

      toast.success("Faculty removed from course.");

      // Update selectedCourse locally
      setSelectedCourse((prev) =>
        prev
          ? {
              ...prev,
              takenBy: prev.takenBy?.filter(
                (entry) => entry.facultyId !== facultyId
              ),
            }
          : null
      );

      // Also update the course list state
      setCourses((prev) =>
        prev?.map((course) =>
          course._id === selectedCourse._id
            ? {
                ...course,
                takenBy: course.takenBy?.filter(
                  (entry) => entry.facultyId !== facultyId
                ),
              }
            : course
        )
      );
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.log(error);
    } finally {
      setAssigning((prev) => prev.filter((item) => item !== facultyId));
    }
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
              {coursesLoading ? (
                <p className="animate-pulse text-lg">Loading...</p>
              ) : (
                courses &&
                courses.map((course) => (
                  <TableRow key={course._id} className="hover:bg-muted">
                    <TableCell className="font-medium">
                      {course.courseCode}
                    </TableCell>
                    <TableCell>{course.courseName}</TableCell>
                    <TableCell>{course.courseShortName}</TableCell>
                    <TableCell>{course.semester}</TableCell>
                    <TableCell>{course.courseType}</TableCell>
                    <TableCell>{course.takenBy?.length}</TableCell>
                    <TableCell className="w-[150px]">
                      <Button onClick={() => setSelectedCourse(course)}>
                        Add Faculties
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Dialog to assign teacher to *selected course* */}
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
              {facultiesLoading ? (
                <p className="animate-pulse text-lg">Loading...</p>
              ) : (
                filteredFaculties.map((faculty) => (
                  <div
                    key={faculty._id}
                    className="flex justify-between items-center border rounded p-2 hover:bg-muted"
                  >
                    <div>
                      <p className="font-medium">{faculty.name}</p>
                      <p className="text-sm text-gray-500">{faculty.email}</p>
                    </div>
                    <Button
                      onClick={() =>
                        selectedCourse?.takenBy?.some(
                          (entry) => entry.facultyId === faculty._id
                        )
                          ? handleRemoveCourse(faculty._id)
                          : handleAssignCourse(faculty._id)
                      }
                      size="sm"
                      disabled={assigning.includes(faculty._id)}
                      variant={
                        selectedCourse?.takenBy?.some(
                          (entry) => entry.facultyId === faculty._id
                        )
                          ? "destructive"
                          : "default"
                      }
                    >
                      {assigning.includes(faculty._id)
                        ? "Assigning"
                        : selectedCourse?.takenBy?.some(
                            (entry) => entry.facultyId === faculty._id
                          )
                        ? "Remove"
                        : "Assign"}
                    </Button>
                  </div>
                ))
              )}
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
