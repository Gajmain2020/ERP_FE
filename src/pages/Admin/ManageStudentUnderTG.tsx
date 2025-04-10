import { useState } from "react";
import { toast } from "sonner";

import { SearchStudentAPI } from "@/api/adminAPI";
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

import { IStudent } from "@/utils/types";

export default function ManageStudentUnderTG() {
  const [section, setSection] = useState("");
  const [semester, setSemester] = useState("");
  const [searched, setSearched] = useState(false);
  const [searching, setSearching] = useState(false);
  const [students, setStudents] = useState<IStudent[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<IStudent | null>(null);

  const [selected, setSelected] = useState<string[]>([]);

  const romanSemesters = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];
  const sectionOptions = ["A", "B"];

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

  console.log(selected);

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
                    {students.map((student) => (
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
                        <TableCell>{student.TG?.facultyName || "-"}</TableCell>
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
            )}
          </CardContent>
          {selected.length > 0 && (
            <CardFooter>
              <Button onClick={() => setIsDialogOpen(true)}>Assign TG</Button>
            </CardFooter>
          )}
        </Card>
      )}

      {/* Assign TG Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Assign TG to Student(s)</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* Your TG selection UI can go here */}
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select TG" />
              </SelectTrigger>
              <SelectContent>
                {/* Replace with real TG options */}
                <SelectItem value="tg1">TG 1</SelectItem>
                <SelectItem value="tg2">TG 2</SelectItem>
              </SelectContent>
            </Select>

            <Button className="w-full">Assign TG</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
