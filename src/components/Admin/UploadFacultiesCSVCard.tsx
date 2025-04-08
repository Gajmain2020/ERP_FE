import Papa from "papaparse";
import { useState } from "react";
import { toast } from "sonner";

import { EnrollFacultiesAPI } from "@/api/adminAPI";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { IFaculty } from "@/utils/types";
import { addFacultySchema } from "@/utils/zodSchemas";
import { Button } from "../ui/button";

export default function UploadCSVCard() {
  const [faculties, setFaculties] = useState<IFaculty[]>([]);
  const [loading, setLoading] = useState(false);

  const handleCSVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const parsedData = results.data;
        setFaculties(parsedData as IFaculty[]);
      },
      error: function (err) {
        console.error("Error parsing CSV:", err);
      },
    });
  };

  const handleAddStudents = async () => {
    setLoading(true);
    try {
      const validFaculties: IFaculty[] = [];
      let invalidCount = 0;

      faculties.forEach((faculty: IFaculty) => {
        const result = addFacultySchema.safeParse(faculty);
        if (result.success) {
          validFaculties.push(result.data);
        } else {
          invalidCount += 1;
        }
      });

      if (invalidCount > 0) {
        toast.error(`${invalidCount} student record(s) are invalid.`);
      }

      // Pass the valid students to the API for enrollment.

      const res = await EnrollFacultiesAPI(validFaculties);

      if (!res.success) {
        toast.error(res.message);
        return;
      }

      toast.success(res.message);

      // Clear the students after successful enrollment
      setFaculties([]);
    } catch (error) {
      toast.error("An error occurred while adding students.");
      console.error("Error adding students:", error);
      return;
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Upload Students via CSV</CardTitle>
        <CardDescription>
          Upload a CSV file containing student details. The file should include
          headers like: `name`, `email`, `urn`, `crn`, `semester`, `section`.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Input type="file" accept=".csv" onChange={handleCSVUpload} />
        {faculties.length > 0 && (
          <div className="mt-4">
            <p className="font-medium">Parsed {faculties.length} students:</p>
            <pre className="text-sm mt-2 max-h-64 overflow-auto bg-gray-100 p-2 rounded">
              {JSON.stringify(faculties, null, 2)}
            </pre>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          onClick={handleAddStudents}
          disabled={faculties.length === 0 || loading}
        >
          Add {faculties.length} students.
        </Button>
      </CardFooter>
    </Card>
  );
}
