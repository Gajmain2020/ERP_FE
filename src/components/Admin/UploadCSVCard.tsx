import Papa from "papaparse";
import { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { IStudent } from "@/utils/types";

export default function UploadCSVCard() {
  const [students, setStudents] = useState<IStudent[]>([]);

  const handleCSVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const parsedData = results.data;
        console.log("Parsed CSV data:", parsedData);
        setStudents(parsedData as IStudent[]);
      },
      error: function (err) {
        console.error("Error parsing CSV:", err);
      },
    });
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
        {students.length > 0 && (
          <div className="mt-4">
            <p className="font-medium">Parsed {students.length} students:</p>
            <pre className="text-sm mt-2 max-h-64 overflow-auto bg-gray-100 p-2 rounded">
              {JSON.stringify(students, null, 2)}
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
