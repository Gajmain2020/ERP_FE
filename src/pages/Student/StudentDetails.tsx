import StudentProfileCard from "@/components/Homepage/StudentHelper/BasicDetailsProfileCard";
import StudentDetailsCard from "@/components/Homepage/StudentHelper/DetailsCard";
import EditStudentDialog from "@/components/Homepage/StudentHelper/StudentEditDialogContent";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { StudentData, StudentDetailsData } from "@/utils/types";
import {
  FetchStudentAllDetailsAPI,
  AddStudentDetailsAPI,
  UpdateStudentDetailsAPI,
} from "@/api/studentAPI";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

type IncompleteDetailsPromptProps = {
  onEdit: () => void;
};

function StudentDetails() {
  const { id } = useParams();
  const [studentBasicDetails, setStudentBasicDetails] =
    useState<StudentData | null>(null);
  const [studentDetails, setStudentDetails] =
    useState<StudentDetailsData | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        if (id) {
          const details = await FetchStudentAllDetailsAPI();
          console.log(details);
          setStudentBasicDetails(details.basicDetails);
          setStudentDetails(details.moreDetails);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchDetails();
  }, [id]);

  const handleSave = (
    updatedBasicDetails: StudentData,
    updatedDetails: StudentDetailsData
  ) => {
    setStudentBasicDetails(updatedBasicDetails);
    setStudentDetails(updatedDetails);

    if (
      studentBasicDetails &&
      studentDetails &&
      studentBasicDetails.isDetailsFilled
    ) {
      UpdateStudentDetailsAPI(updatedDetails)
        .then((res) => {
          setStudentDetails(res.data.details);
          setIsDialogOpen(false);
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }

    if (
      studentBasicDetails &&
      studentDetails &&
      !studentBasicDetails.isDetailsFilled
    ) {
      AddStudentDetailsAPI(studentBasicDetails, studentDetails)
        .then(() => {
          setIsDialogOpen(false);
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }
  };

  return (
    <div className="w-full h-full flex gap-5 flex-col">
      {/* Basic Details */}
      <StudentProfileCard studentDetails={studentBasicDetails} />

      {/* Student more details */}
      {studentBasicDetails?.isDetailsFilled && studentDetails && (
        <StudentDetailsCard
          onOpenChange={setIsDialogOpen}
          studentDetails={studentDetails}
        />
      )}

      {!studentBasicDetails?.isDetailsFilled && (
        <IncompleteDetailsPrompt onEdit={() => setIsDialogOpen(true)} />
      )}

      {/* Edit Dialog */}
      {studentBasicDetails && (
        <EditStudentDialog
          studentData={studentBasicDetails}
          studentDetailsData={studentDetails || undefined}
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onSave={handleSave}
        />
      )}
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
