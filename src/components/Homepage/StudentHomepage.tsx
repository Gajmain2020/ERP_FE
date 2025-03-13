import { useEffect, useState } from "react";

import { dummyNotice } from "@/utils/dummy";
import QuickLinksComponent from "./StudentHelper/ImportantLinks";
import BasicInfo from "./StudentHelper/BasicInfoCard";
import NoticeComponent from "./StudentHelper/Notice";
import DetailsNotFilledWarning from "./StudentHelper/Warning";
import { useParams } from "react-router-dom";
import { FetchStudentDetailsAPI } from "@/api/studentAPI";
import { StudentData } from "@/utils/types";

export default function StudentHomepage() {
  const [studentDetails, setStudentDetails] = useState<StudentData | null>(
    null
  );

  const { id } = useParams();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        if (id) {
          const details = await FetchStudentDetailsAPI(id); // Await here
          setStudentDetails(details); // Set the state correctly
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchDetails(); // Call the async function inside useEffect
  }, [id]);

  return (
    <div className="w-full h-screen flex gap-5">
      <div className="w-[70%] flex flex-col gap-5">
        {!studentDetails?.isDetailsFilled && <DetailsNotFilledWarning />}

        <QuickLinksComponent />

        <NoticeComponent notices={dummyNotice} />
      </div>
      <div className="w-[38%]">
        <BasicInfo details={studentDetails} />
      </div>
    </div>
  );
}
