import { AssignTGAPI, GetFacultiesAPI } from "@/api/adminAPI";
import { IFaculty } from "@/utils/types";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export default function AssignTGCard() {
  // Search states
  const [searchTerm, setSearchTerm] = useState("");

  // Faculty states
  const [facultiesLoading, setFacultiesLoading] = useState(true);
  const [faculties, setFaculties] = useState<IFaculty[]>([]);

  // Assigning and Unassigning TG
  const [assigningTG, setAssigningTG] = useState<string[]>([]);
  const [unassigningTG, setUnassigningTG] = useState<string[]>([]);

  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        const response = await GetFacultiesAPI();

        if (!response.success) {
          toast.error(response.message);
          return;
        }

        setFaculties(response.faculties);
      } catch (error) {
        console.log("Error :", error);
        toast.error("An error occurred while fetching faculties");
      } finally {
        setFacultiesLoading(false);
      }
    };

    fetchFaculties();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredFaculties = faculties.filter(
    (faculty) =>
      faculty.name.toLowerCase().includes(searchTerm) ||
      faculty.email.toLowerCase().includes(searchTerm)
  );

  const handleAssignTG = async (id: string) => {
    try {
      setAssigningTG((prev) => [...prev, id]);

      const res = await AssignTGAPI(id);
      if (!res.success) {
        toast.error(res.message);
        return;
      }
      toast.success(res.message);
      setAssigningTG((prev) => prev.filter((tgId) => tgId !== id));

      setFaculties((prev) =>
        prev.map((faculty) =>
          faculty._id === id ? { ...faculty, isTG: !faculty.isTG } : faculty
        )
      );
    } catch (error) {
      console.log("Error :", error);
      toast.error("An error occurred while assigning TG");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Assign Faculty as Teacher Guardian</CardTitle>
        <CardDescription>
          Assign or Unassign faculty as TG from here to care take students.
        </CardDescription>
      </CardHeader>

      <CardContent className="h-[70dvh] flex flex-col">
        <Input
          type="text"
          placeholder="Search by name or email"
          className="mb-4"
          value={searchTerm}
          onChange={handleSearch}
        />

        <div className="overflow-auto border rounded-md">
          <Table className="min-w-full">
            <TableHeader>
              <TableRow className="sticky top-0 bg-white z-10">
                <TableHead>S.No.</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Emp ID</TableHead>
                <TableHead>Position</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {facultiesLoading ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center text-muted-foreground"
                  >
                    Loading...
                  </TableCell>
                </TableRow>
              ) : filteredFaculties.length > 0 ? (
                filteredFaculties.map((faculty, idx) => (
                  <TableRow key={faculty._id}>
                    <TableCell className="w-[64px]">{idx + 1}</TableCell>
                    <TableCell>{faculty.name}</TableCell>
                    <TableCell>{faculty.email}</TableCell>
                    <TableCell>{faculty.empId}</TableCell>
                    <TableCell>{faculty.position}</TableCell>
                    <TableCell className="text-center w-[150px]">
                      <Button
                        variant={faculty.isTG ? "destructive" : "default"}
                        disabled={
                          faculty._id &&
                          (assigningTG.includes(faculty._id) ||
                            unassigningTG.includes(faculty._id))
                        }
                        onClick={() =>
                          faculty._id && handleAssignTG(faculty._id)
                        }
                      >
                        {faculty.isTG
                          ? assigningTG.includes(faculty._id)
                            ? "Unassigning..."
                            : "Unassign TG"
                          : assigningTG.includes(faculty._id)
                          ? "Assigning..."
                          : "Assign as TG"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center text-muted-foreground"
                  >
                    No faculty found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
