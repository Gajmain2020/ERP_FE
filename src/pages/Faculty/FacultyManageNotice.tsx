import { useEffect, useState } from "react";
import { toast } from "sonner";

import { GetAllNoticesAPI } from "@/api/facultyAPI";
import NoticeTable from "@/components/Admin/NoticeTable";
import AddNoticeCard from "@/components/Faculty/AddNoticeCard";
import { INotice } from "@/utils/types";

export default function FacultyManageNotice() {
  const [notices, setNotices] = useState<INotice[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch all notices initially
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = (await GetAllNoticesAPI()) as {
          success: boolean;
          notices: INotice[];
        };
        if (res.success) {
          setNotices(res.notices);
        }
      } catch (error) {
        console.log("Error occurred while fetching notices.", error);
        toast.error("Error occurred while fetching notices");
      } finally {
        setLoading(false);
      }
    };
    fetchNotices();
  }, []);

  const handleNewNotice = (newNotice: INotice) => {
    setNotices((prev) => [newNotice, ...prev]);
  };

  return (
    <div className="w-full h-screen flex flex-col gap-5">
      {/* To add new Notice */}
      <AddNoticeCard onPublish={handleNewNotice} />

      {/* To view notices */}
      <NoticeTable isLoading={loading} data={notices} />
    </div>
  );
}
