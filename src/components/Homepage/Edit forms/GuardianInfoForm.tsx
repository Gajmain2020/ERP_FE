import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StudentDetailsData } from "@/utils/types";

interface GuardianInfoFormProps {
  studentDetails: StudentDetailsData;
  handleGuardianDetailsChange: (
    guardianType: keyof StudentDetailsData["guardianDetails"],
    field: string,
    value: string
  ) => void;
}

const GuardianInfoForm = ({
  studentDetails,
  handleGuardianDetailsChange,
}: GuardianInfoFormProps) => (
  <div className="grid grid-cols-2 gap-6">
    {(
      ["father", "mother", "alternateGuardian"] as Array<
        keyof StudentDetailsData["guardianDetails"]
      >
    ).map((guardianType) => (
      <div key={guardianType} className="p-4 border rounded-lg shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold capitalize">{guardianType}</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Name</Label>
            <Input
              value={
                (studentDetails.guardianDetails?.[guardianType] &&
                  (
                    studentDetails.guardianDetails[guardianType] as {
                      name?: string;
                    }
                  ).name) ||
                ""
              }
              onChange={(e) =>
                handleGuardianDetailsChange(
                  guardianType,
                  "name",
                  e.target.value
                )
              }
            />
          </div>
          <div>
            <Label>Mobile Number</Label>
            <Input
              value={
                (studentDetails.guardianDetails?.[guardianType] &&
                  (
                    studentDetails.guardianDetails[guardianType] as {
                      mobileNumber?: string;
                    }
                  ).mobileNumber) ||
                ""
              }
              onChange={(e) =>
                handleGuardianDetailsChange(
                  guardianType,
                  "mobileNumber",
                  e.target.value
                )
              }
              className={
                studentDetails.guardianDetails?.[guardianType] &&
                (
                  studentDetails.guardianDetails[guardianType] as {
                    mobileNumber: string;
                  }
                ).mobileNumber.length === 10
                  ? "border-green-500"
                  : "border-red-500"
              }
            />
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default GuardianInfoForm;
