import { useEffect, useState } from "react";
import { toast } from "sonner";

import { getAllNoticesAPI } from "@/api/adminAPI";
import AddNoticeCard from "@/components/Admin/AddNoticeCard";
import NoticeTable from "@/components/Admin/NoticeTable";
import { INotice } from "@/utils/types";

export default function ManageNotice() {
  const [notices, setNotices] = useState<INotice[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch all notices initially
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await getAllNoticesAPI();
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

  // Function to add a new notice to the list
  const handleNewNotice = (newNotice: INotice) => {
    setNotices((prev) => [newNotice, ...prev]);
  };

  return (
    <div className="w-full h-screen flex flex-col gap-5">
      <AddNoticeCard onPublish={handleNewNotice} />

      <NoticeTable isLoading={loading} data={notices} />
    </div>
  );
}
