import AddStudentCard from "@/components/Admin/AddStudentCard";

export default function ManageStudents() {
  return (
    <div className="w-full h-screen flex flex-col gap-5 p-2">
      <AddStudentCard />

      <div>{/* search student */} search student field</div>
      <div>{/* Table view for searched student */} table view</div>
    </div>
  );
}
