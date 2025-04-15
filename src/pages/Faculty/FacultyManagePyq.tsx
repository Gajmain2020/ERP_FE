import { GetPyqAPI } from "@/api/facultyAPI";
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

  return (
    <div className="w-full h-screen flex flex-col gap-5">
      {/* Add pyq card */}
      <AddPyqCard />

      {/* All pyq uploaded by the user */}
      <PyqTable data={pyqs} isLoading={loading} />
    </div>
  );
}
