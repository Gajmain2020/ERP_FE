"use client";

import React, { useState } from "react";
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

const dummyFaculties = [
  {
    _id: "67d51564170de3544c5fa229",
    bloodGroup: "A+",
    department: "CSE",
    email: "test@mail.com",
    empId: "EMP3",
    gender: "male",
    mobileNumber: "1234567890",
    isTG: false,
    name: "Gajju ",
    position: "Professor",
    profileImage:
      "https://res.cloudinary.com/djwqr0hgq/image/upload/v1742051634/smmxjids8eukbtpgajbx.png",
    createdAt: "2025-03-15T05:51:32.764Z",
    updatedAt: "2025-03-15T15:13:56.155Z",
    __v: 0,
  },
  {
    _id: "67d515aa170de3544c5fa22e",
    email: "testing@mail.com",
    empId: "EMP2",
    gender: "male",
    mobileNumber: "1234567890",
    isTG: false,
    name: "John Doe",
    position: "Professor",
    profileImage: "",
    createdAt: "2025-03-15T05:52:42.834Z",
    updatedAt: "2025-03-15T05:52:42.834Z",
    __v: 0,
  },
];

export default function AssignTGCard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [faculties, setFaculties] = useState(dummyFaculties);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
  };

  const filteredFaculties = faculties.filter(
    (faculty) =>
      faculty.name.toLowerCase().includes(searchTerm) ||
      faculty.email.toLowerCase().includes(searchTerm)
  );

  const handleAssignTG = (id: string) => {
    setFaculties((prev) =>
      prev.map((faculty) =>
        faculty._id === id ? { ...faculty, isTG: !faculty.isTG } : faculty
      )
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Assign Faculty as Teacher Guardian</CardTitle>
        <CardDescription>
          Assign or Unassign faculty as TG from here to care take students.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Input
          type="text"
          placeholder="Search by name or email"
          className="mb-4"
          value={searchTerm}
          onChange={handleSearch}
        />

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Emp ID</TableHead>
              <TableHead>Position</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredFaculties.map((faculty) => (
              <TableRow key={faculty._id}>
                <TableCell>{faculty.name}</TableCell>
                <TableCell>{faculty.email}</TableCell>
                <TableCell>{faculty.empId}</TableCell>
                <TableCell>{faculty.position}</TableCell>
                <TableCell className="text-center">
                  <Button onClick={() => handleAssignTG(faculty._id)}>
                    {faculty.isTG ? "Unassign TG" : "Assign as TG"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {filteredFaculties.length === 0 && (
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
      </CardContent>
    </Card>
  );
}
