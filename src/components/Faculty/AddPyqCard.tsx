import { UploadPyqAPI } from "@/api/facultyAPI";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRef, useState } from "react";
import { toast } from "sonner";

export default function AddPyqCard() {
  const [courseCode, setCourseCode] = useState("");
  const [examSession, setExamSession] = useState("");
  const [pdf, setPdf] = useState<File | null>(null);
  const [examType, setExamType] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null); // 👈 file input ref

  const [saving, setSaving] = useState(false);

  const handleReset = () => {
    setCourseCode("");
    setExamSession("");
    setPdf(null);
    setExamType("");
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // 👈 clear file input
    }
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("courseCode", courseCode);
    formData.append("examSession", examSession);
    formData.append("examType", examType);
    if (pdf) {
      formData.append("pdf", pdf);
    }

    setSaving(true);
    try {
      if (courseCode === "" || examSession === "" || examType === "" || !pdf) {
        toast.error("All Fields are mandatory.");
        return;
      }

      const res = await UploadPyqAPI(formData);

      if (!res.success) {
        toast.error(res.message);
        return;
      }
      toast.error(res.message);

      //todo save the pyq here
    } catch (error) {
      console.log("Error occurred while uploading.", error);
      toast.error("Error occurred while uploading.");
    } finally {
      setSaving(false);
    }

    console.log("save the data");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add PYQ</CardTitle>
        <CardDescription>
          Fill in the details and publish the previous year question papers.
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
          <Label htmlFor="examSession">Exam Session</Label>
          <Input
            id="examSession"
            value={examSession}
            onChange={(e) => setExamSession(e.target.value)}
            placeholder="e.g., Winter 2024"
          />
        </div>
        <div>
          <Label htmlFor="examType">Exam Type</Label>
          <Select value={examType} onValueChange={setExamType}>
            <SelectTrigger id="examType">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Regular">Regular</SelectItem>
              <SelectItem value="Backlog">Backlog</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="pdf">Upload PDF</Label>
          <Input
            id="pdf"
            type="file"
            accept=".pdf"
            ref={fileInputRef} // 👈 use ref
            onChange={(e) => setPdf(e.target.files?.[0] || null)}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" onClick={handleReset}>
          Reset
        </Button>
        <Button onClick={handleSave} disabled={saving}>
          Save
        </Button>
      </CardFooter>
    </Card>
  );
}
