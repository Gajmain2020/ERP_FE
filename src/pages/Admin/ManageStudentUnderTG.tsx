import { useEffect, useState } from "react";
import { toast } from "sonner";

import {
  AssignMultipleStudentsToTGAPI,
  AssignSingleStudentToTGAPI,
  GetTGAPI,
  SearchStudentAPI,
} from "@/api/adminAPI";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Input } from "@/components/ui/input";
import { IStudent } from "@/utils/types";

interface ITg {
  _id?: string;
  name: string;
  email: string;
  position: string;
}

export default function ManageStudentUnderTG() {
  // states to search students
  const [section, setSection] = useState("");
  const [semester, setSemester] = useState("");

  // To check if searched
  const [searched, setSearched] = useState(false);
  const [searching, setSearching] = useState(false);
  const [students, setStudents] = useState<IStudent[]>([]);
  // assign single student to tg and dialog
  const [selectedStudent, setSelectedStudent] = useState<IStudent | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // To assign multiple students under TG
  const [selected, setSelected] = useState<string[]>([]);

  // To Search Student in the list
  const [searchQuery, setSearchQuery] = useState("");

  //TGs
  const [tg, setTg] = useState<ITg[]>([]);
  const [assigning, setAssigning] = useState(false);

  const romanSemesters = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];
  const sectionOptions = ["A", "B"];

  useEffect(() => {
    const fetchTg = async () => {
      try {
        const res = await GetTGAPI();

        if (!res.success) {
          toast.error("Error occurred while fetching TG.");
          return;
        }

        setTg(res.tg);
      } catch (error) {
        console.log("Error fetching TG:", error);
        toast.error("Error occurred while fetching TG.");
      }
    };

    if (tg.length === 0) {
      fetchTg();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStudent]);

  const handleSearch = async () => {
    if (!semester) {
      toast.warning("Please select a semester.");
      return;
    }

    setSearching(true);
    setSearched(true);

    try {
      const res = await SearchStudentAPI(semester, section);

      if (!res.success) {
        toast.error("Error occurred while searching students.");
        return;
      }

      setStudents(res.students);
    } catch (error) {
      console.log("Error fetching students:", error);
      toast.error("Error occurred while searching students.");
    } finally {
      setSearching(false);
    }
  };

  const handleReset = () => {
    setSection("");
    setSemester("");
    setStudents([]);
    setSearched(false);
  };

  const handleAssignClick = (student: IStudent) => {
    setSelectedStudent(student);
    setIsDialogOpen(true);
  };

  const handleAssign = async (tgId: string) => {
    try {
      setAssigning(true);

      if (selectedStudent) {
        try {
          const res = await AssignSingleStudentToTGAPI(
            tgId,
            selectedStudent._id as string
          );

          if (!res.success) {
            toast.error("Error occurred while assigning TG.");
            return;
          }
          setStudents((prev) =>
            prev.map((student) => {
              if (student._id === selectedStudent._id) {
                return {
                  ...student,
                  TG: {
                    facultyId: tgId,
                    facultyName:
                      tg.find((tg) => tg._id === tgId)?.name || "Unknown",
                  },
                };
              }
              return student;
            })
          );
          setSelectedStudent(null);
          setIsDialogOpen(false);
          return;
        } catch (error) {
          console.log("Error assigning TG:", error);
          toast.error("Error occurred while assigning TG.");
        } finally {
          setAssigning(false);
          setSearchQuery("");
        }
      }
      if (selected.length === 0) {
        toast.warning("Please select at least one student.");
        return;
      }

      const res = await AssignMultipleStudentsToTGAPI(tgId, selected);

      if (!res.success) {
        toast.error("Error occurred while assigning TG.");
        return;
      }

      setStudents((prev) =>
        prev.map((student) => {
          if (selected.includes(student._id as string)) {
            return {
              ...student,
              TG: {
                facultyId: tgId,
                facultyName:
                  tg.find((tg) => tg._id === tgId)?.name || "Unknown",
              },
            };
          }
          return student;
        })
      );

      setIsDialogOpen(false);
      setSelected([]);
      toast.success(res.message);
    } catch (error) {
      console.log("Error assigning TG:", error);
      toast.error("Error occurred while assigning TG.");
    } finally {
      setAssigning(false);
      setSearchQuery("");
    }
  };

  const filteredStudents = students.filter((student) =>
    `${student.name} ${student.email} ${student.urn}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Filter Card */}
      <Card>
        <CardHeader>
          <CardTitle>Search Students Under TG</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select value={section} onValueChange={setSection}>
              <SelectTrigger>
                <SelectValue placeholder="Select Section (optional)" />
              </SelectTrigger>
              <SelectContent>
                {sectionOptions.map((sec) => (
                  <SelectItem key={sec} value={sec}>
                    {sec}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={semester} onValueChange={setSemester}>
              <SelectTrigger>
                <SelectValue placeholder="Select Semester" />
              </SelectTrigger>
              <SelectContent>
                {romanSemesters.map((sem) => (
                  <SelectItem key={sem} value={sem}>
                    {sem}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-3">
            <Button onClick={handleSearch} disabled={!semester || searching}>
              {searching ? "Searching..." : "Search"}
            </Button>
            <Button variant="secondary" onClick={handleReset}>
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Student Table */}
      {searched && (
        <Card>
          <CardHeader>
            <CardTitle>Student List</CardTitle>
          </CardHeader>
          <CardContent>
            {searching ? (
              <div className="text-center text-muted-foreground py-6">
                Searching students...
              </div>
            ) : students.length === 0 ? (
              <div className="text-center text-muted-foreground py-6">
                No students found for the selected section and semester.
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between py-2">
                  <Input
                    type="text"
                    placeholder="Search students by name, email, or URN"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                  />
                </div>

                <div className="overflow-auto">
                  <Table>
                    <TableHeader className="sticky top-0 bg-white z-10">
                      <TableRow>
                        <TableHead>
                          <Checkbox
                            checked={selected.length === students.length}
                            onCheckedChange={(val) => {
                              if (val) {
                                // Add all student IDs, ensuring there are no duplicates
                                const allSelectedIds = students.map(
                                  (student) => student._id as string
                                );
                                setSelected((prev) => {
                                  // Combine previous selected IDs with the new ones and remove duplicates
                                  const updatedSelected = new Set([
                                    ...prev,
                                    ...allSelectedIds,
                                  ]);
                                  return Array.from(updatedSelected);
                                });
                              } else {
                                // Deselect all students
                                setSelected([]);
                              }
                            }}
                          />
                        </TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>URN</TableHead>
                        <TableHead>CRN</TableHead>
                        <TableHead>Section / Semester</TableHead>
                        <TableHead>TG</TableHead>
                        <TableHead>Assign TG</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredStudents.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={8} className="text-center">
                            No Students found!
                          </TableCell>
                        </TableRow>
                      )}
                      {filteredStudents.map((student) => (
                        <TableRow key={student._id}>
                          <TableCell className="w-[60px]">
                            <Checkbox
                              checked={selected.includes(student._id as string)}
                              onCheckedChange={(val) => {
                                if (val)
                                  setSelected((prev) => [
                                    ...prev,
                                    student._id as string,
                                  ]);
                                else
                                  setSelected((prev) =>
                                    prev.filter((id) => id !== student._id)
                                  );
                              }}
                            />
                          </TableCell>
                          <TableCell>{student.name}</TableCell>
                          <TableCell>{student.email}</TableCell>
                          <TableCell>{student.urn}</TableCell>
                          <TableCell>{student.crn}</TableCell>
                          <TableCell>
                            {student.section} / {semester}
                          </TableCell>
                          <TableCell>
                            {student.TG?.facultyName || "-"}
                          </TableCell>
                          <TableCell className="w-24">
                            <Button onClick={() => handleAssignClick(student)}>
                              Assign
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </>
            )}
          </CardContent>
          {selected.length > 0 && (
            <CardFooter>
              <Button onClick={() => setIsDialogOpen(true)}>Assign TG</Button>
            </CardFooter>
          )}
        </Card>
      )}

      <Dialog
        open={isDialogOpen}
        onOpenChange={() => {
          setIsDialogOpen(false);
          setSelectedStudent(null);
        }}
      >
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>
              {selectedStudent
                ? `Assign TG to ${selectedStudent.name}`
                : `Assign TG to ${selected.length} Student(s)`}
            </DialogTitle>
          </DialogHeader>
          {selectedStudent && (
            <>
              <div>Student Name: {selectedStudent.name}</div>
            </>
          )}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tg.map((teacher) => (
                <TableRow key={teacher._id}>
                  <TableCell>{teacher.name}</TableCell>
                  <TableCell>{teacher.email}</TableCell>
                  <TableCell>{teacher.position}</TableCell>
                  <TableCell className="w-[80px]">
                    <Button
                      onClick={() => handleAssign(teacher._id as string)}
                      disabled={
                        assigning ||
                        selectedStudent?.TG?.facultyId === teacher._id
                      }
                    >
                      {assigning ? "Assigning..." : "Assign"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>
    </div>
  );
}
