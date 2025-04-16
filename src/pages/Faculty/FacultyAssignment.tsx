import { DeletePyqAPI, GetAssignmentAPI } from "@/api/facultyAPI";
import AddAssignmentCard from "@/components/Faculty/AddAssignmentCard";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function FacultyAssignment() {
  const [assignments, setAssignments] = useState<IAssignments[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssignments = async () => {
      setLoading(true);
      const res = await GetAssignmentAPI();

      if (!res.success) {
        setLoading(false);
        toast.error(
          "Something went wrong while fetching previous year question papers."
        );
      }

      setAssignments(res.assignments);
      setLoading(false);
    };

    fetchAssignments();
  }, []);

  const handleDeletePyq = async (id: string) => {
    const res = await DeletePyqAPI(id);

    if (!res.success) {
      toast.error("Error while deleting the pyq.");
      return;
    }

    toast.success(res.message);

    setPyqs((pyqs) => pyqs.filter((pyq) => pyq._id !== id));
  };

  const onPublish = (assignment) => {
    setAssignments((prev) => [assignment, ...prev]);
    return;
  };

  return (
    <div className="w-full h-screen flex flex-col gap-5">
      {/* Add pyq card */}
      <AddAssignmentCard onPublish={onPublish} />
    </div>
  );
}
