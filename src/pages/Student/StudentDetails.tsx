import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

import StudentProfileCard from "@/components/Homepage/StudentHelper/BasicDetailsProfileCard";
import StudentDetailsCard from "@/components/Homepage/StudentHelper/DetailsCard";
import EditStudentDialog from "@/components/Homepage/StudentHelper/StudentEditDialogContent";
import { Button } from "@/components/ui/button";
import { StudentData, StudentDetailsData } from "@/utils/types";
import {
  FetchStudentAllDetailsAPI,
  AddStudentDetailsAPI,
  UpdateStudentDetailsAPI,
} from "@/api/studentAPI";

const StudentDetails = () => {
  const { id } = useParams();
  const [studentBasicDetails, setStudentBasicDetails] =
    useState<StudentData | null>(null);
  const [studentDetails, setStudentDetails] =
    useState<StudentDetailsData | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Fetch student details
  const fetchStudentDetails = useCallback(async () => {
    try {
      if (!id) return;
      const { basicDetails, moreDetails } = await FetchStudentAllDetailsAPI();
      setStudentBasicDetails(basicDetails);
      setStudentDetails(moreDetails);
    } catch (error) {
      console.error("Error fetching student details:", error);
      toast.error("Failed to fetch student details.");
    }
  }, [id]);

  useEffect(() => {
    fetchStudentDetails();
  }, [fetchStudentDetails]);

  // Handle Save (Add or Update)
  const handleSave = async (
    updatedBasicDetails: StudentData,
    updatedDetails: StudentDetailsData
  ) => {
    try {
      setStudentBasicDetails(updatedBasicDetails);
      setStudentDetails(updatedDetails);

      if (updatedBasicDetails.isDetailsFilled) {
        const response = await UpdateStudentDetailsAPI(updatedDetails);
        setStudentDetails(response.details);
      } else {
        await AddStudentDetailsAPI(updatedBasicDetails, updatedDetails);
      }

      setIsDialogOpen(false);
      toast.success("Details saved successfully!");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message || "Something went wrong.");
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-5">
      {/* Basic Details */}
      <StudentProfileCard studentDetails={studentBasicDetails} />

      {/* More Details */}
      {studentBasicDetails?.isDetailsFilled ? (
        studentDetails && (
          <StudentDetailsCard
            onOpenChange={setIsDialogOpen}
            studentDetails={studentDetails}
          />
        )
      ) : (
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
};

export default StudentDetails;

// Incomplete Details Prompt
const IncompleteDetailsPrompt: React.FC<{ onEdit: () => void }> = ({
  onEdit,
}) => (
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
