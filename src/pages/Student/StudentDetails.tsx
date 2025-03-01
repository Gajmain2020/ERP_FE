import StudentProfileCard from "@/components/Homepage/StudentHelper/BasicDetailsProfileCard";
import StudentDetailsCard from "@/components/Homepage/StudentHelper/DetailsCard";
import EditStudentDialog from "@/components/Homepage/StudentHelper/StudentEditDialogContent";
import { dummyStudentBasicDetails, dummyStudentDetails } from "@/utils/dummy";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { StudentData, StudentDetailsData } from "@/utils/types";

type IncompleteDetailsPromptProps = {
  onEdit: () => void;
};

function StudentDetails() {
  const [studentBasicDetails, setStudentBasicDetails] = useState<StudentData>(
    dummyStudentBasicDetails
  );
  const [studentDetails, setStudentDetails] =
    useState<StudentDetailsData>(dummyStudentDetails);
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);

  const handleSave = (
    updatedBasicDetails: StudentData,
    updatedDetails: StudentDetailsData
  ) => {
    setStudentBasicDetails(updatedBasicDetails);
    setStudentDetails(updatedDetails);

    console.log("Updated Student Data:", updatedBasicDetails, updatedDetails);
  };

  return (
    <div className="w-full h-full flex gap-5 flex-col">
      {/* Basic Details */}
      <StudentProfileCard studentDetails={studentBasicDetails} />

      {/* Student more details */}
      {studentBasicDetails.isDetailsFilled && (
        <StudentDetailsCard studentDetails={studentDetails} />
      )}

      {!studentBasicDetails.isDetailsFilled && (
        <IncompleteDetailsPrompt onEdit={() => setDialogOpen(true)} />
      )}

      {/* Edit Dialog */}
      <EditStudentDialog
        studentData={studentBasicDetails}
        isOpen={isDialogOpen}
        onOpenChange={setDialogOpen}
        onSave={handleSave}
      />
    </div>
  );
}

export default StudentDetails;

const IncompleteDetailsPrompt: React.FC<IncompleteDetailsPromptProps> = ({
  onEdit,
}) => {
  return (
    <div className="w-full bg-red-100/60 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-md">
      <p className="font-semibold text-xl">Incomplete Details</p>
      <p className="text">
        Some essential information is missing. Please complete your profile to
        view all details.
      </p>
      <Button
        onClick={onEdit}
        className="bg-red-600 text-white font-medium mt-2 hover:bg-red-700 transition"
      >
        Click here to update your details
      </Button>
    </div>
  );
};
