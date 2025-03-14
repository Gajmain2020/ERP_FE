import { FetchFacultyProfileAPI } from "@/api/facultyAPI";
import FacultyProfileCard from "@/components/Faculty/BasicInfo";
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

  console.log(facultyProfile);

  useEffect(() => {
    fetchFacultyProfile();
  }, [id]);

  return (
    <div className="w-full h-full flex flex-col gap-5">
      <div className="text-center text-xl font-semibold">Welcome {name}!</div>
      {/* Profile card */}
      <FacultyProfileCard facultyProfile={facultyProfile} />
    </div>
  );
}
