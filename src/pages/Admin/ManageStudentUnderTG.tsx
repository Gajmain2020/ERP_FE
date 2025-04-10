import { SearchStudentAPI } from "@/api/adminAPI";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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
import { useState } from "react";
import { toast } from "sonner";

export default function ManageStudentUnderTG() {
  const [section, setSection] = useState("");
  const [semester, setSemester] = useState("");
  const [searched, setSearched] = useState(false);
  const [searching, setSearching] = useState(false);
  const [students, setStudents] = useState<IStudent[]>([]);

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

  return (
    <div className="space-y-6">
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
            ) : students.length === 0 ? (
              <div className="text-center text-muted-foreground py-6">
                No matching students found.
              </div>
            ) : (
              <div className="overflow-auto">
                <Table>
                  <TableHeader className="sticky top-0 bg-white z-10">
                    <TableRow>
                      <TableHead>
                        <Checkbox />
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
                    {students.map((student, idx) => (
                      <TableRow key={student._id}>
                        <TableCell className="w-[60px]">
                          <Checkbox />
                        </TableCell>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>{student.email}</TableCell>
                        <TableCell>{student.urn}</TableCell>
                        <TableCell>{student.crn}</TableCell>
                        <TableCell className="w-48">
                          {student.section} / {semester}
                        </TableCell>
                        <TableCell>
                          {student.TG?.facultyName
                            ? student.TG.facultyName
                            : "-"}
                        </TableCell>
                        <TableCell className="w-24">
                          <Button>Assign</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
