import { IFaculty } from "@/utils/types";
import { Button } from "../ui/button";

const FacultyProfileCard = ({
  facultyProfile,
  setOpenModal,
}: {
  facultyProfile: IFaculty | null;
  setOpenModal: (arg: boolean) => void;
}) => {
  if (!facultyProfile) {
    return (
      <div className="w-full flex flex-col gap-4 h-fit animate-pulse">
        <div className="flex gap-4">
          {/* Skeleton Loader */}
          <div className="w-full bg-opacity-20 backdrop-blur-lg bg-white/30 rounded-lg shadow-lg p-6 space-y-6 border border-white/30 hover:bg-white/55 transition-all h-full">
            <div className="text-xl text-center">Loading...</div>
            <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-3">
              {Array(6)
                .fill(null)
                .map((_, index) => (
                  <div key={index} className="space-y-0.5">
                    <div className="h-4 bg-gray-300 rounded w-24"></div>
                    <div className="h-5 bg-gray-400 rounded w-full"></div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-4 h-fit">
      <div className="text-2xl font-bold">Faculty Details</div>

      <div className="flex gap-4">
        {/* Details Card */}
        <div className="w-full relative bg-opacity-20 backdrop-blur-lg bg-white/30 rounded-lg shadow-lg p-6 space-y-6 border border-white/30 hover:bg-white/55 transition-all h-full">
          <Button
            className="absolute right-5 top-5"
            onClick={() => setOpenModal(true)}
          >
            Edit
          </Button>

          <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-3">
            {[
              { label: "Name", value: facultyProfile.name },
              { label: "Employee ID", value: facultyProfile.empId },
              { label: "Department", value: facultyProfile.department },
              { label: "Position", value: facultyProfile.position },
              { label: "Email", value: facultyProfile.email },
              { label: "Mobile", value: facultyProfile.mobileNumber },
              {
                label: "Gender",
                value: facultyProfile.gender
                  ? facultyProfile.gender.toUpperCase()
                  : "N/A",
              },
              { label: "Blood Group", value: facultyProfile.bloodGroup },
              {
                label: "Teacher Guardian",
                value: facultyProfile.isTG ? "Yes" : "No",
              },
            ].map((item, index) => (
              <div key={index} className="space-y-0.5">
                <label className="text-sm font-medium text-gray-700">
                  {item.label}
                </label>
                <p className="text-lg font-semibold text-gray-800">
                  {item.value ? item.value : "N/A"}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Profile Image */}
        {facultyProfile.profileImage && (
          <div className="w-[14%] flex items-center justify-center h-full">
            <div className="group relative w-full aspect-square max-h-full">
              <img
                src={
                  facultyProfile.profileImage ||
                  "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359554_1280.png"
                }
                alt={`${facultyProfile.name}'s profile`}
                className="w-full h-full object-cover rounded-full transition-all duration-300 shadow-md"
              />
              <div className="absolute -inset-2 rounded-full border-2 border-transparent group-hover:border-teal-500 transition-all duration-300"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FacultyProfileCard;
