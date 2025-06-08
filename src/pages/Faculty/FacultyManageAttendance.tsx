import {
  GetPendingClassAttendanceAPI,
  GetStudentsByFiltersAPI,
  SaveAttendanceAPI,
} from "@/api/facultyAPI";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { IStudent, PendingAttendance } from "@/utils/types";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const FacultyManageAttendance = ({ facultyId }: { facultyId: string }) => {
  const [pendingClasses, setPendingClasses] = useState<PendingAttendance[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedClass, setSelectedClass] = useState<PendingAttendance | null>(
    null
  );
  const [students, setStudents] = useState<IStudent[]>([]);
  const [present, setPresent] = useState<string[]>([]);

  const fetchPendingClasses = async () => {
    try {
      const res = await GetPendingClassAttendanceAPI();
      setPendingClasses(res.pendingAttendance);
    } catch (err) {
      console.error("Failed to fetch pending attendance:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStudents = async (sem: string, sec: string, dept: string) => {
    try {
      const res = await GetStudentsByFiltersAPI(sem, sec, dept);

      if (!res.success) {
        toast.error("Something went wrong while fetching students.");
        return;
      }

      setStudents(res.students);
    } catch (err) {
      console.error("Failed to fetch students:", err);
    }
  };

  const openAttendanceDialog = async (cls: PendingAttendance) => {
    setSelectedClass(cls);
    await fetchStudents(cls.semester, cls.section, cls.department);
    setOpenDialog(true);
  };

  const formatDate = (dateStr: string, day: string) => {
    const formatted = format(new Date(dateStr), "dd-MM-yyyy");
    const shortDay = day.slice(0, 3);
    return `${formatted} (${shortDay})`;
  };

  const toggleStudent = (id: string) => {
    setPresent((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const handleSubmit = async () => {
    console.log("Submit attendance for:", selectedClass);
    console.log("Present students:", present);

    if (selectedClass) {
      const res = await SaveAttendanceAPI({
        courseId: selectedClass.course._id,
        facultyId: facultyId,
        department: selectedClass.department,
        semester: selectedClass.semester,
        section: selectedClass.section,
        date: selectedClass.date, // ISO string or Date object
        periodNumber: selectedClass.periodNumber,
        presentStudentIds: present, // Array of present student ObjectIds
      });

      if (!res.success) {
        toast.error(res.message);
        return;
      }

      fetchPendingClasses?.();
      setSelectedClass(null);
      setStudents([]);
      setPresent([]);
      setOpenDialog(false);
    }
  };

  useEffect(() => {
    fetchPendingClasses();
  }, [facultyId]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="p-4">
            <Skeleton className="h-4 w-1/4 mb-2" />
            <Skeleton className="h-6 w-1/2 mb-1" />
            <Skeleton className="h-4 w-1/3" />
          </Card>
        ))}
      </div>
    );
  }

  if (pendingClasses.length === 0) {
    return (
      <div className="text-center text-muted-foreground mt-10">
        🎉 No pending attendance! All classes are marked.
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {pendingClasses.map((item, idx) => (
          <Card key={idx}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground font-normal">
                {formatDate(item.date, item.day)}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm font-medium">
                {item.course.courseShortName}{" "}
                <Badge variant="outline" className="ml-2 text-xs">
                  {item.course.courseCode}
                </Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                Period: {item.periodNumber}
              </div>
              <div className="text-sm">
                Section: {item.section} | Semester: {item.semester}
              </div>
              <div className="text-sm">Department: {item.department}</div>
              <Button
                size="sm"
                className="mt-2"
                onClick={() => openAttendanceDialog(item)}
              >
                Add Attendance
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Attendance</DialogTitle>
          </DialogHeader>

          {selectedClass && (
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground">
                {selectedClass.course.courseShortName} (
                {selectedClass.course.courseCode}) | Period{" "}
                {selectedClass.periodNumber} |{" "}
                {formatDate(selectedClass.date, selectedClass.day)}
              </div>

              <div className="space-y-2">
                {students.map((student) => (
                  <div
                    key={student._id}
                    className="flex items-center gap-2 border p-2 rounded-md"
                  >
                    <Checkbox
                      checked={present.includes(student._id ?? "")}
                      onCheckedChange={() => toggleStudent(student._id ?? "")}
                    />
                    <div>
                      <div className="font-medium">{student.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {student.crn}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Button onClick={handleSubmit} className="w-full">
                Submit Attendance
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FacultyManageAttendance;
