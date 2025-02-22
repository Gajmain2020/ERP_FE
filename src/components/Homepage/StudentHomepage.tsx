import { useEffect, useState } from "react";

import { dummyNotice, dummyStudentBasicDetails } from "@/utils/dummy";
import QuickLinksComponent from "./StudentHelper/ImportantLinks";
import BasicInfo from "./StudentHelper/BasicInfoCard";
import NoticeComponent from "./StudentHelper/Notice";
import DetailsNotFilledWarning from "./StudentHelper/Waraning";

export default function StudentHomepage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [studentDetails, setStudentDetails] = useState(
    dummyStudentBasicDetails
  );

  useEffect(() => {
    // Fetch student details from the database
    // If details are not filled, set detailsFilled to false
    // If details are filled, set detailsFilled to true
    // Also set the student name
  }, []);

  return (
    <div className="w-full h-full flex gap-5">
      <div className="w-[70%] flex flex-col gap-5">
        {!studentDetails.isDetailsFilled && <DetailsNotFilledWarning />}

        <QuickLinksComponent />

        <NoticeComponent notices={dummyNotice} />
      </div>
      <div className="w-[38%]">
        <BasicInfo details={studentDetails} />
      </div>
    </div>
  );
}
