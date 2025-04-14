import { useRef, useState } from "react";
import { toast } from "sonner";

import { PublishNoticeAPI } from "@/api/facultyAPI";
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
import { Textarea } from "@/components/ui/textarea";
import { INotice } from "@/utils/types";

export default function AddNoticeCard({
  onPublish,
}: {
  onPublish: (notice: INotice) => void;
}) {
  const [noticeNumber, setNoticeNumber] = useState("");
  const [noticeSubject, setNoticeSubject] = useState("");
  const [noticeDescription, setNoticeDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [publishing, setPublishing] = useState(false);

  const handleReset = () => {
    setNoticeNumber("");
    setNoticeSubject("");
    setNoticeDescription("");
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handlePublish = async () => {
    try {
      setPublishing(true);
      const formData = new FormData();

      formData.append("noticeNumber", noticeNumber);
      formData.append("noticeSubject", noticeSubject);
      formData.append("noticeDescription", noticeDescription);

      if (file) {
        formData.append("pdf", file); // key is "pdf", filename is unchanged
      }

      // Send formData to the server
      const res = (await PublishNoticeAPI(formData)) as {
        success: boolean;
        message: string;
        notice?: INotice;
      };

      if (!res.success) {
        toast.error(res.message);
        return;
      }

      if (res.notice) {
        onPublish(res.notice);
      } else {
        toast.error("Notice data is missing.");
      }

      toast.success("Notice published successfully.");
      handleReset();
    } catch (error) {
      console.log("Error while publishing notice.", error);
      toast.error("Error occurred while publishing notice.");
    } finally {
      setPublishing(false);
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Publish New Notice</CardTitle>
        <CardDescription>
          Fill in the details below to create a new notice. You may optionally
          attach a PDF or image file. Once published, the notice will be shared
          with everyone.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="noticeNumber">Notice Number</Label>
          <Input
            id="noticeNumber"
            value={noticeNumber}
            onChange={(e) => setNoticeNumber(e.target.value)}
            placeholder="e.g. NT-2024-001"
          />
        </div>
        <div>
          <Label htmlFor="noticeSubject">Notice Subject</Label>
          <Input
            id="noticeSubject"
            value={noticeSubject}
            onChange={(e) => setNoticeSubject(e.target.value)}
            placeholder="e.g. Class cancellation"
          />
        </div>
        <div>
          <Label htmlFor="noticeDescription">Notice Description</Label>
          <Textarea
            id="noticeDescription"
            value={noticeDescription}
            onChange={(e) => setNoticeDescription(e.target.value)}
            placeholder="Write detailed notice here..."
          />
        </div>
        <div>
          <Label htmlFor="file">Upload Notice Document (PDF/Image)</Label>
          <Input
            id="file"
            type="file"
            accept="application/pdf, image/*"
            ref={fileInputRef}
            onChange={(e) => {
              if (e.target.files?.[0]) setFile(e.target.files[0]);
            }}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Button variant="outline" onClick={handleReset}>
          Reset
        </Button>
        <Button disabled={publishing} onClick={handlePublish}>
          {publishing ? "Publishing..." : "Publish"}
        </Button>
      </CardFooter>
    </Card>
  );
}
