import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ITimetable } from "@/utils/types";
import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
} from "react";

const periodsCount = 7;
export default function ShowTimetable({ data }: { data: ITimetable }) {
  return (
    <Card className="overflow-auto">
      <CardHeader>
        <CardTitle>Saved Timetable</CardTitle>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="border p-2 w-32">Day / Period</TableHead>
              {[...Array(7)].map((_, i) => (
                <TableHead key={i} className="border p-2 text-center">
                  Period {i + 1}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map(
              (
                dayObj: {
                  day:
                    | string
                    | number
                    | boolean
                    | ReactElement<any, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | ReactPortal
                    | null
                    | undefined;
                  periods: any[];
                },
                i: Key | null | undefined
              ) => (
                <TableRow key={i}>
                  <TableCell className="font-medium border">
                    {dayObj.day}
                  </TableCell>
                  {[...Array(periodsCount)].map((_, periodIndex) => {
                    const period = dayObj.periods.find(
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
                              {period.courseShortName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {period.facultyName}
                            </div>
                          </div>
                        ) : (
                          <div className="text-gray-400 italic text-xs">-</div>
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
