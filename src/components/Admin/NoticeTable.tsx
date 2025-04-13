import { useEffect, useState } from "react";

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
import { INotice } from "@/utils/types";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

export default function NoticeTable({
  data,
  isLoading,
}: {
  data: INotice[];
  isLoading: boolean;
}) {
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState<INotice[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (search.trim() === "") {
      setFilteredData(data);
    } else {
      const lower = search.toLowerCase();
      const filtered = data.filter(
        (n) =>
          n.noticeNumber.toLowerCase().includes(lower) ||
          (n.author?.userName || "admin").toLowerCase().includes(lower)
      );
      setFilteredData(filtered);
    }
  }, [search, data]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Published Notices</CardTitle>
        <div className="mt-2">
          <Input
            placeholder="Search by notice number or drafted by..."
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
            No notices found.
          </div>
        ) : (
          <div className="rounded-lg border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sr. No.</TableHead>
                  <TableHead>Notice Number</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>PDF</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((notice, index) => (
                  <TableRow
                    key={notice._id}
                    className="cursor-pointer hover:bg-muted transition"
                    onClick={() => navigate(`${notice._id}`)}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{notice.noticeNumber}</TableCell>
                    <TableCell>{notice.author?.userName}</TableCell>
                    <TableCell>
                      {new Date(notice.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </TableCell>
                    <TableCell className="w-[100px]">
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(notice.pdf, "_blank");
                        }}
                        disabled={!notice.pdf}
                      >
                        View
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
