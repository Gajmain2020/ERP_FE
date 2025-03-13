import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StudentDetailsData } from "@/utils/types";

interface GuardianInfoFormProps {
  studentDetails: StudentDetailsData;
  onChangeHandler: (
    type: keyof StudentDetailsData["guardianDetails"] | "emergencyContact",
    field: string,
    value: string
  ) => void;
}

const GuardianInfoForm = ({
  studentDetails,
  onChangeHandler,
}: GuardianInfoFormProps) => (
  <div className="grid grid-cols-2 gap-6">
    {(
      ["father", "mother", "alternateGuardian"] as Array<
        keyof StudentDetailsData["guardianDetails"]
      >
    ).map((guardianType) => {
      const guardian = studentDetails.guardianDetails?.[guardianType] || {
        name: "",
        mobileNumber: "",
        ...(guardianType === "alternateGuardian" ? { relationship: "" } : {}),
      };

      return (
        <div key={guardianType} className="p-4 border rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold capitalize">{guardianType}</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {/* Name Input */}
            <div>
              <Label>Name</Label>
              <Input
                value={guardian.name || ""}
                onChange={(e) =>
                  onChangeHandler(guardianType, "name", e.target.value)
                }
              />
            </div>

            {/* Mobile Number Input */}
            <div>
              <Label>Mobile Number</Label>
              <Input
                type="tel"
                value={guardian.mobileNumber || ""}
                onChange={(e) =>
                  onChangeHandler(guardianType, "mobileNumber", e.target.value)
                }
                onInput={(e) =>
                  (e.currentTarget.value = e.currentTarget.value.replace(
                    /\D/g,
                    ""
                  ))
                }
                className={
                  guardian.mobileNumber && guardian.mobileNumber.length === 10
                    ? "border-green-500"
                    : "border-red-500"
                }
              />
              {guardian.mobileNumber && guardian.mobileNumber.length !== 10 && (
                <p className="text-red-500 text-sm mt-1">
                  Mobile Number must be 10 digits
                </p>
              )}
            </div>

            {/* Relationship Field (Only for Alternate Guardian) */}
            {guardianType === "alternateGuardian" && (
              <div className="col-span-2">
                <Label>Relationship</Label>
                <Input
                  value={guardian.relationship || ""}
                  onChange={(e) =>
                    onChangeHandler(
                      guardianType,
                      "relationship",
                      e.target.value
                    )
                  }
                />
              </div>
            )}
          </div>
        </div>
      );
    })}

    {/* Emergency Contact Section */}
    <div className="p-4 border rounded-lg shadow-sm col-span-2">
      <h3 className="text-lg font-semibold mb-4">Emergency Contact</h3>
      <div className="grid grid-cols-2 gap-4">
        {/* Name Input */}
        <div>
          <Label>Name</Label>
          <Input
            value={studentDetails.emergencyContact?.name || ""}
            onChange={(e) =>
              onChangeHandler("emergencyContact", "name", e.target.value)
            }
          />
        </div>

        {/* Mobile Number Input */}
        <div>
          <Label>Mobile Number</Label>
          <Input
            type="tel"
            value={studentDetails.emergencyContact?.mobileNumber || ""}
            onChange={(e) =>
              onChangeHandler(
                "emergencyContact",
                "mobileNumber",
                e.target.value
              )
            }
            onInput={(e) =>
              (e.currentTarget.value = e.currentTarget.value.replace(/\D/g, ""))
            }
            className={
              studentDetails.emergencyContact?.mobileNumber &&
              studentDetails.emergencyContact.mobileNumber.length === 10
                ? "border-green-500"
                : "border-red-500"
            }
          />
          {studentDetails.emergencyContact?.mobileNumber &&
            studentDetails.emergencyContact.mobileNumber.length !== 10 && (
              <p className="text-red-500 text-sm mt-1">
                Mobile Number must be 10 digits
              </p>
            )}
        </div>

        {/* Relationship Input */}
        <div className="col-span-2">
          <Label>Relation</Label>
          <Input
            value={studentDetails.emergencyContact?.relation || ""}
            onChange={(e) =>
              onChangeHandler("emergencyContact", "relation", e.target.value)
            }
          />
        </div>
      </div>
    </div>
  </div>
);

export default GuardianInfoForm;
