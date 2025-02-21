import type React from "react";

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
import type {
  EditStudentDialogProps,
  StudentData,
  StudentDetailsData,
} from "@/utils/types";
import { Label } from "@/components/ui/label";
import type { Address } from "@/utils/types";

const EditStudentDialog: React.FC<EditStudentDialogProps> = ({
  studentData,
  studentDetailsData = {}, // Provide empty object as default
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
    parentField: keyof StudentDetailsData,
    field: string,
    value: string
  ) => {
    setStudentDetails((prev) => ({
      ...prev,
      [parentField]: {
        ...(typeof prev[parentField] === "object" && prev[parentField] !== null
          ? prev[parentField]
          : {}),
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
          ...(prev.guardianDetails?.[guardianType] || {}),
          [field]: value,
        },
      },
    }));
  };

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file); // Store file for uploading later

      const reader = new FileReader();
      reader.onloadend = () => {
        setStudentDetails((prev) => ({
          ...prev,
          profilePhoto: reader.result as string, // Base64 preview
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStudentOtherDetailsChange = (key: string, value: string) => {
    setStudentDetails((prev) => ({ ...prev, [key]: value }));
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
          <TabsList className="grid grid-cols-5 mb-4">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="address">Address</TabsTrigger>
            <TabsTrigger value="guardian">Guardian Info</TabsTrigger>
            <TabsTrigger value="profile">Profile Pic</TabsTrigger>
            <TabsTrigger value="other">Other Info</TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-y-auto">
            {/* Basic info mostly unchangable */}
            <TabsContent className="px-1" value="basic">
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
            <TabsContent className="px-1" value="address">
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
                              permanentAddress: {
                                address: prev.currentAddress?.address || "",
                                city: prev.currentAddress?.city || "",
                                pinCode: prev.currentAddress?.pinCode || "",
                                state: prev.currentAddress?.state || "",
                              },
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
            <TabsContent className="px-1" value="guardian">
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
                            studentDetails.guardianDetails?.[guardianType]
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
                            studentDetails?.guardianDetails?.[guardianType]
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
                            studentDetails?.guardianDetails?.[guardianType]
                              ?.mobileNumber?.length === 10
                              ? "border-green-500"
                              : "border-red-500"
                          }
                        />
                        {studentDetails.guardianDetails?.[guardianType]
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
                              studentDetails?.guardianDetails?.alternateGuardian
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
                    </div>
                  </div>
                ))}
                <div className="p-4 border rounded-lg shadow-sm">
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
              </div>
            </TabsContent>

            {/* Profile Picture */}
            <TabsContent className="px-1" value="profile">
              <div className="flex flex-col items-center justify-center space-y-4 p-6 border rounded-lg shadow-sm">
                <div className="relative w-64 h-64">
                  <img
                    src={
                      studentDetails.profilePhoto ||
                      "https://www.strasys.uk/wp-content/uploads/2022/02/Depositphotos_484354208_S.jpg"
                    }
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full border-2 border-gray-300 shadow-md"
                  />
                </div>

                {/* File Upload Input */}
                <Label className="cursor-pointer bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg shadow-sm">
                  Upload Profile Picture
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePicChange}
                    className="hidden"
                  />
                </Label>
              </div>
            </TabsContent>

            {/* Other Info */}
            <TabsContent className="px-1" value="other">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Aadhar Number", key: "aadharNumber", type: "text" },
                  { label: "ABC ID", key: "abcId", type: "text" },
                  {
                    label: "Admission Number",
                    key: "admissionNumber",
                    type: "text",
                  },
                  { label: "Date of Birth", key: "dob", type: "date" },
                  { label: "Nationality", key: "nationality", type: "text" },
                ].map(({ label, key, type }) => (
                  <div key={key}>
                    <Label>{label}</Label>
                    <Input
                      type={type}
                      value={
                        studentDetails[
                          key as keyof StudentDetailsData
                        ] as string
                      }
                      onChange={(e) =>
                        handleStudentOtherDetailsChange(
                          key as keyof StudentDetailsData,
                          e.target.value
                        )
                      }
                    />
                  </div>
                ))}

                {[
                  {
                    label: "Blood Group",
                    key: "bloodGroup",
                    options: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
                  },
                  {
                    label: "Category",
                    key: "category",
                    options: ["Gen", "OBC", "ST", "SC"],
                  },
                  {
                    label: "Gender",
                    key: "gender",
                    options: ["Male", "Female", "Other"],
                  },
                ].map(({ label, key, options }) => (
                  <div key={key}>
                    <Label>{label}</Label>
                    <select
                      value={
                        studentDetails[
                          key as keyof StudentDetailsData
                        ] as string
                      }
                      onChange={(e) =>
                        handleStudentOtherDetailsChange(key, e.target.value)
                      }
                      className="border rounded-lg p-2 w-full"
                    >
                      {options.map((opt) => (
                        <option key={opt} value={opt.toLowerCase()}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </TabsContent>
          </div>
        </Tabs>

        <div className="flex gap-4 justify-end mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditStudentDialog;
