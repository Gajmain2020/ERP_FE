import { StudentDetailsData } from "@/utils/types";

const StudentDetailsCard = ({
  studentDetails,
  onOpenChange,
}: {
  studentDetails: StudentDetailsData;
  onOpenChange: (arg: boolean) => void;
}) => {
  const handleEditDetailsButton = () => {
    console.log("Edit requested");
    onOpenChange(true);
  };

  return (
    <div className="w-full flex flex-col gap-4 h-fit relative">
      <h2 className="text-2xl font-bold text-gray-900">More Details</h2>

      <div className="flex gap-4 relative">
        {/* Details Card */}
        <div className="w-full bg-white/30 backdrop-blur-lg rounded-xl shadow-md p-6 space-y-6 border border-gray-300 hover:bg-white/50 transition-all">
          {/* General Information */}
          <GeneralInfo studentDetails={studentDetails} />

          {/* Divider */}
          <div className="w-full h-0.5 bg-gray-400"></div>

          {/* Guardian Information */}
          <GuardianInfo guardianDetails={studentDetails.guardianDetails} />
        </div>

        {/* Edit Button */}
        <div className="absolute top-2 right-2">
          <button
            onClick={handleEditDetailsButton}
            className="bg-indigo-500 text-white px-4 py-2 text-sm rounded-md shadow-md hover:bg-indigo-600 transition focus:outline-none focus:ring focus:ring-indigo-300"
          >
            Request Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentDetailsCard;

/* ----------- General Information Component ----------- */
const GeneralInfo = ({
  studentDetails,
}: {
  studentDetails: StudentDetailsData;
}) => {
  const generalInfo = [
    { label: "URN", value: studentDetails.studentUrn },
    { label: "Admission No.", value: studentDetails.admissionNumber },
    { label: "Aadhar No.", value: studentDetails.aadharNumber },
    { label: "Blood Group", value: studentDetails.bloodGroup },
    { label: "Gender", value: studentDetails.gender.toUpperCase() },
    {
      label: "DOB",
      value: new Date(studentDetails.dob).toLocaleDateString("en-GB"),
    },
    { label: "Category", value: studentDetails.category },
    { label: "Nationality", value: studentDetails.nationality },
    { label: "Mobile No.", value: studentDetails.studentMobileNumber },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg underline font-semibold text-gray-800">
        General Information
      </h3>
      <div className="grid grid-cols-4 gap-3">
        {generalInfo.map((item, index) => (
          <InfoItem key={index} label={item.label} value={item.value} />
        ))}
      </div>
    </div>
  );
};

/* ----------- Guardian Information Component ----------- */
const GuardianInfo = ({
  guardianDetails,
}: {
  guardianDetails: StudentDetailsProps["guardianDetails"];
}) => {
  const guardians = [
    {
      label: "Father's Name",
      name: guardianDetails.father.name,
      mobile: guardianDetails.father.mobileNumber,
    },
    {
      label: "Mother's Name",
      name: guardianDetails.mother.name,
      mobile: guardianDetails.mother.mobileNumber,
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="underline text-lg font-semibold text-gray-800">
        Guardian Information
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {guardians.map((guardian, index) => (
          <div key={index}>
            <p className="text-sm font-medium text-gray-600">
              {guardian.label}
            </p>
            <p className="text-lg font-semibold text-gray-900">
              {guardian.name}
            </p>
            <p className="font-semibold text-gray-700">{guardian.mobile}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ----------- Reusable Info Item Component ----------- */
const InfoItem = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <div className="space-y-0.5">
    <label className="text-sm font-medium text-gray-600">{label}</label>
    <p className="text-lg font-semibold text-gray-800">{value}</p>
  </div>
);
