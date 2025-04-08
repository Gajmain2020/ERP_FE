import AddFacultyCard from "@/components/Admin/AddFacultyCard";

export default function ManageFaculty() {
  return (
    <div className="w-full h-screen flex flex-col gap-5 p-2">
      <AddFacultyCard />

      <div>{/* search student */} search student field</div>
      <div>{/* Table view for searched student */} table view</div>
    </div>
  );
}
