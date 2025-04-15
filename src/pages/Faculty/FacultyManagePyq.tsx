import { DeletePyqAPI, GetPyqAPI } from "@/api/facultyAPI";
import AddPyqCard from "@/components/Faculty/AddPyqCard";
import { IPyq } from "@/utils/types";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import PyqTable from "./PyqTable";

export default function FacultyManagePyq() {
  const [pyqs, setPyqs] = useState<IPyq[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPyq = async () => {
      setLoading(true);
      const res = await GetPyqAPI();

      if (!res.success) {
        setLoading(false);
        toast.error(
          "Something went wrong while fetching previous year question papers."
        );
      }

      setPyqs(res.pyqs);
      setLoading(false);
    };

    fetchPyq();
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

  return (
    <div className="w-full h-screen flex flex-col gap-5">
      {/* Add pyq card */}
      <AddPyqCard />

      {/* All pyq uploaded by the user */}
      <PyqTable
        handleDeletePyq={handleDeletePyq}
        data={pyqs}
        isLoading={loading}
      />
    </div>
  );
}
