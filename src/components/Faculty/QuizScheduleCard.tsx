import { GetCoursesAPI, ScheduleQuizAPI } from "@/api/facultyAPI";
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
import { IQuizData } from "@/utils/types";
import { quizSchema } from "@/utils/zodSchemas";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface ICourse {
  _id: string;
  courseName: string;
  courseCode: string;
  courseShortName: string;
}

export default function QuizSchedulerCard({
  onSchedule,
}: {
  onSchedule: (data: IQuizData) => void;
}) {
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [loadingCourses, setLoadingCourses] = useState(false);

  const [formData, setFormData] = useState<IQuizData>({
    quizName: "",
    date: "",
    startTime: "",
    endTime: "",
    courseId: "",
    passcode: "",
  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoadingCourses(true);
        const res = (await GetCoursesAPI()) as {
          success: boolean;
          message: string;
          courses: ICourse[];
        };

        if (!res.success) {
          toast.error(res.message);
          return;
        }

        setCourses(res.courses);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load courses.");
      } finally {
        setLoadingCourses(false);
      }
    };

    fetchCourses();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setFormData({
      quizName: "",
      date: "",
      startTime: "",
      endTime: "",
      courseId: "",
      passcode: "",
    });
  };

  const handleSchedule = async () => {
    try {
      if (!formData.courseId) {
        toast.error("Please select a course.");
        return;
      }

      const result = quizSchema.safeParse(formData);
      if (!result.success) {
        result.error.errors.forEach((error) => {
          toast.error(error.message);
        });
        return;
      }

      const res = await ScheduleQuizAPI(formData);

      console.log(res);

      if (!res.success) {
        toast.error(res.message);
        return;
      }

      onSchedule(formData);
      toast.success("Quiz scheduled successfully.");
      handleReset();
    } catch (err) {
      console.log(err);
      toast.error("Error scheduling quiz.");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Schedule New Quiz</CardTitle>
        <CardDescription>
          Enter quiz details including name, date, time, and select a course.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="quizName">Quiz Name / ID</Label>
          <Input
            id="quizName"
            name="quizName"
            value={formData.quizName}
            onChange={handleChange}
            placeholder="e.g. Quiz-Mid1-CS101"
          />
        </div>
        <div className="flex space-x-4">
          <div className="flex-1">
            <Label htmlFor="passcode">Passcode</Label>
            <Input
              type="password"
              id="passcode"
              placeholder="Eg. 1234"
              name="passcode"
              value={formData.passcode}
              onChange={handleChange}
            />
          </div>
          <div className="flex-1">
            <Label htmlFor="date">Date</Label>
            <Input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              min={new Date().toISOString().split("T")[0]}
            />
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="flex-1">
            <Label htmlFor="startTime">Start Time</Label>
            <Input
              type="time"
              id="startTime"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
            />
          </div>
          <div className="flex-1">
            <Label htmlFor="endTime">End Time</Label>
            <Input
              type="time"
              id="endTime"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <Label>Select Course</Label>
          <Select
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, courseId: value }))
            }
            value={formData.courseId}
          >
            <SelectTrigger>
              <SelectValue
                placeholder={loadingCourses ? "Loading..." : "Choose a course"}
              />
            </SelectTrigger>
            <SelectContent>
              {courses.map((course) => (
                <SelectItem key={course._id} value={course._id}>
                  {course.courseShortName} ({course.courseCode}) –{" "}
                  {course.courseName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Button variant="outline" onClick={handleReset}>
          Reset
        </Button>
        <Button onClick={handleSchedule}>Schedule Quiz</Button>
      </CardFooter>
    </Card>
  );
}
