import { dummyStudentData } from "@/utils/dummy";
import { useState } from "react";

function StudentDetails() {
  const [detailsFilled, setDetailsFilled] = useState(true);
  const [studentDetails, setStudentDetails] = useState(dummyStudentData);

  return (
    <div className="w-full h-full flex gap-5 flex-col">
      {!detailsFilled &&
        "you have not filled the details kindly fill the details "}

      {/* Basic Details */}
      <StudentProfileCard studentDetails={studentDetails} />

      {/* Academic Details */}
    </div>
  );
}

export default StudentDetails;

interface StudentDetailsProps {
  name: string;
  urn: string;
  semester: string;
  department: string;
  section: string;
  TG: string;
  image: string;
  detailsFilled: boolean;
}

interface Props {
  studentDetails: StudentDetailsProps;
}

const StudentProfileCard: React.FC<Props> = ({ studentDetails }) => {
  return (
    <div className="w-full flex flex-col gap-4 h-fit">
      <div className="text-2xl font-bold">Basic Details</div>

      <div className="flex gap-4 ">
        {/* Details Card */}
        <div className="w-[86%] bg-opacity-20 backdrop-blur-lg bg-white/30 rounded-lg shadow-lg p-6 space-y-6 border border-white/30 hover:bg-white/55 transition-all h-full">
          <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-3">
            {[
              { label: "Name", value: studentDetails.name },
              { label: "URN", value: studentDetails.urn },
              { label: "Semester", value: studentDetails.semester },
              { label: "Department", value: studentDetails.department },
              { label: "Section", value: studentDetails.section },
              { label: "Teacher Guardian", value: studentDetails.TG },
            ].map((item, index) => (
              <div key={index} className="space-y-0.5">
                <label className="text-sm font-medium text-gray-700">
                  {item.label}
                </label>
                <p className="text-lg font-semibold text-gray-800">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
          {!studentDetails.detailsFilled && (
            <span className="text-red-400 font-semibold">
              *Note: Your complete details have not been filled. Please{" "}
              <a href="" className="underline">
                click here
              </a>{" "}
              to fill the details now.
            </span>
          )}
        </div>

        {/* Profile Image */}
        <div className="w-[14%] flex items-center justify-center h-full">
          <div className="group relative w-full aspect-square max-h-full">
            <img
              src={studentDetails.image}
              alt={`${studentDetails.name}'s profile`}
              className="w-full h-full object-cover rounded-full transition-all duration-300 shadow-md"
            />
            <div className="absolute -inset-2 rounded-full border-2 border-transparent group-hover:border-teal-500 transition-all duration-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
