import AddFacultyCard from "@/components/Admin/AddFacultyCard";
import UploadCSVCard from "@/components/Admin/UploadFacultiesCSVCard";

export default function ManageFaculty() {
  return (
    <div className="w-full h-screen flex flex-col gap-5 p-2">
      <AddFacultyCard />

      {/* Card to add faculties via csv */}
      <UploadCSVCard />
    </div>
  );
}
