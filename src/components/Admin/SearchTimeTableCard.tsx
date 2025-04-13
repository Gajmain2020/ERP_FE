import React, { useState } from "react";
import { toast } from "sonner";

import { GetTimeTableAPI } from "@/api/adminAPI";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface ISearchTimetableProps {
  semester: string;
  section: string;
  setSemester: React.Dispatch<React.SetStateAction<string>>;
  setSection: React.Dispatch<React.SetStateAction<string>>;
  setTimetable: React.Dispatch<React.SetStateAction<any>>;
  setCreateNewTimetable: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SearchTimeTableCard({
  semester,
  section,
  setSemester,
  setSection,
  setTimetable,
  setCreateNewTimetable,
}: ISearchTimetableProps) {
  const [searching, setSearching] = useState(false);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleReset = () => {
    setCreateNewTimetable(false);
    setSemester("");
    setSection("");
    setTimetable(null);
  };

  const handleSearch = async () => {
    setSearching(true);
    setTimetable(null);
    try {
      if (semester === "" || section === "") {
        toast.error("Semester and section both are required.");
        return;
      }

      const res = (await GetTimeTableAPI(semester, section)) as {
        success: boolean;
        message: string;
        timetable: any;
      };

      if (!res.success) {
        toast.error(res.message);
        return;
      }

      if (!res.timetable) {
        setIsDialogOpen(true);
        return;
      }

      setTimetable(res.timetable);
    } catch (error) {
      console.log("Error while searching for timetable.", error);
      toast.error("Error while searching for timetable.");
    } finally {
      setSearching(false);
    }
  };

  const handleCreateNewTimetable = () => {
    setCreateNewTimetable(true);
    setIsDialogOpen(false);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Search Time-Table</CardTitle>
          <CardDescription>
            Search the specific semester and section in here to find if the
            time-table for specified semester and section exists or not.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex gap-4">
          <Select
            value={semester}
            onValueChange={(value) => setSemester(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Semester" />
            </SelectTrigger>
            <SelectContent>
              {["I", "II", "III", "IV", "V", "VI", "VII", "VIII"].map(
                (section) => (
                  <SelectItem key={section} value={section}>
                    {section}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>

          <Select value={section} onValueChange={(value) => setSection(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select Semester" />
            </SelectTrigger>
            <SelectContent>
              {["A", "B"].map((section) => (
                <SelectItem key={section} value={section}>
                  {section}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
        <CardFooter className="flex gap-4">
          <Button disabled={searching} onClick={handleSearch}>
            Search
          </Button>
          <Button variant="secondary" onClick={handleReset}>
            Reset
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Do you want to create timetable?</DialogTitle>
            <DialogDescription>
              Fill in the details for the schedule with course and designated
              faculty to create a timetable not with just few clicks.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex gap-4">
            <Button onClick={() => setIsDialogOpen(false)} variant="secondary">
              No
            </Button>
            <Button onClick={handleCreateNewTimetable}>Yes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
