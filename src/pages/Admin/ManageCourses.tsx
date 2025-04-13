import { useEffect, useState } from "react";
import { toast } from "sonner";

import { GetAllCoursesAPI } from "@/api/adminAPI";
import AddCourseCard from "@/components/Admin/AddCourseCard";
import AssignCourseCard from "@/components/Admin/AssignCourseCard";
import { ICourse } from "@/utils/types";

export default function ManageCourses() {
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch courses from the server
    const fetchCourses = async () => {
      try {
        const res = (await GetAllCoursesAPI()) as {
          success: boolean;
          message: string;
          courses: ICourse[];
        };

        if (!(res as { success: boolean }).success) {
          toast.error(res.message);
          return;
        }
        setCourses(res.courses);
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="w-full h-screen flex flex-col gap-5 p-2">
      <AddCourseCard setData={setCourses} />

      <AssignCourseCard
        data={courses}
        setData={setCourses}
        isLoading={isLoading}
      />
    </div>
  );
}
