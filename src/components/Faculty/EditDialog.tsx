import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { IFaculty } from "@/utils/types";
import BasicInfoForm from "./ProfileInfoForm";
import ProfilePictureForm from "./ProfilePictureForm";

interface IEditProfile {
  facultyProfile: IFaculty;
  isOpen: boolean;
  onOpenChange: (arg: boolean) => void;
  onSave: (profile: IFaculty) => void;
  setProfileImageFile: (path: File) => void;
}

const tabItems = [
  { value: "profile", label: "Profile Data" },
  { value: "profilePicture", label: "Profile Picture" },
];

const EditFacultyProfileDialog: React.FC<IEditProfile> = ({
  facultyProfile,
  isOpen,
  onOpenChange,
  onSave,
  setProfileImageFile,
}) => {
  // Use temp state for modifications
  const [tempProfileInfo, setTempFacultyProfile] = useState<IFaculty>({
    ...facultyProfile,
  });

  // Update handlers
  const handleTempFacultyProfileChange = (
    field: keyof IFaculty,
    value: string
  ) => {
    setTempFacultyProfile((prev) => ({ ...prev, [field]: value }));
  };

  // Handle Profile Picture Upload
  const handleProfilePictureChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImageFile(e.target.files[0]);
      const reader = new FileReader();
      reader.onload = (event) => {
        setTempFacultyProfile((prev) => ({
          ...prev,
          profileImage: event.target?.result as string,
        }));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSave = () => {
    onSave(tempProfileInfo);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[500px] overflow-auto flex flex-col p-6">
        <DialogHeader>
          <DialogTitle>Edit Your Details</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="profile" className="flex-1 flex flex-col">
          <TabsList className="grid grid-cols-2 mb-4">
            {tabItems.map(({ value, label }) => (
              <TabsTrigger key={value} value={value}>
                {label}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="flex-1 overflow-y-auto">
            <TabsContent className="px-1" value="profile">
              <BasicInfoForm
                facultyData={tempProfileInfo}
                onChangeHandler={handleTempFacultyProfileChange}
              />
            </TabsContent>

            <TabsContent className="px-1" value="profilePicture">
              <ProfilePictureForm
                facultyData={tempProfileInfo}
                onChangeHandler={handleProfilePictureChange}
              />
            </TabsContent>
          </div>
        </Tabs>

        {/* Footer Buttons */}
        <div className="flex gap-4 justify-end mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditFacultyProfileDialog;
