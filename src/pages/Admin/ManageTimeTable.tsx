import CreateTimeTable from "@/components/Admin/CreateTimeTable";
import SearchTimeTableCard from "@/components/Admin/SearchTimeTableCard";

export default function ManageTimeTable() {
  return (
    <div className="w-full h-screen flex flex-col gap-5">
      <SearchTimeTableCard />

      <CreateTimeTable />
    </div>
  );
}
