import { Button } from "@/components/ui/button";
import { StudentData, StudentDetailsData } from "@/utils/types";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { useState } from "react";
import EditStudentDialog from "./StudentEditDialogContent";
// import { dummyStudentDetails } from "@/utils/dummy";

const BasicInfo = ({ details }: { details: StudentData }) => {
  const navigate = useNavigate();

  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleSave = (
    updatedStudentBasicDetails: StudentData,
    updatedStudentDetails: StudentDetailsData
  ) => {
    console.log(
      "Updated Student Data:",
      updatedStudentBasicDetails,
      updatedStudentDetails
    );
  };

  const handleViewDetailsButtonClick = () => {
    navigate(`details`);
  };

  const handleEditDetailsButton = () => {
    setDialogOpen(true);
  };

  return (
    <div className="border rounded-lg bg-gradient-to-br from-white to-gray-100 shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
      {/* Student Image */}
      <div className="relative bg-gray-100">
        {/* <img
          src={details.image}
          alt={`${details.name}'s profile`}
          className="aspect-square object-cover rounded-lg p-6"
        /> */}
        <div className="absolute top-2 right-2">
          <button
            onClick={handleEditDetailsButton}
            className="bg-indigo-500 text-white px-4 py-2 text-sm rounded-md shadow-md hover:bg-indigo-600 transition focus:outline-none focus:ring focus:ring-indigo-300"
          >
            Edit Details
          </button>
        </div>

        {/* Dialog for editing the data */}
        <EditStudentDialog
          studentData={details}
          isOpen={isDialogOpen}
          onOpenChange={setDialogOpen}
          onSave={handleSave} // ✅ Correctly passing a function
        />
      </div>

      {/* Card Content */}
      <div className="p-6 text-center flex flex-col gap-5">
        <div>
          {/* Name and URN */}

          <h2 className="text-2xl font-bold text-center flex items-center justify-center gap-2 text-gray-800">
            {details.name}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  {details.isDetailsFilled ? (
                    <FaCheckCircle
                      color={details.isVerified ? "green" : "gray"}
                    />
                  ) : (
                    <IoIosWarning color="orange" />
                  )}
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs mb-2 px-2 py-0.5 rounded bg-gray-700/60 text-gray-100">
                    {details.isDetailsFilled
                      ? details.isVerified
                        ? "Verified by TG"
                        : "Details filled, but not verified by TG"
                      : "Essential details missing"}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </h2>
          <p className="text-sm text-gray-500 mt-1">URN: {details.urn}</p>

          {/* Divider */}
          <div className="my-4 border-t border-gray-300"></div>
        </div>

        {/* Other Details */}
        <div className="grid grid-cols-2 gap-4 text-left text-gray-700">
          <div>
            <span className="font-semibold">CRN:</span>{" "}
            <span className="text-gray-600">{details.crn}</span>
          </div>
          <div>
            <span className="font-semibold">Email:</span>{" "}
            <span className="text-gray-600">{details.email}</span>
          </div>
          <div>
            <span className="font-semibold">Semester:</span>{" "}
            <span className="text-gray-600">{details.semester}</span>
          </div>
          <div>
            <span className="font-semibold">Department:</span>{" "}
            <span className="text-gray-600">{details.department}</span>
          </div>
          <div>
            <span className="font-semibold">Section:</span>{" "}
            <span className="text-gray-600">{details.section}</span>
          </div>
          <div>
            <span className="font-semibold">TG:</span>{" "}
            <span className="text-gray-600">
              {details.TG ? details.TG.teacherName : "TG not assigned"}
            </span>
          </div>
        </div>

        {/* View All Details Button */}
        <Button
          onClick={handleViewDetailsButtonClick}
          className="bg-indigo-500 hover:bg-indigo-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={!details.isDetailsFilled}
        >
          View All Details
        </Button>
      </div>
    </div>
  );
};

export default BasicInfo;
