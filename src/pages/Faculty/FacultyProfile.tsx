import { FetchFacultyProfileAPI } from "@/api/facultyAPI";
import FacultyProfileCard from "@/components/Faculty/BasicInfo";
import EditFacultyProfileDialog from "@/components/Faculty/EditDialog";
import useAuthStore from "@/store/userAuthStore";
import { IFaculty } from "@/utils/types";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export default function FacultyProfile() {
  const { name, id } = useAuthStore() as {
    name: string;
    id: string;
  };
  const [facultyProfile, setFacultyProfile] = useState<IFaculty | null>(null);
  const [openModal, setOpenModal] = useState(false);

  // Fetch student details
  const fetchFacultyProfile = useCallback(async () => {
    try {
      if (!id) return;
      const res = await FetchFacultyProfileAPI();
      setFacultyProfile(res.data.profile);
    } catch (error) {
      console.error("Error fetching student details:", error);
      toast.error("Failed to fetch faculty profile.");
    }
  }, [id]);

  useEffect(() => {
    fetchFacultyProfile();
  }, [id]);

  const handleUpdateProfile = (profile: IFaculty) => {
    console.log(profile);
  };

  return (
    <div className="w-full h-full flex flex-col gap-5">
      <div className="text-center text-xl font-semibold">Welcome {name}!</div>
      {/* Profile card */}
      <FacultyProfileCard
        setOpenModal={setOpenModal}
        facultyProfile={facultyProfile}
      />

      {/* Edit modal */}
      {openModal && facultyProfile && (
        <EditFacultyProfileDialog
          isOpen={openModal}
          facultyProfile={facultyProfile}
          onOpenChange={setOpenModal}
          onSave={handleUpdateProfile}
        />
      )}
    </div>
  );
}
