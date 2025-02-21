import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import {
  EditStudentDialogProps,
  StudentData,
  StudentDetailsData,
} from "@/utils/types";
import { Label } from "@/components/ui/label";
import { Address } from "@/utils/types";

const EditStudentDialog: React.FC<EditStudentDialogProps> = ({
  studentData,
  studentDetailsData,
  isOpen,
  onOpenChange,
  onSave,
}) => {
  const [studentInfo, setStudentInfo] = useState<StudentData>({
    ...studentData,
  });
  const [studentDetails, setStudentDetails] = useState<StudentDetailsData>({
    ...studentDetailsData,
  });

  const handleStudentInfoChange = (field: string, value: string) => {
    setStudentInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleStudentDetailsChange = (
    parentField: string,
    field: string,
    value: string
  ) => {
    setStudentDetails((prev) => ({
      ...prev,
      [parentField]: {
        ...(prev[parentField] || {}),
        [field]: value,
      },
    }));
  };

  const handleGuardianDetailsChange = (
    guardianType: keyof StudentDetailsData["guardianDetails"],
    field: string,
    value: string
  ) => {
    setStudentDetails((prev) => ({
      ...prev,
      guardianDetails: {
        ...prev.guardianDetails,
        [guardianType]: {
          ...prev.guardianDetails[guardianType],
          [field]: value,
        },
      },
    }));
  };

  const handleSubmit = () => {
    onSave(studentInfo, studentDetails);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl h-[600px] overflow-auto flex flex-col p-6">
        <DialogHeader>
          <DialogTitle>Edit Your Details</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="basic" className="flex-1 flex flex-col">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="address">Address</TabsTrigger>
            <TabsTrigger value="guardian">Guardian Info</TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-y-auto">
            {/* Basic info mostly unchangable */}
            <TabsContent value="basic">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Name</Label>
                  <Input
                    disabled
                    className="text-black"
                    value={studentInfo.name}
                    onChange={(e) =>
                      handleStudentInfoChange("name", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input
                    value={studentInfo.email}
                    onChange={(e) =>
                      handleStudentInfoChange("email", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label>CRN</Label>
                  <Input
                    disabled
                    value={studentInfo.crn}
                    onChange={(e) =>
                      handleStudentInfoChange("email", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label>URN</Label>
                  <Input
                    disabled
                    value={studentInfo.urn}
                    onChange={(e) =>
                      handleStudentInfoChange("email", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label>Semester</Label>
                  <Input
                    disabled
                    value={studentInfo.semester}
                    onChange={(e) =>
                      handleStudentInfoChange("email", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label>Section</Label>
                  <Input
                    disabled
                    value={studentInfo.section}
                    onChange={(e) =>
                      handleStudentInfoChange("email", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label>Department</Label>
                  <Input
                    disabled
                    value={studentInfo.department}
                    onChange={(e) =>
                      handleStudentInfoChange("email", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label>Teacher Guardian</Label>
                  <Input
                    disabled
                    value={studentInfo.TG?.teacherName}
                    onChange={(e) =>
                      handleStudentInfoChange("email", e.target.value)
                    }
                  />
                </div>
              </div>
            </TabsContent>

            {/* Address related information */}
            <TabsContent value="address">
              <div className="grid grid-cols-2 gap-6">
                {(
                  ["currentAddress", "permanentAddress"] as Array<
                    keyof StudentDetailsData
                  >
                ).map((type, index) => (
                  <div key={type} className="p-4 border rounded-lg shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">
                        {index === 0 ? "Current Address" : "Permanent Address"}
                      </h3>
                      {index === 0 && (
                        <Button
                          variant="outline"
                          onClick={() =>
                            setStudentDetails((prev) => ({
                              ...prev,
                              permanentAddress: { ...prev.currentAddress },
                            }))
                          }
                        >
                          Copy to Permanent
                        </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Address</Label>
                        <Input
                          value={
                            (studentDetails[type] as Address)?.address || ""
                          }
                          onChange={(e) =>
                            handleStudentDetailsChange(
                              type,
                              "address",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div>
                        <Label>City</Label>
                        <Input
                          value={(studentDetails[type] as Address)?.city || ""}
                          onChange={(e) =>
                            handleStudentDetailsChange(
                              type,
                              "city",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div>
                        <Label>Pin Code</Label>
                        <Input
                          value={
                            (studentDetails[type] as Address)?.pinCode || ""
                          }
                          onChange={(e) => {
                            const value = e.target.value;
                            if (/^\d{0,6}$/.test(value)) {
                              // Allows only up to 6 digits
                              handleStudentDetailsChange(
                                type,
                                "pinCode",
                                value
                              );
                            }
                          }}
                          className={
                            (studentDetails[type] as Address)?.pinCode
                              ?.length === 6
                              ? "border-green-500"
                              : "border-red-500"
                          }
                        />
                        {(studentDetails[type] as Address)?.pinCode &&
                          (studentDetails[type] as Address)?.pinCode?.length !==
                            6 && (
                            <p className="text-red-500 text-sm mt-1">
                              Pin Code must be 6 digits
                            </p>
                          )}
                      </div>
                      <div>
                        <Label>State</Label>
                        <Input
                          value={(studentDetails[type] as Address)?.state || ""}
                          onChange={(e) =>
                            handleStudentDetailsChange(
                              type,
                              "state",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Guardian related information */}
            <TabsContent value="guardian">
              <div className="grid grid-cols-2 gap-6">
                {(
                  ["father", "mother", "alternateGuardian"] as Array<
                    keyof StudentDetailsData["guardianDetails"]
                  >
                ).map((guardianType) => (
                  <div
                    key={guardianType}
                    className="p-4 border rounded-lg shadow-sm"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold capitalize">
                        {guardianType}
                      </h3>
                      <Button
                        variant="outline"
                        onClick={() =>
                          setStudentDetails((prev) => ({
                            ...prev,
                            emergencyContact: {
                              ...prev.guardianDetails[guardianType],
                              relation:
                                guardianType === "alternateGuardian"
                                  ? prev?.guardianDetails?.alternateGuardian
                                      ?.relationship
                                  : guardianType,
                            },
                          }))
                        }
                      >
                        Set as Emergency Contact
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Name</Label>
                        <Input
                          value={
                            studentDetails.guardianDetails[guardianType]
                              ?.name || ""
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
                            studentDetails.guardianDetails[guardianType]
                              ?.mobileNumber || ""
                          }
                          onChange={(e) => {
                            const value = e.target.value;
                            if (/^\d{0,10}$/.test(value)) {
                              handleGuardianDetailsChange(
                                guardianType,
                                "mobileNumber",
                                value
                              );
                            }
                          }}
                          className={
                            studentDetails.guardianDetails[guardianType]
                              ?.mobileNumber?.length === 10
                              ? "border-green-500"
                              : "border-red-500"
                          }
                        />
                        {studentDetails.guardianDetails[guardianType]
                          ?.mobileNumber &&
                          studentDetails.guardianDetails[guardianType]
                            ?.mobileNumber?.length !== 10 && (
                            <p className="text-red-500 text-sm mt-1">
                              Mobile Number must be 10 digits
                            </p>
                          )}
                      </div>
                      {guardianType === "alternateGuardian" && (
                        <div>
                          <Label>Relationship</Label>
                          <Input
                            value={
                              studentDetails.guardianDetails.alternateGuardian
                                ?.relationship || ""
                            }
                            onChange={(e) =>
                              handleGuardianDetailsChange(
                                "alternateGuardian",
                                "relationship",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      )}
                      <div className="mt-6 p-4 border rounded-lg shadow-sm">
                        <h3 className="text-lg font-semibold mb-4">
                          Emergency Contact
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Name</Label>
                            <Input
                              value={
                                studentDetails.emergencyContact?.name || ""
                              }
                              disabled
                            />
                          </div>
                          <div>
                            <Label>Mobile Number</Label>
                            <Input
                              value={
                                studentDetails.emergencyContact?.mobileNumber ||
                                ""
                              }
                              disabled
                            />
                          </div>
                          <div>
                            <Label>Relation</Label>
                            <Input
                              value={
                                studentDetails.emergencyContact?.relation || ""
                              }
                              disabled
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Emergency Contact Section */}
              <div className="mt-6 p-4 border rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-4">
                  Emergency Contact
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Name</Label>
                    <Input
                      value={studentDetails.emergencyContact?.name || ""}
                      disabled
                    />
                  </div>
                  <div>
                    <Label>Mobile Number</Label>
                    <Input
                      value={
                        studentDetails.emergencyContact?.mobileNumber || ""
                      }
                      disabled
                    />
                  </div>
                  <div>
                    <Label>Relation</Label>
                    <Input
                      value={studentDetails.emergencyContact?.relation || ""}
                      disabled
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>

        <div className="flex justify-end mt-4">
          <Button onClick={handleSubmit}>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditStudentDialog;
