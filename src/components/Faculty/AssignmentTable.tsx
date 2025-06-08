import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IAssignment } from "@/utils/types";
import { Trash2 } from "lucide-react";

export default function AssignmentTable({
  data,
  isLoading,
  handleDelete,
}: {
  data: IAssignment[];
  isLoading: boolean;
  handleDelete: (id: string) => void;
}) {
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState<IAssignment[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (search.trim() === "") {
      setFilteredData(data);
    } else {
      const lower = search.toLowerCase();
      const filtered = data.filter(
        (a) =>
          a.assignmentNumber.toLowerCase().includes(lower) ||
          a.assignmentName.toLowerCase().includes(lower) ||
          a.course.courseCode.toLowerCase().includes(lower)
      );
      setFilteredData(filtered);
    }
  }, [search, data]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Published Assignments</CardTitle>
        <div className="mt-2">
          <Input
            placeholder="Search by assignment number, title, or course code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full rounded-md" />
            ))}
          </div>
        ) : filteredData.length === 0 ? (
          <div className="text-muted-foreground py-10 text-center">
            No assignments found.
          </div>
        ) : (
          <div className="rounded-lg border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sr. No.</TableHead>
                  <TableHead>Assignment No.</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Course Code</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Submission</TableHead>
                  <TableHead>PDF</TableHead>
                  <TableHead>Delete</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((assignment, index) => (
                  <TableRow
                    key={assignment._id}
                    className="cursor-pointer hover:bg-muted transition"
                    onClick={() =>
                      navigate(`/faculty/assignments/${assignment._id}`)
                    }
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{assignment.assignmentNumber}</TableCell>
                    <TableCell>{assignment.assignmentName}</TableCell>
                    <TableCell>{assignment.course.courseCode}</TableCell>
                    <TableCell>
                      {new Date(assignment.dueDate).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }
                      )}
                    </TableCell>
                    <TableCell className="w-28">
                      {assignment.submittedStudentsCount}
                    </TableCell>

                    <TableCell className="w-[100px]">
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(assignment.assignmentFileUrl, "_blank");
                        }}
                      >
                        View
                      </Button>
                    </TableCell>
                    <TableCell className="w-10">
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(assignment._id);
                        }}
                        variant="destructive"
                      >
                        <Trash2 />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
