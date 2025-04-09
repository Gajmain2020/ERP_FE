import AddCourseCard from "@/components/Admin/AddCourseCard";
import AssignCourseCard from "@/components/Admin/AssignCourseCard";

export default function ManageCourses() {
  return (
    <div className="w-full h-screen flex flex-col gap-5 p-2">
      <AddCourseCard />

      <AssignCourseCard />
    </div>
  );
}
