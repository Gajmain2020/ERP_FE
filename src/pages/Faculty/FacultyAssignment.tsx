import { useEffect, useState } from "react";
import { toast } from "sonner";

import { DeleteAssignmentAPI, GetAssignmentAPI } from "@/api/facultyAPI";
import AddAssignmentCard from "@/components/Faculty/AddAssignmentCard";
import AssignmentTable from "@/components/Faculty/AssignmentTable";
import { IAssignment } from "@/utils/types";

export default function FacultyAssignment() {
  const [assignments, setAssignments] = useState<IAssignment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssignments = async () => {
      setLoading(true);
      const res = (await GetAssignmentAPI()) as {
        success: boolean;
        message: string;
        assignments: IAssignment[];
      };

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

  const handleDeleteAssignment = async (id: string) => {
    const res = (await DeleteAssignmentAPI(id)) as {
      success: boolean;
      message: string;
    };

    if (!res.success) {
      toast.error("Error while deleting the pyq.");
      return;
    }

    toast.success(res.message);

    setAssignments((assignments) =>
      assignments.filter((assignment) => assignment._id !== id)
    );
  };

  const onPublish = (assignment: IAssignment) => {
    setAssignments((prev) => [assignment, ...prev]);
    return;
  };

  return (
    <div className="w-full h-screen flex flex-col gap-5">
      {/* Add pyq card */}
      <AddAssignmentCard />

      <AssignmentTable
        isLoading={loading}
        data={assignments}
        handleDelete={handleDeleteAssignment}
      />
    </div>
  );
}
