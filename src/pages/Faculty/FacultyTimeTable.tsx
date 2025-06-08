import { GetTimetableAPI } from "@/api/facultyAPI";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface FacultyPeriod {
  day: string;
  periodNumber: number;
  courseName: string;
  courseCode: string;
  semester: string;
  section: string;
}

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const periodsCount = 7;

export default function FacultyTimetableTable() {
  const [data, setData] = useState<FacultyPeriod[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const res = await GetTimetableAPI();

        if (!res.success || !Array.isArray(res.periods)) {
          toast.error("Failed to fetch timetable.");
          setData([]);
          return;
        }

        setData(res.periods);
      } catch (err) {
        console.error("Error fetching timetable:", err);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTimetable();
  }, []);

  // Group periods by day
  const groupedByDay: { [key: string]: FacultyPeriod[] } = {};
  data.forEach((period) => {
    if (!groupedByDay[period.day]) groupedByDay[period.day] = [];
    groupedByDay[period.day].push(period);
  });

  return (
    <Card className="overflow-auto w-full">
      <CardHeader>
        <CardTitle>Faculty Timetable</CardTitle>
        <CardDescription>Overview of your assigned classes.</CardDescription>
      </CardHeader>

      <CardContent>
        {loading ? (
          <p className="text-muted-foreground">Loading timetable...</p>
        ) : data.length === 0 ? (
          <p className="text-muted-foreground">No classes assigned yet.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="border p-2 w-32">Day / Period</TableHead>
                {[...Array(periodsCount)].map((_, i) => (
                  <TableHead key={i} className="border p-2 text-center">
                    Period {i + 1}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {days.map((day) => (
                <TableRow key={day}>
                  <TableCell className="font-medium border">{day}</TableCell>
                  {[...Array(periodsCount)].map((_, periodIndex) => {
                    const period = groupedByDay[day]?.find(
                      (p) => p.periodNumber === periodIndex + 1
                    );

                    return (
                      <TableCell
                        key={periodIndex}
                        className="text-sm text-center border"
                      >
                        {period ? (
                          <div>
                            <div className="font-semibold">
                              {period.courseName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {period.courseCode} - {period.semester} (
                              {period.section})
                            </div>
                          </div>
                        ) : (
                          <div className="text-gray-400 italic text-xs">-</div>
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
