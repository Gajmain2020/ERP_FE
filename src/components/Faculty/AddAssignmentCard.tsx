import { useRef, useState } from "react";
import { toast } from "sonner";

import { UploadAssignmentAPI } from "@/api/facultyAPI";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AddAssignmentCard({
  onPublish,
}: {
  onPublish: (assignment: any) => void;
}) {
  const [courseCode, setCourseCode] = useState("");
  const [assignmentNumber, setAssignmentNumber] = useState("");
  const [assignmentTitle, setAssignmentTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [pdf, setPdf] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [saving, setSaving] = useState(false);

  const handleReset = () => {
    setCourseCode("");
    setAssignmentNumber("");
    setAssignmentTitle("");
    setDueDate("");
    setPdf(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSave = async () => {
    if (
      courseCode === "" ||
      assignmentNumber === "" ||
      assignmentTitle === "" ||
      dueDate === "" ||
      !pdf
    ) {
      toast.error("All fields are mandatory.");
      return;
    }

    const formData = new FormData();
    formData.append("courseCode", courseCode);
    formData.append("assignmentNumber", assignmentNumber);
    formData.append("assignmentName", assignmentTitle);
    formData.append("dueDate", dueDate);
    formData.append("pdf", pdf);

    setSaving(true);
    try {
      const res = await UploadAssignmentAPI(formData);

      if (!res.success) {
        toast.error(res.message);
        return;
      }

      toast.success(res.message);
      onPublish(res.assignment);
      handleReset();
    } catch (error) {
      console.error("Error occurred while uploading assignment:", error);
      toast.error("Error occurred while uploading.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Assignment</CardTitle>
        <CardDescription>
          Fill in the details and publish the assignment for students.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="courseCode">Course Code</Label>
          <Input
            id="courseCode"
            value={courseCode}
            onChange={(e) => setCourseCode(e.target.value)}
            placeholder="e.g., CS101"
          />
        </div>
        <div>
          <Label htmlFor="assignmentNumber">Assignment Number</Label>
          <Input
            id="assignmentNumber"
            value={assignmentNumber}
            onChange={(e) => setAssignmentNumber(e.target.value)}
            placeholder="e.g., 1"
          />
        </div>
        <div>
          <Label htmlFor="assignmentTitle">Assignment Title</Label>
          <Input
            id="assignmentTitle"
            value={assignmentTitle}
            onChange={(e) => setAssignmentTitle(e.target.value)}
            placeholder="e.g., Dynamic Programming Basics"
          />
        </div>
        <div>
          <Label htmlFor="dueDate">Due Date</Label>
          <Input
            id="dueDate"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="pdf">Upload PDF</Label>
          <Input
            id="pdf"
            type="file"
            accept=".pdf"
            ref={fileInputRef}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file && file.type !== "application/pdf") {
                toast.error("Only PDF files are allowed.");
                if (fileInputRef.current) fileInputRef.current.value = "";
                return;
              }
              setPdf(file || null);
            }}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" onClick={handleReset}>
          Reset
        </Button>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save"}
        </Button>
      </CardFooter>
    </Card>
  );
}
