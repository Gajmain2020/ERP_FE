import { Label } from "@/components/ui/label";

interface ProfilePictureFormProps {
  facultyData: { profileImage?: string };
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfilePictureForm: React.FC<ProfilePictureFormProps> = ({
  facultyData,
  onChangeHandler,
}) => (
  <div className="flex flex-col items-center justify-center space-y-4 p-6 border rounded-lg shadow-sm">
    <div className="relative w-40 h-40">
      <img
        src={
          facultyData.profileImage ||
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
        onChange={onChangeHandler}
        className="hidden"
      />
    </Label>
  </div>
);

export default ProfilePictureForm;
