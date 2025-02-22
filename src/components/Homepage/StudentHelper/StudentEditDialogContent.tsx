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
import BasicInfoForm from "../Edit forms/BasicInfoForm";
import TabsListComponent from "../Edit forms/TabListComponent";
import AddressForm from "../Edit forms/AddressForm";
import GuardianInfoForm from "../Edit forms/GuardianInfoForm";
import ProfilePictureForm from "../Edit forms/ProfilePictureForm";
import OtherInfoForm from "../Edit forms/OtherInfoForm";

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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleStudentInfoChange = (field: keyof StudentData, value: string) => {
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
          <TabsListComponent />

          <div className="flex-1 overflow-y-auto">
            {/* Basic info mostly unchangable */}
            <TabsContent className="px-1" value="basic">
              <BasicInfoForm
                handleStudentInfoChange={handleStudentInfoChange}
                studentInfo={studentInfo}
              />
            </TabsContent>

            {/* Address related information */}
            <TabsContent className="px-1" value="address">
              <AddressForm
                studentDetails={studentDetails}
                handleStudentDetailsChange={handleStudentDetailsChange}
              />
            </TabsContent>

            {/* Guardian related information */}
            <TabsContent className="px-1" value="guardian">
              <GuardianInfoForm
                handleGuardianDetailsChange={handleGuardianDetailsChange}
                studentDetails={studentDetails}
              />
            </TabsContent>

            {/* Profile Picture */}
            <TabsContent className="px-1" value="profile">
              <ProfilePictureForm
                handleProfilePicChange={handleProfilePicChange}
                studentDetails={studentDetails}
              />
            </TabsContent>

            {/* Other Info */}
            <TabsContent className="px-1" value="other">
              <OtherInfoForm
                handleStudentOtherDetailsChange={
                  handleStudentOtherDetailsChange
                }
                studentDetails={studentDetails}
              />
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
