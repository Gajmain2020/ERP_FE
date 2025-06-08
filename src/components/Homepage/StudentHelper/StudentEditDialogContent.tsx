import type React from "react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import type {
  EditStudentDialogProps,
  StudentData,
  StudentDetailsData,
} from "@/utils/types";
import BasicInfoForm from "../Edit forms/BasicInfoForm";
import TabsListComponent from "../Edit forms/TabListComponent";
import AddressForm from "../Edit forms/AddressForm";
import GuardianInfoForm from "../Edit forms/GuardianInfoForm";
import ProfilePictureForm from "../Edit forms/ProfilePictureForm";
import OtherInfoForm from "../Edit forms/OtherInfoForm";

const EditStudentDialog: React.FC<EditStudentDialogProps> = ({
  studentData,
  studentDetailsData = {},
  isOpen,
  onOpenChange,
  onSave,
}) => {
  // State for student basic information
  const [studentInfo, setStudentInfo] = useState<StudentData>({
    ...studentData,
  });

  // State for student additional details
  const [studentDetails, setStudentDetails] =
    useState<StudentDetailsData>(studentDetailsData);

  // Handler to update basic student information
  const handleStudentInfoChange = (field: keyof StudentData, value: string) => {
    setStudentInfo((prev) => ({ ...prev, [field]: value }));
  };

  // Handler to update address or other object-type details
  const handleStudentDetailsChange = (
    parentField: keyof StudentDetailsData,
    field: string,
    value: string
  ) => {
    setStudentDetails((prev) => ({
      ...prev,
      [parentField]: {
        ...(prev[parentField] && typeof prev[parentField] === "object"
          ? prev[parentField]
          : ({} as any)),
        [field]: value,
      },
    }));
  };

  // Handler to update guardian details
  const handleDetailsChange = (
    type: keyof StudentDetailsData["guardianDetails"] | "emergencyContact",
    field: string,
    value: string
  ) => {
    setStudentDetails((prev) => ({
      ...prev,
      ...(type === "emergencyContact"
        ? {
            emergencyContact: {
              ...(prev.emergencyContact || {
                name: "",
                mobileNumber: "",
                relation: "",
              }),
              [field]: value,
            },
          }
        : {
            guardianDetails: {
              ...prev.guardianDetails,
              [type]: {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                ...(prev.guardianDetails?.[type] || ({} as any)),
                [field]: value,
              },
            },
          }),
    }));
  };

  // Handler for updating profile picture
  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setStudentDetails((prev) => ({
          ...prev,
          profilePhoto: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handler for updating other student details (simple key-value pairs)
  const handleStudentOtherDetailsChange = (key: string, value: string) => {
    setStudentDetails((prev) => ({ ...prev, [key]: value }));
  };

  // Submits updated student details
  const handleSubmit = () => {
    onSave(studentInfo, studentDetails);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl h-[600px] overflow-auto flex flex-col p-6">
        <DialogHeader>
          <DialogTitle>Edit Your Details</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="basic" className="flex-1 flex flex-col">
          {/* Tab Navigation */}
          <TabsListComponent />

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto">
            <TabsContent className="px-1" value="basic">
              <BasicInfoForm
                onChangeHandler={handleStudentInfoChange}
                studentInfo={studentInfo}
              />
            </TabsContent>

            <TabsContent className="px-1" value="address">
              <AddressForm
                studentDetails={studentDetails}
                onChangeHandler={handleStudentDetailsChange}
              />
            </TabsContent>

            <TabsContent className="px-1" value="guardian">
              <GuardianInfoForm
                studentDetails={studentDetails}
                onChangeHandler={handleDetailsChange}
              />
            </TabsContent>

            <TabsContent className="px-1" value="profile">
              <ProfilePictureForm
                studentDetails={studentDetails}
                onChangeHandler={handleProfilePicChange}
              />
            </TabsContent>

            <TabsContent className="px-1" value="other">
              <OtherInfoForm
                studentDetails={studentDetails}
                onChangeHandler={handleStudentOtherDetailsChange}
              />
            </TabsContent>
          </div>
        </Tabs>

        {/* Footer Buttons */}
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
