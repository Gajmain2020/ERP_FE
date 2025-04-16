import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IPyq } from "@/utils/types";
import { Trash2 } from "lucide-react";

export default function PyqTable({
  data,
  isLoading,
  handleDeletePyq,
}: {
  data: IPyq[];
  isLoading: boolean;
  handleDeletePyq: (id: string) => void;
}) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Uploaded PYQs</CardTitle>
        <CardDescription>
          List of all previously uploaded previous year question papers by you.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>S. No.</TableHead>
              <TableHead>Exam Session</TableHead>
              <TableHead>Semester</TableHead>
              <TableHead>Course Short Name</TableHead>
              <TableHead>Exam Type</TableHead>
              <TableHead>PDF</TableHead>
              <TableHead>Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 3 }).map((_, idx) => (
                <TableRow key={idx}>
                  {Array.from({ length: 7 }).map((_, i) => (
                    <TableCell key={i}>
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-4 text-muted-foreground"
                >
                  No PYQs uploaded yet.
                </TableCell>
              </TableRow>
            ) : (
              data.map((pyq, idx) => (
                <TableRow key={pyq._id}>
                  <TableCell className="w-14">{idx + 1}</TableCell>
                  <TableCell>{pyq.examSession}</TableCell>
                  <TableCell>{pyq.course.semester}</TableCell>
                  <TableCell>{pyq.course.courseShortName}</TableCell>
                  <TableCell>{pyq.examType}</TableCell>
                  <TableCell className="w-32">
                    <Button
                      variant="outline"
                      onClick={() => window.open(pyq.pdfUrl, "_blank")}
                    >
                      View PDF
                    </Button>
                  </TableCell>
                  <TableCell className="w-10">
                    <Button
                      onClick={() => handleDeletePyq(pyq._id)}
                      variant="destructive"
                    >
                      <Trash2 />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
