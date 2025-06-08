import { useState } from "react";
import { toast } from "sonner";

import { GetStudentDetailsAPI, SearchStudentAPI } from "@/api/adminAPI";
import { IStudent } from "@/utils/types";
import { CircleCheck, CircleX } from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export default function ShowStudentsCard() {
  const [students, setStudents] = useState<IStudent[]>();

  const [semester, setSemester] = useState("");
  const [section, setSection] = useState("");

  const [searching, setSearching] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async () => {
    try {
      setSearching(true);
      const res = (await SearchStudentAPI(semester, section)) as {
        success: boolean;
        message: string;
        students: IStudent[];
      };

      if (!res.success) {
        toast.error(res.message);
        return;
      }
      setStudents(res.students);
    } catch (error) {
      console.log("Error occurred while fetching students", error);
      toast.error("Error occurred while fetching students.");
    } finally {
      setSearching(false);
    }
  };

  const handleTableRowClick = async (student: IStudent) => {
    try {
      if (student.isDetailsFilled) {
        toast.error(`${student.name} have not filled the details.`);
        return;
      }

      const res = await GetStudentDetailsAPI(student._id as string);

      if (!res.success) {
        toast.error(res.message);
        return;
      }

      //   TODO: open a dialog to show the details of the student
      console.log("student details", res.studentDetails);
    } catch (error) {
      console.log("Error occurred while searching student details.", error);
      toast.error("Error occurred while searching student details.");
    }
  };

  const handleReset = () => {
    setSemester("");
    setSection("");
    setStudents(undefined);
    setSearchQuery("");
  };

  const filteredStudents =
    students &&
    students.filter((student) =>
      `${student.name} ${student.email} ${student.urn}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Search Students</CardTitle>
        <CardDescription>
          Fill in semester and section(optional) to fetch students and view
          their details.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex gap-4">
          <Select
            value={semester}
            onValueChange={(value) => setSemester(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Semester" />
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
          <Select value={section} onValueChange={(value) => setSection(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select Section (Optional)" />
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
        <div>
          <Button onClick={handleSearch} disabled={searching}>
            Search
          </Button>
          <Button onClick={handleReset} variant="secondary">
            Reset
          </Button>
        </div>
      </CardContent>

      {students && (
        <CardContent>
          <Input
            placeholder="Search Student using Email, Name or URN"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sr. No.</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>URN</TableHead>
                <TableHead>CRN</TableHead>
                <TableHead>Section</TableHead>
                <TableHead>TG</TableHead>
                <TableHead className="w-24">Details/Verified</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents && filteredStudents.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center">
                    No Student found.
                  </TableCell>
                </TableRow>
              )}
              {filteredStudents &&
                filteredStudents.map((student, index) => (
                  <TableRow
                    onClick={() => handleTableRowClick(student)}
                    key={student._id}
                  >
                    <TableCell className="w-20">{index + 1}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>{student.urn}</TableCell>
                    <TableCell>{student.crn}</TableCell>
                    <TableCell>{student.section}</TableCell>
                    <TableCell>{student.TG?.facultyName}</TableCell>
                    <TableCell className="flex gap-2 items-center ">
                      {student.isDetailsFilled ? <CircleCheck /> : <CircleX />}/
                      {student.isVerified ? <CircleCheck /> : <CircleX />}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      )}
    </Card>
  );
}
