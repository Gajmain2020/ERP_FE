import StudentProfileCard from "@/components/Homepage/StudentHelper/BasicDetailsProfileCard";
import StudentDetailsCard from "@/components/Homepage/StudentHelper/DetailsCard";
import { dummyStudentBasicDetails, dummyStudentDetails } from "@/utils/dummy";
import { useState } from "react";

function StudentDetails() {
  const [studentBasicDetails, setStudentBasicDetails] = useState(
    dummyStudentBasicDetails
  );
  const [studentDetails, setStudentDetails] = useState(dummyStudentDetails);

  return (
    <div className="w-full h-full flex gap-5 flex-col">
      {/* Basic Details */}
      <StudentProfileCard studentDetails={studentBasicDetails} />

      {/* Student more details */}
      {studentBasicDetails.isDetailsFilled && (
        <StudentDetailsCard studentDetails={studentDetails} />
      )}

      {!studentBasicDetails.isDetailsFilled && <IncompleteDetailsPrompt />}
    </div>
  );
}

export default StudentDetails;

const IncompleteDetailsPrompt = () => {
  return (
    <div className="w-full bg-red-100/60 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-md">
      <p className="font-semibold text-xl">Incomplete Details</p>
      <p className="text">
        Some essential information is missing. Please complete your profile to
        view all details.
      </p>
      <a
        href="#"
        className="text-red-600 font-medium hover:underline mt-2 inline-block"
      >
        Click here to update your details.
      </a>
    </div>
  );
};
