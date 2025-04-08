import AddStudentCard from "@/components/Admin/AddStudentCard";
import UploadCSVCard from "@/components/Admin/UploadCSVCard";

export default function ManageStudents() {
  return (
    <div className="w-full h-screen flex flex-col gap-5 p-2">
      {/* Add single student card */}
      <AddStudentCard />

      {/* Add students via csv sheet */}
      <UploadCSVCard />
    </div>
  );
}
