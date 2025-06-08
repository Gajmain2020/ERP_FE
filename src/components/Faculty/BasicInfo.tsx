import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
      <Card>
        <CardHeader>
          <CardTitle>Faculty Details</CardTitle>
          <CardDescription>Loading faculty profile...</CardDescription>
        </CardHeader>
        <CardContent className="animate-pulse space-y-4">
          <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-3">
            {Array(6)
              .fill(null)
              .map((_, index) => (
                <div key={index} className="space-y-1">
                  <div className="h-4 bg-gray-300 rounded w-24"></div>
                  <div className="h-5 bg-gray-400 rounded w-full"></div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="relative">
        <CardTitle>Faculty Details</CardTitle>
        <hr />
        <Button
          size="sm"
          className="absolute right-5 top-5"
          onClick={() => setOpenModal(true)}
        >
          Edit
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-wrap gap-6">
          <div className="flex-1 grid lg:grid-cols-2 sm:grid-cols-1 gap-3">
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
                  {item.value || "N/A"}
                </p>
              </div>
            ))}
          </div>
          <div className="w-[20%] min-w-[120px] flex items-center justify-center">
            <div className="relative w-full aspect-square">
              <img
                src={
                  facultyProfile.profileImage ||
                  "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359554_1280.png"
                }
                alt={`${facultyProfile.name}'s profile`}
                className="w-full h-full object-cover rounded-full border-4 border-gray-300 shadow-lg"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FacultyProfileCard;
